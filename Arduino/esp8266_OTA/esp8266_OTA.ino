/*********
  Rui Santos
  Complete project details at https://randomnerdtutorials.com
  Arduino IDE example: Examples > Arduino OTA > BasicOTA.ino
*********/

#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ESP8266HTTPClient.h>
//#include <ESPAsyncWebServer.h>

// Replace with your network credentials
const char* ssid = "David";
const char* password = "19071969";
String server = "http://192.168.1.155:25565";
String serverDistance = "http://192.168.1.155:25565/distance";

void setup() {
  setupDistanceSensor();
  WiFi.begin(ssid,password);
}

void loop() {
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ https requests
void sendDistanceData(){
   HTTPClient http;    //Declare object of class HTTPClient
 
   http.begin(serverDistance);      //Specify request destination
   http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header
 
   int httpCode = http.POST("sensorType=distance");   //Send the request
   String payload = http.getString();                  //Get the response payload
 
   Serial.println(httpCode);   //Print HTTP return code
   Serial.println(payload);    //Print request response payload
 
   http.end();  //Close connection
}
  
//  HTTPClient http;    //Declare object of class HTTPClient
//  Serial.println("sending GET");
//  http.begin(server);     //Specify request destination  
//  int httpCode = http.POST();            //Send the request
//  String payload = http.getString();
//  Serial.println(payload);
//  handleDistanceSensor
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Distance sensor
int trigPin = 11;    // Trigger
int echoPin = 12;    // Echo
long duration, cm, inches;

void setupDistanceSensor(){
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void writeTrigPinHigh(){
  digitalWrite(trigPin, HIGH);
}

void writeTrigPinLow(){
  digitalWrite(trigPin, LOW);
}

int handleDistanceSensor(){
  // The sensor is triggered by a HIGH pulse of 10 or more microseconds.
  // Give a short LOW pulse beforehand to ensure a clean HIGH pulse:
  writeTrigPinLow();
  delayMicroseconds(5);
  writeTrigPinHigh();
  delayMicroseconds(10);
  writeTrigPinLow();
 
  // Read the signal from the sensor: a HIGH pulse whose
  // duration is the time (in microseconds) from the sending
  // of the ping to the reception of its echo off of an object.

  duration = pulseIn(echoPin, HIGH);
 
  // Convert the time into a distance
  cm = (duration/2) / 29.1;     // Divide by 29.1 or multiply by 0.0343
  inches = (duration/2) / 74;   // Divide by 74 or multiply by 0.0135
  
  Serial.print(inches);
  Serial.print("in, ");
  Serial.print(cm);
  Serial.print("cm");
  Serial.println();

  // Send the request to the server
  sendDistanceData();
  
  return cm;
}

unsigned long start_time;

void asyncDelay(int ms,void *(*func)()){
  if(start_time == 0){
    Serial.println("Started Timer");
    start_time = millis();
  }
  else{
    unsigned long elapsed_time = millis() - start_time ;
    if(elapsed_time > ms){
      Serial.print(ms);
      Serial.print(" ms passed: ");
      start_time = millis();
      func();
    }
  }
}
