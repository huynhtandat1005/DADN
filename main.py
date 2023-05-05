import sys
import time
import random
from Adafruit_IO import MQTTClient
import pandas as pd
from simple_ai import *
import pymongo 
import requests

AIO_FEED_IDs = ["button1","button2","button3","receive"]
AIO_USERNAME = "huyn02"
AIO_KEY = "aio_SqTg91maCLWtArGLDrKNRIwZuULH" 
TOKEN = '5993617758:AAED3k1DbgETFSlgpfO2yMxZC_U03h3rW1Q'
Chat_ID = '-947923565'  

def send_to_telegram(message):
    apiURL = f'https://api.telegram.org/bot{TOKEN}/sendMessage'
    try:
        response = requests.post(apiURL, json={'chat_id': Chat_ID, 'text': message})
        print(response.text)
    except Exception as e:
        print(e)
# send_to_telegram('TestSendMessage')
def readData(feed_key, sensor_name):
    feed_data = pd.read_json('https://io.adafruit.com/api/v2/{}/feeds/{}/data'.format(AIO_USERNAME,feed_key))
    feed_data['created_at'] =  pd.to_datetime(feed_data['created_at'])
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db=client['IoT']
    collection = db["sensors"]
    data = {"Sensor":sensor_name,"Timestamp":feed_data['created_at'][0],"Value":float(feed_data['value'][0])}
    collection.insert_one(data)
    
def readDataStr(feed_key, sensor_name):
    feed_data = pd.read_json('https://io.adafruit.com/api/v2/{}/feeds/{}/data'.format(AIO_USERNAME,feed_key))
    feed_data['created_at'] =  pd.to_datetime(feed_data['created_at'])
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db=client['IoT']
    collection = db["sensors"]
    data = {"Sensor":sensor_name,"Timestamp":feed_data['created_at'][0],"Value":str(feed_data['value'][0])}
    collection.insert_one(data)

def connected(client):
    print("Ket noi thanh cong ...")
    for topic in AIO_FEED_IDs:
        client.subscribe(topic)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    print("Nhan du lieu: " + payload + " , feed id:" + feed_id)
    if feed_id == "receive":
        if payload == "1":
            readData("cambien1", "Temperature")
        if payload == "2":
            readData("cambien2", "Light")
        if payload == "3":
            readData("cambien3", "Humidity")
        if payload == "4":
            ai_result = image_detector()
            print("AI Output:", ai_result)
            if ai_result == True:
                client.publish("ai", "Open")
                client.publish("button2", "1")
                send_to_telegram('Successful identification.')
            else: 
                client.publish("ai", "Close")
                client.publish("button2", "0")
                send_to_telegram('Warning: Can\'t detect the face')
    if feed_id == "button2":
        readDataStr("button2", "Door")
            
client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    pass
        