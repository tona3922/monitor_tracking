import serial.tools.list_ports
import paho.mqtt.client as mqttclient
import time
import json
import random

BROKER_ADDRESS = "demo.thingsboard.io"
PORT = 1883
THINGS_BOARD_ACCESS_TOKEN = "KA7eQnwq2bK84MItGVWK"



def subscribed(client, userdata, mid, granted_qos):
    print("Subscribed...")


def recv_message(client, userdata, message):
    print("Received: ", message.payload.decode("utf-8"))
    temp_data = {'active': False}
    cmd = 0
    try:
        jsonobj = json.loads(message.payload)
        if jsonobj['method'] == "setMotor" and jsonobj['params'] == "On":
            temp_data['active'] = True
            cmd = 0
        if jsonobj['method'] == "setMotor" and jsonobj['params'] == "Off":
            temp_data['active'] = False
            cmd = 1 
        if jsonobj['method'] == "setFan" and jsonobj['params'] == "On":
            temp_data['active'] = True
            cmd = 2
        if jsonobj['method'] == "setFan" and jsonobj['params'] == "Off":
            temp_data['active'] = False
            cmd = 3
        if jsonobj['method'] == "setLight" and jsonobj['params'] == "On":
            temp_data['active'] = True
            cmd = 'a'
        if jsonobj['method'] == "setLight" and jsonobj['params'] == "Off":
            temp_data['active'] = False
            cmd = 'b'
    except:
        pass
    if isMicrobitConnected:
         ser.write((str(cmd)).encode())


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


def getPort():
    ports = serial.tools.list_ports.comports()
    print(ports)
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        print(strPort)
        if "USB-SERIAL CH340" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
            print(commPort)
    return commPort


isMicrobitConnected = False
if getPort() != "None":
    ser = serial.Serial( port=getPort(), baudrate=115200)
    isMicrobitConnected = True

# mess = ""
entry_dict = {
    "TEMPERATURE": "",
    "HUMIDITY": "",
}
methodSensor = {
    "method": "",
    "params": ""
}

def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    entry_dict["TEMPERATURE"] = splitData[0]
    entry_dict["HUMIDITY"] = splitData[1]
    print(type(entry_dict["HUMIDITY"]))
    print(json.dumps(entry_dict))
    client.publish("v1/devices/me/telemetry", json.dumps(entry_dict))
    if  float(entry_dict["HUMIDITY"]) < 60:
        methodSensor["method"] = "setFan"
        methodSensor["params"] = "On"
        client.publish("v1/devices/me/attributes", json.dumps(methodSensor),1)
    if  float(entry_dict["HUMIDITY"]) > 80:
        methodSensor["method"] = "setFan"
        methodSensor["params"] = "Off"
        client.publish("v1/devices/me/attributes", json.dumps(methodSensor),1)
    if  float(entry_dict["TEMPERATURE"]) > 30:
        methodSensor["method"] = "setAir"
        methodSensor["params"] = "On"
        client.publish("v1/devices/me/attributes", json.dumps(methodSensor),1)
    if  float(entry_dict["TEMPERATURE"]) < 20:
        methodSensor["method"] = "setAir"
        methodSensor["params"] = "Off"
        client.publish("v1/devices/me/attributes", json.dumps(methodSensor),1)


mess = ""
def readSerial():
    print("hello")
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]


while True:
    if isMicrobitConnected:
        print("Yolobit access is accepted!")
        readSerial()
    
    time.sleep(1)