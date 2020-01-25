#include <ArduinoSTL.h>
#include<SoftwareSerial.h>

struct Event{
  long startTime;
  int duration;
  void (*callback)();
  bool indDelete;
};

using std::cin;
using std::cout;
using std::vector;

// pin configuration
SoftwareSerial nodeSerial(5,6);
int tiltSensorPin = A0;
int bottleSensorTrigPin = 10;
int bottleSensorEchoPin = 9;

//Global event handler array
vector <Event> events;

void setup() {
  //Setup serial for debugging and serial to the nodeMcu
  Serial.begin(9600);
  nodeSerial.begin(9600);

  // Setup sensor pins
  setupActivitySensor();
  setupBottleSensor();
}

void loop() {
  asyncEventLoop();
  
  // Activate all the sensors
  handleActivitySensor();
  handleBottleSensor();
}

void asyncEventLoop(){
  for(int i = 0;i < events.size();i++){
    Event event = events.at(i);
    unsigned long elapsed_time = millis() - event.startTime;
    
    if(elapsed_time > event.duration){
      event.callback();
      cout << "event fired!!";
      event.indDelete = true;
    }
  }  
}

void asyncDelay(int durationMs,void (*callback)()){
  Event newEvent = Event();
  
  newEvent.startTime = millis();
  newEvent.duration = durationMs;
  newEvent.callback = callback;

  cout << "added new event";
  events.push_back(newEvent);
}

//~~~~~~~~~~~~~~~~ BottleSensor
bool startedBottleMesauring = false;
int duration = 0;
int distance = 0;

void setupBottleSensor(){
  pinMode(bottleSensorTrigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(bottleSensorEchoPin, INPUT); // Sets the echoPin as an Input
}

void handleBottleSensor(){
  if(!startedBottleMesauring){
    startedBottleMesauring = true;
    firstStage();    
  }
}

void firstStage(){
  Serial.println("first stage");
  digitalWrite(bottleSensorTrigPin, LOW);
  asyncDelay(2,secondStage);
}

void secondStage(){
  Serial.println("second stage");
  digitalWrite(bottleSensorTrigPin, HIGH);
  asyncDelay(10,thirdStage);
}

void thirdStage(){
  digitalWrite(bottleSensorTrigPin, LOW);  
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(bottleSensorEchoPin, HIGH);
  
  // Calculating the distance
  distance = duration * 0.034 / 2;
  
  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  cout << (duration * 0.034/2);
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
