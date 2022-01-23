from collections import defaultdict
from email.policy import default
from itertools import groupby
from flask import Flask, jsonify, request, url_for, Response, session
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from datetime import datetime
from flask_cors import CORS
from flask_mqtt import Mqtt
from functools import reduce
import os, sys, yaml, json

# load config file
if not os.path.isfile("config.yaml"):
  sys.exit("'config.yaml' not found! Please add it and try again.")
else:
  with open("config.yaml") as file:
    config = yaml.load(file, Loader=yaml.FullLoader)


# start app
app = Flask(__name__)

# enviroment variables
app.config['SECRET_KEY'] = config['Flask']['SECRET_KEY']
app.config['MQTT_BROKER_URL'] = config['MQTT']['BROKER_URL']
app.config['MQTT_BROKER_PORT'] = config['MQTT']['BROKER_PORT']
app.config['MQTT_REFRESH_TIME'] = 1.0  # refresh time in seconds

Influx_howest = config['InfluxDB']['Howest']
Influx_transfo = config['InfluxDB']['Transfo']
field_blacklist = [ "CO2_5min", "Description_Weather", "Humidity", "Pressure", "Temperature", "Windspeed" ]
time_ranges = {
    "year": ["-1y", "1mo"],
    "month": ["-1mo", "1d"],
    "week": ["-1w", "1d"],
    "day": ["-1d", "1h"],
    "recent": ["-1h", "5m"],
}

mqtt = Mqtt(app)
CORS(app)


# custom endpoint
endpoint = '/api/v1'


###### FLASK ROUTES ######
@app.route('/')
def index():
    return 'use /api/v1', 303

# get all possible fields from duiktank influxdb
@app.route(f'{endpoint}/power/duiktank/fields', methods=['GET'])
def get_duiktank_fields():
    # get Transfo values
    URL, TOKEN, ORG, BUCKET = Influx_transfo.values()

    with InfluxDBClient(url=URL, token=TOKEN, org=ORG) as client:
        query = f'import "influxdata/influxdb/schema" schema.fieldKeys(bucket: "{BUCKET}")'
        tables = client.query_api().query(query, org=ORG)
        client.close()

        fields = [r.values['_value'] for r in tables[0].records] # get field values
        fields = list(filter(lambda x: x not in field_blacklist, fields)) # remove blacklisted fields
        return jsonify(fields), 200

@app.route(f'{endpoint}/power/duiktank/usage/<time>', methods=['GET'])
@app.route(f'{endpoint}/power/duiktank/usage/<time>/<field>', methods=['GET'])
def get_powerusage_duiktank(time, field=None):
    # get Transfo values
    URL, TOKEN, ORG, BUCKET = Influx_transfo.values()
    # get range and window from given time parameter
    range, window = time_ranges[time]

    with InfluxDBClient(url=URL, token=TOKEN, org=ORG) as client:
        
        # if field param was given -> filter on field, else just filter on blacklist
        query = f'''from(bucket: "{BUCKET}")
                        |> range(start: {range})
                        |> filter(fn: (r) => {f'r._field == "{field}"' if field is not None else f'not contains(value: r._field, set: {json.dumps(field_blacklist)})'})
                        |> aggregateWindow(every: {window}, fn: sum)'''
        tables = client.query_api().query(query, org=ORG)
        client.close()

        # group by field, each field contains list of respective records with time and value 
        dict = defaultdict()
        for table in tables:
            for r in table.records:
                dict.setdefault(r.values['_field'], []).append({'time': r.values['_time'], 'value': r.values['_value']})


        return jsonify(http_code=200, info={'measurement': "Duiktank"}, values=dict), 200


# MQTT
@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    print("Connected to Transfo MQTT broker with result code " + str(rc))
    mqtt.subscribe('/placeholder/topic')

@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )
    print(data)

# start app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)