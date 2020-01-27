#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <SoftwareSerial.h>
SoftwareSerial s(D6,D5); // (Rx, Tx)

int stat = WL_IDLE_STATUS;

bool sendPackets = true;

const char* ssid = "Kubica";
const char* password = "Nice2019";
const String serverIp = "http://192.168.43.15:8080";

WiFiServer server(80);

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

  server.begin();
}

void loop(){
  if(s.available() > 10){
    char buf[200];
    int len = s.readBytesUntil('\n', buf, 10);
    Serial.println(buf);
    parseSerialBeforeSend(buf);    
  }

  WiFiClient clientt = server.available(); 
  
  String currentLine = "";
  
  if (clientt) {
    Serial.println("New Client.");
    while (clientt.connected()) {             // if there's bytes to read from the client,
      char c = clientt.read();             // read a byte, then
      //Serial.write(c);
      
      if(c == '\n'){
        Serial.println(currentLine);
      } else if (c != '\r') {  // if you got anything else but a carriage return character,
        currentLine += c;      // add it to the end of the currentLine
      }
      else{
        break;
      }
    }
  }
}

void parseSerialBeforeSend (char* rawInput ){
  String data(rawInput);
  int indexOfColon = data.indexOf(":");
  int indexOfSemiColon = data.indexOf(";");
  if(data.length() > 1 && indexOfColon > 0){
    Serial.print("data:");
    Serial.print(data.substring(0,indexOfColon));
    Serial.print(",");  
    Serial.print(data.substring(indexOfColon + 1,indexOfSemiColon));
    Serial.print("\n");  
    sendData1(data.substring(0,indexOfColon),data.substring(indexOfColon + 1,indexOfSemiColon));
  }
}

void sendData1(String sensorType,String sensorData){
  if(sendPackets == true){
    Serial.print("sendind packet to:");
    Serial.println(serverIp + "/" + sensorType);
    Serial.print("body:");
    Serial.println("{\"data\":" + sensorData + "}");
    HTTPClient http;    //Declare object of class HTTPClient
    
    http.begin(serverIp + "/" + sensorType);      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
    int httpCode = http.POST("{\"data\":" + sensorData + "}");   //Send the request
    String payload = http.getString();                  //Get the response payload
    
    Serial.print("http code:");
    Serial.print(httpCode);   //Print HTTP return code
    Serial.println();
    
    http.end();  //Close connection
  }
}

void sendConnected(){
  if(sendPackets == true){
    Serial.print("sendind packet to:");
    Serial.println(serverIp + "/jarvisBrain/isOnline");
    HTTPClient http;    //Declare object of class HTTPClient
    
    http.begin(serverIp + " /jarvisBrain/isOnline");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
    int httpCode = http.POST("{\"name\":\"bottle\"}");   //Send the request
    
    String payload = http.getString();                  //Get the response payload

    Serial.print("http code:");
    Serial.print(httpCode);   //Print HTTP return code
    Serial.println();
        
    http.end();  //Close connection
  }
}
