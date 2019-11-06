#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <SoftwareSerial.h>
SoftwareSerial s(D6,D5); // (Rx, Tx)

int stat = WL_IDLE_STATUS;

bool sendPackets = true;

const char* ssid = "David";
const char* password = "19071969";
const String serverIp = "http://192.168.1.239:8080";
void setup(){
  s.begin(9600);
  Serial.begin(9600);
  
  stat = WiFi.begin(ssid, password);
  // attempt to connect to Wifi network:
  while (stat != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    
    Serial.println(stat);
    Serial.println(WL_CONNECTED);
    stat = WiFi.status();
    // wait 2 seconds for connection:
    delay(2000);
  }
  Serial.println("Connected to wifi");
  sendConnected();
}

void loop(){
  if(s.available() > 10){
    char buf[200];
    int len = s.readBytesUntil('\n', buf, 10);
    Serial.println(buf);
    parseSerialBeforeSend(buf);    
  }
}

void parseSerialBeforeSend (char* rawInput ){
  String data(rawInput);
  int indexOfColon = data.indexOf(":");
  int indexOfSemiColon = data.indexOf(";");
  if(data.length() > 1 && indexOfColon > 1){    
    Serial.println(data.substring(0,indexOfColon));
    Serial.println(data.substring(indexOfColon + 1,indexOfSemiColon));
    sendData1(data.substring(0,indexOfColon),data.substring(indexOfColon + 1,indexOfSemiColon));
  }
}

void sendData1(String sensorType,String sensorData){
  if(sendPackets == true){
    Serial.print("sendind packet to:");
    Serial.println(serverIp + "/" + sensorType);
    HTTPClient http;    //Declare object of class HTTPClient
    
    http.begin(serverIp + "/" + sensorType);      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
    int httpCode = http.POST("{\"data\":" + sensorData + "\n}");   //Send the request
    String payload = http.getString();                  //Get the response payload
    
    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload
    
    http.end();  //Close connection
  }
}
void sendConnected(){
  if(sendPackets == true){
    Serial.print("sendind packet to:");
    Serial.println(serverIp + "/bottle");
    HTTPClient http;    //Declare object of class HTTPClient
    
    http.begin(serverIp + " /bottle");      //Specify request destination
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header
    int httpCode = http.POST("{\"data\":13}");   //Send the request
    String payload = http.getString();                  //Get the response payload
    
    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload
    
    http.end();  //Close connection
  }
}
