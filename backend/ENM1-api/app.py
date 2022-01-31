from influxdb_client import InfluxDBClient, Point, WritePrecision
from flask import Flask, jsonify, request
from collections import defaultdict
from datetime import datetime
from flask_mqtt import Mqtt
from flask_cors import CORS
import os, sys, yaml, json, logging
import time as t

# handle logging
log_filename = "logs/output.log"
os.makedirs(os.path.dirname(log_filename), exist_ok=True)
log_handlers = [logging.FileHandler(filename=log_filename, mode='w', encoding='utf-8'), logging.StreamHandler()]
logging.basicConfig(handlers=log_handlers, level=logging.DEBUG, format="%(asctime)s %(name)s [%(levelname)s] %(message)s")

# load config file
if not os.path.isfile("config.yaml"):
    sys.exit("'config.yaml' not found! Please add it and try again.")
else:
    with open("config.yaml") as file:
        config = yaml.load(file, Loader=yaml.FullLoader)


# start app
app = Flask(__name__)
####### CONFIG #######
app.config['SECRET_KEY'] = config['Flask']['SECRET_KEY']
app.config['MQTT_BROKER_URL'] = config['MQTT']['BROKER_URL']
app.config['MQTT_BROKER_PORT'] = config['MQTT']['BROKER_PORT']
app.config['MQTT_REFRESH_TIME'] = 1.0  # refresh time in seconds
Influx_howest = config['InfluxDB']['Howest']
Influx_transfo = config['InfluxDB']['Transfo']
##### END CONFIG #####
CORS(app)
mqtt = Mqtt(app)
endpoint = '/api/v1' # main endpoint

# time ranges and their corresponding values
## timeRange: [truncated_start, default_start, window/every]
time_ranges = {
    "yearly": ["2019-01-01T01:00:00.000000000Z", "-3y", "1y"],
    "monthly": ["date.truncate(t: now(), unit: 1y)", "-1y", "1mo"],
    "weekly": ["date.truncate(t: now(), unit: 1mo)", "-1mo", "1w"],
    "daily": ["date.truncate(t: now(), unit: 1mo)", "-1mo", "1d"],
    "hourly": ["date.truncate(t: now(), unit: 1d)", "-1d", "1h"],
    "recent": ["date.truncate(t: now(), unit: 1h)", "-1h", "5m"],
}


###### FLASK ROUTES ######
@app.route('/')
def index():
    return 'use /api/v1', 303

# get all available fields & measurements from Transfo influxdb
@app.route(f'{endpoint}/transfo/power/fields', methods=['GET'])
def get_transfo_fields():
    try:
        # get Transfo config values
        URL, TOKEN, ORG, BUCKET = Influx_transfo.values()

        with InfluxDBClient(url=URL, token=TOKEN, org=ORG) as client:
            # get all measurements
            query = f'import "influxdata/influxdb/schema" schema.measurements(bucket: "{BUCKET}")'
            mTables = client.query_api().query(query, org=ORG)
            # convert to list of measurements
            measurements = [r.values['_value'] for r in mTables[0].records]

            # get all field values for each measurement
            dict = {}
            for measurement in measurements:
                query = f'import "influxdata/influxdb/schema" schema.measurementFieldKeys(bucket: "{BUCKET}",measurement: "{measurement}")'
                fTables = client.query_api().query(query, org=ORG)
                fields = [r.values['_value']
                        for r in fTables[0].records]  # convert to list of fields
                # add list of fields to dict under measurement name
                dict[measurement] = fields

            client.close()
            return jsonify(dict), 200
    except Exception as e:
        logging.error(e)
        return jsonify(status_code=500, message=f'Internal Server Error, see logs for more info', error=e.message or type(e).__name__), 500

