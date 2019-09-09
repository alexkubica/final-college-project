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
String server = "http://192.168.1.155:25565/kaki";

void setup() {
}

void loop() {
  ArduinoOTA.handle();
  HTTPClient http;    //Declare object of class HTTPClient
  Serial.println("sending GET");
  http.begin(server);     //Specify request destination  
  int httpCode = http.GET();            //Send the request
  String payload = http.getString();
  Serial.println(payload);
}
