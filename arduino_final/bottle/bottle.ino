#include<SoftwareSerial.h>

// pin configuration
SoftwareSerial nodeSerial(5,6);

// defines pins numbers
const int trigPin = 9;
const int echoPin = 10;

// defines variables
long duration;
float distance;
const float BOTTLE_HEIGHT = 8;
const float BOTTLE_MIN_HEIGHT = 3;

void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  Serial.begin(9600); // Starts the serial communication
  nodeSerial.begin(9600);
}

//const unsigned long fiveMinutes = 5 * 60 * 1000UL;
const unsigned long fiveMinutes = 1000UL;
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
    distance = (int)(duration * 0.034 / 2) - BOTTLE_MIN_HEIGHT;
    distance = distance > BOTTLE_HEIGHT ? BOTTLE_HEIGHT : distance;
    float oldMin = 0;
    float newMin = 0;
    float newRange = 100;
    float oldRange = BOTTLE_HEIGHT;    
    float newDistance = (((BOTTLE_HEIGHT - distance) - oldMin) * newRange / oldRange) + newMin;
   
//    float distancePercentage = (int)(100 - (distance / BOTTLE_HEIGHT * 100));
    
    // Prints the distance on the Serial Monitor
    Serial.print("Distance: ");
    Serial.println(newDistance);
    Serial.println(distance);
    char txt[50];
    sprintf(txt,"bottle:%d;\n", (int)newDistance );
    nodeSerial.print(txt);
  }
}
