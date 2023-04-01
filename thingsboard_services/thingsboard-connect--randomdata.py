print("Xin chào ThingsBoard")
import paho.mqtt.client as mqttclient
import time
import json
from random import *

BROKER_ADDRESS = "demo.thingsboard.io"
# BROKER_ADDRESS = "demo.thingsboard.io"
PORT = 1883
THINGS_BOARD_ACCESS_TOKEN = "KA7eQnwq2bK84MItGVWK"


def subscribed(client, userdata, mid, granted_qos):
    print("Subscribed...")


def recv_message(client, userdata, message):
    print("Received: ", message.payload.decode("utf-8"))
    temp_data = {'value': True}
    try:
        jsonobj = json.loads(message.payload)
        if jsonobj['method'] == "setValue":
            temp_data['value'] = jsonobj['params']
            client.publish('v1/devices/me/attributes', json.dumps(temp_data), 1)
    except:
        pass


def connected(client, usedata, flags, rc):
    if rc == 0:
        print("Thingsboard connected successfully!!")
        client.subscribe("v1/devices/me/rpc/request/+")
    else:
        print("Connection is failed")


client = mqttclient.Client("Gateway_Thingsboard")
client.username_pw_set(THINGS_BOARD_ACCESS_TOKEN)

client.on_connect = connected
client.connect(BROKER_ADDRESS, 1883)
client.loop_start()

client.on_subscribe = subscribed
client.on_message = recv_message

temp = 30
humi = 50
light_intesity = 100
counter = 0
while True:
    collect_data = {'temperature': temp, 'humidity': humi, 'light':light_intesity}
    temp = uniform(30.0, 40.0)
    humi = uniform(30, 80)
    light_intesity += 1
    client.publish('v1/devices/me/telemetry', json.dumps(collect_data), 1)
    time.sleep(5)