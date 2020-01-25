#include <ArduinoSTL.h>
#include<SoftwareSerial.h>

using std::cin;
using std::cout;

// pin configuration
SoftwareSerial nodeSerial(5,6);
int tiltSensorPin = A0;

void setup() {
  //Setup serial for debugging and serial to the nodeMcu
  Serial.begin(9600);
  nodeSerial.begin(9600);

  // Setup sensor pins
  setupActivitySensor();
}
void loop(){
    handleActivitySensor();
}

//~~~~~~~~~~~~~~~~ Activity sensor
int activeTime = 0;
unsigned long startActiveTime= 0;
unsigned long stillActiveTimer = 0;

void setupActivitySensor(){
  pinMode(tiltSensorPin,INPUT);
}

void handleActivitySensor(){
  int value = analogRead(A0);
  
  if(startActiveTime == 0){
    if(value > 500){
      startActiveTime=millis();
    }
  }
  // If three seconds passed
  else if(millis() - startActiveTime > 10){
    // After three seconds start checking for activity
    if(stillActiveTimer == 0){
      Serial.println("Checking for activity");
      stillActiveTimer = millis();
    }
    else {
      if((millis() - stillActiveTimer < 3000)){
        if(value > 500){
          //Serial.println("still active");
          stillActiveTimer = millis();  
        }
      }
      else{
        Serial.println("not active");
        sendActiveTime();
        startActiveTime = 0;
        stillActiveTimer = 0;
      }
    }
  }

  // Flush the serial data
  Serial.flush();
}

void sendActiveTime(){
  int activeTime = (( millis() - startActiveTime ) / 1000) -3;
  Serial.print("active time in seconds");
  Serial.println(activeTime);
  nodeSerial.print("active time in seconds:");
  nodeSerial.print( activeTime );
  nodeSerial.println();
}