# geeft data terug van de gekozen measurement
# bekijk documentatie voor meer informatie over de parameters
@app.route(f'{endpoint}/transfo/power/usage/<measurement>/<time>', methods=['GET'])
def get_powerusage_transfo(measurement, time):
    try:
        # get route parameters
        fn = request.args.get('fn', default='sum', type=str)
        field = request.args.get('field', default=None, type=str)
        showPhases = request.args.get('showPhases', default=False, type=lambda v: v.lower() == 'true')
        calendar_time = request.args.get('calendarTime', default=False, type=lambda v: v.lower() == 'true')
        showRecent = request.args.get('showRecent', default=False, type=lambda v: v.lower() == 'true')

        # check whether correct parameters were given, otherwise return bad request
        if time not in time_ranges:
            return jsonify(status_code=400, message=f'time:{time} is not a valid time range, please check documentation'), 400
        if fn not in ['sum', 'mean', 'median', 'min', 'max']:
            return jsonify(status_code=400, message=f'fn:{fn} is not valid, please check documentation'), 400

        # get Transfo config values
        URL, TOKEN, ORG, BUCKET = Influx_transfo.values()
        # get range and window from given time parameter
        rangeCT, range, window = time_ranges[time]

        with InfluxDBClient(url=URL, token=TOKEN, org=ORG, timeout=25000) as client:

            # if field param was given -> filter on field, else just filter on blacklist
            fieldFilter = f'|> filter(fn: (r) => r._field == "{field}")' if field is not None else ''
            # if showPhases is False, filter out phase fields (L1,L2,L3)
            phaseFilter = '|> filter(fn: (r) => r._field !~ /L\d+$/ )' if not showPhases else ''
            query = f'''import "date" 
                        from(bucket: "{BUCKET}")
                            |> range(start: {rangeCT if calendar_time else range}, stop: now())
                            |> filter(fn: (r) => r._measurement == "{measurement}")
                            {fieldFilter}
                            {phaseFilter}
                            |> aggregateWindow(every: {window}, fn: {fn})
                    '''
            start_time = t.time()
            tables = client.query_api().query(query, org=ORG)
            client.close()

            # check for found tables, otherwise return bad request
            if len(tables) == 0:
                return jsonify(status_code=400, message='No data found, check if given parameters (measurement & field) are correct (case sensitive)'), 400

            # group by field, each field contains list of respective records with time and value
            dict = defaultdict()
            for table in tables:
                for r in table.records:
                    dict.setdefault(r.values['_field'], []).append(
                        {'time': r.values['_time'], 'unit': "Watts per hour", 'value': r.values['_value']})
            # If recent values are disabled, remove the last item of each array in dict
            if not showRecent:
                for key, value in dict.items():
                    dict[key] = value[:-1]

            return jsonify(
                http_code=200,
                info={
                    'measurement': measurement,
                    'field': field or 'all',
                    'fn': fn,
                    'time': time,
                    'calendarTime': calendar_time,
                    'showPhases': showPhases,
                    'processingTime': f'{round((t.time() - start_time), 2)} secs'
                },
                values=dict
            ), 200
    except Exception as e:
        logging.error(e)
        return jsonify(status_code=500, message=f'Internal Server Error, see logs for more info', error=e.message or type(e).__name__), 500
######## END ROUTES ########


######## MQTT ########
######
# MQTT wordt niet (meer) gebruikt, maar blijft in de code staan om eventueel later nog data toe te voegen aan influxdb
######
@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    print("Connected to Transfo MQTT broker with result code " + str(rc))
    # mqtt.subscribe('servicelocation/477d2645-2919-44c3-acf7-cad592ce7cdc/realtime')


@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    if message.topic == 'servicelocation/477d2645-2919-44c3-acf7-cad592ce7cdc/realtime':
        # convert payload into JSON
        data = json.loads(message.payload.decode('utf-8'))
        # get Smappee channels from config.yaml
        channels = config['Smappee']['Channels']

        # create point data
        points = []
        for chp in data['channelPowers']:
            # convert formula to Smappee ID, $5500031443/3$ => 5500031443 D
            SmappeeID = chp['formula'][1:-
                                       2].replace("/", " ") + chr(int(chp['formula'][-2]) + 64 + 1)
            # get Smappee channel name from config.yaml
            SmappeeName = channels.get(SmappeeID, None)

            point = Point("Transfo Zwevegem") \
                .tag("field", SmappeeName) \
                .tag("formula", chp['formula']) \
                .tag("phaseid", chp['phaseId']) \
                .field("power", chp['power']) \
                .field("current", chp['current']) \
                .field("apparentpower", chp['apparentPower']) \
                .field("servicelocationid", chp['serviceLocationId']) \
                .time(datetime.utcnow(), WritePrecision.NS)
            points.append(point)

        add_point_data(points)


def add_point_data(points):
    URL, TOKEN, ORG, BUCKET = Influx_howest.values()
    with InfluxDBClient(url=URL, token=TOKEN, org=ORG) as client:
        with client.write_api() as write_api:
            print(f'Writing {len(points)} points to InfluxDB')
            write_api.write(bucket=BUCKET, org=ORG, record=points)
######## END MQTT ########


# start app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
