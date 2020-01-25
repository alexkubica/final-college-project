#include <ArduinoSTL.h>     // C++ standard library for cin cout and c++ standard functions
#include <SoftwareSerial.h> // Library for communication between nodeMcu(Wifi arduino) and arduino Uno
#include "Wire.h"           //Library for communication with mpu6050

using std::cin;
using std::cout;

// pin configuration
SoftwareSerial nodeSerial(5, 6);
int uvSensorPin = A0;
int tiltSensorPin = A2;


int uvDelay = 5; //In seconds
int gyroDelay = 5; // In Seconds

long uvMillis = 0;
long gyroMillis = 0;

void setup()
{
    //Setup serial for debugging and serial to the nodeMcu
    Serial.begin(9600);
    nodeSerial.begin(9600);

    // Setup sensor pins
    setupActivitySensor();
    setupUVSensor();
    setupGyroAndTemp();
}
void loop()
{
    handleActivitySensor();
    handleUVSensor();
    handleGyroAndTemp();
}

//~~~~~~~~~~~~~~~~ GyroAndTemp
const int MPU_ADDR = 0x68; // I2C address of the MPU-6050. If AD0 pin is set to HIGH, the I2C address will be 0x69.
int16_t accelerometer_x, accelerometer_y, accelerometer_z; // variables for accelerometer raw data
int16_t gyro_x, gyro_y, gyro_z; // variables for gyro raw data
int16_t temperature; // variables for temperature data
char tmp_str[7]; // temporary variable used in convert function
char* convert_int16_to_str(int16_t i) { // converts int16 to string. Moreover, resulting strings will have the same length in the debug monitor.
  sprintf(tmp_str, "%6d", i);
  return tmp_str;
}

int minVal=265;
int maxVal=402;

void setupGyroAndTemp()
{
    Wire.begin();
    Wire.beginTransmission(MPU_ADDR); // Begins a transmission to the I2C slave (GY-521 board)
    Wire.write(0x6B);                 // PWR_MGMT_1 register
    Wire.write(0);                    // set to zero (wakes up the MPU-6050)
    Wire.endTransmission(true);
}

void handleGyroAndTemp()
{
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B); // starting with register 0x3B (ACCEL_XOUT_H) [MPU-6000 and MPU-6050 Register Map and Descriptions Revision 4.2, p.40]
  Wire.endTransmission(false); // the parameter indicates that the Arduino will send a restart. As a result, the connection is kept active.
  Wire.requestFrom(MPU_ADDR, 7*2, true); // request a total of 7*2=14 registers
 
  accelerometer_x = Wire.read()<<8 | Wire.read(); // reading registers: 0x3B (ACCEL_XOUT_H) and 0x3C (ACCEL_XOUT_L)
  accelerometer_y = Wire.read()<<8 | Wire.read(); // reading registers: 0x3D (ACCEL_YOUT_H) and 0x3E (ACCEL_YOUT_L)
  accelerometer_z = Wire.read()<<8 | Wire.read(); // reading registers: 0x3F (ACCEL_ZOUT_H) and 0x40 (ACCEL_ZOUT_L)
  temperature = Wire.read()<<8 | Wire.read(); // reading registers: 0x41 (TEMP_OUT_H) and 0x42 (TEMP_OUT_L)
  gyro_x = Wire.read()<<8 | Wire.read(); // reading registers: 0x43 (GYRO_XOUT_H) and 0x44 (GYRO_XOUT_L)
  gyro_y = Wire.read()<<8 | Wire.read(); // reading registers: 0x45 (GYRO_YOUT_H) and 0x46 (GYRO_YOUT_L)
  gyro_z = Wire.read()<<8 | Wire.read(); // reading registers: 0x47 (GYRO_ZOUT_H) and 0x48 (GYRO_ZOUT_L)

  int xAng = map(accelerometer_x,minVal,maxVal,-90,90);
  int yAng = map(accelerometer_y,minVal,maxVal,-90,90);
  int zAng = map(accelerometer_z,minVal,maxVal,-90,90);

  int x = RAD_TO_DEG * (atan2(-yAng, -zAng)+PI);
  int y = RAD_TO_DEG * (atan2(-xAng, -zAng)+PI);
  int z = RAD_TO_DEG * (atan2(-yAng, -xAng)+PI);

  Serial.print("AngleX= ");
  Serial.print(x);
  
  Serial.print(" AngleY= ");
  Serial.print(y);
  
  Serial.print(" AngleZ= ");
  Serial.print(z);
  Serial.println();

  // print out data
