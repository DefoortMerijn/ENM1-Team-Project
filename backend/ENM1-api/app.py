from flask import Flask, jsonify, request, url_for, Response, session
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from datetime import datetime
from flask_cors import CORS
from flask_mqtt import Mqtt
import os, sys, yaml

# load config file
if not os.path.isfile("config.yaml"):
  sys.exit("'config.yaml' not found! Please add it and try again.")
else:
  with open("config.yaml") as file:
    config = yaml.load(file, Loader=yaml.FullLoader)


# Start app
app = Flask(__name__)
app.config['SECRET_KEY'] = config['Flask']['SECRET_KEY']
app.config['MQTT_BROKER_URL'] = config['MQTT']['BROKER_URL']
app.config['MQTT_BROKER_PORT'] = config['MQTT']['BROKER_PORT']
app.config['MQTT_REFRESH_TIME'] = 1.0  # refresh time in seconds
Url = config['InfluxDB']['Howest']['URL']
token = config['InfluxDB']['Howest']['TOKEN']
org = config['InfluxDB']['Howest']['ORG']
bucket = config['InfluxDB']['Howest']['BUCKET']
mqtt = Mqtt(app)
CORS(app)


# custom endpoint
endpoint = '/api/v1'


# ROUTES
@app.route('/')
def index():
    return 'use /api/v1', 303


# flask routes
@app.route(f'{endpoint}/transfo', methods=['GET'])
def anime_favorites():
    # get params
    key = request.values.get('key')

    if request.method == 'GET':
        return jsonify(status_code=200, message="success"), 200


# MQTT
@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    print("Connected to Transfo MQTT broker with result code " + str(rc))
    mqtt.subscribe('/placeholder/topic')
    print(config["test"])
    with InfluxDBClient(url=Url, token=token, org=org) as client:
        write_api = client.write_api(write_options=SYNCHRONOUS)
        point = Point("mem") \
                .tag("host", "host1") \
                .field("used_percent", 23.43234543) \
                .time(datetime.utcnow(), WritePrecision.NS)
        print("Writing point: " + str(point))
        write_api.write(bucket, org, point)

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