#include<SoftwareSerial.h>
// pin configuration
SoftwareSerial nodeSerial(5,6);

// defines pins numbers
const int trigPin = 9;
const int echoPin = 10;
// defines variables
long duration;
int distance;

void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  Serial.begin(9600); // Starts the serial communication
  nodeSerial.begin(9600);
}

//const unsigned long fiveMinutes = 5 * 60 * 1000UL;
const unsigned long fiveMinutes = 6000UL;
unsigned long lastSampleTime = 0 - fiveMinutes;  // initialize such that a reading is due the first time through loop()
unsigned long now;

void loop() {
  now = millis();
 
  if (now - lastSampleTime >= fiveMinutes)
  {
    lastSampleTime = now;
    // Clears the trigPin
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    // Sets the trigPin on HIGH state for 10 micro seconds
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    // Reads the echoPin, returns the sound wave travel time in microseconds
    duration = pulseIn(echoPin, HIGH);
    // Calculating the distance
    distance= duration*0.034/2;
    // Prints the distance on the Serial Monitor
    Serial.print("Distance: ");
    Serial.println(distance);
    
    char txt[50];
    sprintf(txt,"bottle:%d;\n",distance);
    nodeSerial.print(txt);
  }
}