//  Serial.print("aX = "); Serial.print(convert_int16_to_str(accelerometer_x));
//  Serial.print(" | aY = "); Serial.print(convert_int16_to_str(accelerometer_y));
//  Serial.print(" | aZ = "); Serial.print(convert_int16_to_str(accelerometer_z));
//  // the following equation was taken from the documentation [MPU-6000/MPU-6050 Register Map and Description, p.30]
//  Serial.print(" | tmp = "); Serial.print(temperature/340.00+36.53);
//  Serial.print(" | gX = "); Serial.print(convert_int16_to_str(gyro_x));
//  Serial.print(" | gY = "); Serial.print(convert_int16_to_str(gyro_y));
//  Serial.print(" | gZ = "); Serial.print(convert_int16_to_str(gyro_z));
//  Serial.println();

  if(gyroMillis == 0){
    gyroMillis = millis();   
  }
  else if(millis() - gyroMillis > (gyroDelay * 1000)){
    
    sendGyroTempData(temperature/340.00+36.53,x);
    uvMillis = 0;
  }
}

void sendGyroTempData(int temperature,int posture)
{
    Serial.print("temprature is:");
    Serial.println(temperature);
    nodeSerial.print("temprature:");
    nodeSerial.print(temperature);
    nodeSerial.println();
    Serial.print("posture is:");
    nodeSerial.print("posture:");
    nodeSerial.print(posture);
    nodeSerial.println();
}

//~~~~~~~~~~~~~~~~ UV sensor
void setupUVSensor()
{
    pinMode(tiltSensorPin, INPUT);
}


void handleUVSensor()
{
  if(uvMillis == 0){
    uvMillis = millis();   
  }
  else if(millis() - uvMillis > (uvDelay * 1000)){
    int uv_rate = digitalRead(uvSensorPin);
    sendUVIndex(uv_rate);
    uvMillis = 0;
  }
}

void sendUVIndex(int uv_index)
{
    Serial.print("uv index is:");
    Serial.println(uv_index);
    nodeSerial.print("uv:");
    nodeSerial.print(uv_index);
    nodeSerial.println();
}

//~~~~~~~~~~~~~~~~ Activity sensor
int activeTime = 0;
unsigned long startActiveTime = 0;
unsigned long stillActiveTimer = 0;

void setupActivitySensor()
{
    pinMode(tiltSensorPin, INPUT);
}

void handleActivitySensor()
{
    int value = analogRead(tiltSensorPin);

    if (startActiveTime == 0)
    {
        if (value > 500)
        {
            startActiveTime = millis();
        }
    }
    // If three seconds passed
    else if (millis() - startActiveTime > 10)
    {
        // After three seconds start checking for activity
        if (stillActiveTimer == 0)
        {
            Serial.println("Checking for activity");
            stillActiveTimer = millis();
        }
        else
        {
            if ((millis() - stillActiveTimer < 3000))
            {
                if (value > 500)
                {
                    //Serial.println("still active");
                    stillActiveTimer = millis();
                }
            }
            else
            {
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

void sendActiveTime()
{
    int activeTime = ((millis() - startActiveTime) / 1000) - 3;
    Serial.print("active time in seconds");
    Serial.println(activeTime);
    nodeSerial.print("movement:");
    nodeSerial.print(activeTime);
    nodeSerial.println();
}
