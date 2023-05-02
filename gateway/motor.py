import paho.mqtt.client as mqttclient
import time
import json
import sys

BROKER_ADDRESS = "demo.thingsboard.io"
PORT = 1883
THINGS_BOARD_ACCESS_TOKEN = "yTB4wHMvOMxyOQQy9nC2"
forcing = "False"

def subscribed(client, userdata, mid, granted_qos):
    print("Subscribed...")


def recv_message(client, userdata, message):
    # client.publish('v1/devices/me/attributes/request/1', '{"clientKeys":"method,params,humi,setHumi"}')
    global forcing
    print("Received: ", message.payload.decode("utf-8"))
    temp_data = {'active': "true"}
    print(forcing)
    try:
        jsonobj = json.loads(message.payload)
        if jsonobj['method'] == "Set motor" and jsonobj['params'] == "On" and forcing == "False":
            temp_data['active'] = "true"
            print(temp_data)
            client.publish('v1/devices/me/attributes', json.dumps(temp_data), 1)
        if jsonobj['method'] == "Set motor" and jsonobj['params'] == "Off" and forcing == "False":
            temp_data['active'] = "false"
            client.publish('v1/devices/me/attributes', json.dumps(temp_data), 1)
            print(temp_data)
        if jsonobj['method'] == "Force set motor" and jsonobj['params'] == "On":
            temp_data['force active'] = "On"
            forcing = "False"
            print(temp_data)
            client.publish('v1/devices/me/attributes', json.dumps(temp_data), 1)
        if jsonobj['method'] == "Force set motor" and jsonobj['params'] == "Off":
            temp_data['force active'] = "Off"
            forcing = "True"
            client.publish('v1/devices/me/attributes', json.dumps(temp_data), 1)
            print(temp_data)
    except:
        pass


def connected(client, userdata, flags, rc):
    if rc == 0:
        print("Thingsboard connected successfully!!") 
        # subscribe to receive data from client server
        client.subscribe("v1/devices/me/rpc/request/+")
        # client.publish('v1/devices/me/attributes/request/1', '{"clientKeys":"method,params,humi,setHumi"}')
        # client.publish("v1/devices/me/attributes/request/1",'{"clientKeys":"humi,setHumi", "sharedKeys":"shared1,shared2"}')
    else:
        print("Connection is failed")

client = mqttclient.Client("Gateway_Thingsboard")
client.username_pw_set(THINGS_BOARD_ACCESS_TOKEN)

client.on_connect = connected
client.connect(BROKER_ADDRESS, 1883)
client.loop_start()

client.on_subscribe = subscribed
client.on_message = recv_message

methodSensor = {
    "method": "Set motor",
    "params": "Off",
    "humi": "100",
    "setHumi": "on"
}

while 1:
    #request to get key value from client server
    # client.publish('v1/devices/me/attributes/request/1', '{"clientKeys":"method,params,humi,setHumi"}')
    #send data to attributes (test)
    client.publish("v1/devices/me/attributes", json.dumps(methodSensor),1)
    time.sleep(5)