
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ArduinoSTL.h>
#include<SoftwareSerial.h>

#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// pin configuration
SoftwareSerial nodeSerial(5,6);
int heatSensorPin = A1;

void setup() {
  //Setup serial for debugging and serial to the nodeMcu
  Serial.begin(9600);
  nodeSerial.begin(9600);

  dht.begin();
  // Setup sensor pins
  setupHeatSensor();
}
void loop(){
    handleHeatSensor();
}

void setupHeatSensor(){
  pinMode(heatSensorPin,INPUT);
}

void handleHeatSensor(){
  if(millis() % 1000 == 0){
    float heat = dht.readTemperature();
    float humidity = dht.readHumidity();
    Serial.print("heat:");
    Serial.print(heat);
    Serial.print(" humidity:");
    Serial.println(humidity);
  }
}

void sendTempAndHumidity(int temperature,int humidity){
//  Serial.print("active time in seconds");
//  Serial.println(activeTime);
//  nodeSerial.print("active time in seconds:");
//  nodeSerial.print( activeTime );
//  nodeSerial.println();
}
