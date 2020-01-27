void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  setupActivitySensor();  
}

void loop() {
  handleActivitySensor();
}

//~~~~~~~~~~~~~~~~ Activity sensor
int activeTime = 0;
unsigned long startActiveTime= 0;
unsigned long stillActiveTimer = 0;

void setupActivitySensor(){
  pinMode(A0,INPUT);
}
void handleActivitySensor(){
    int value = analogRead(A0);
  
  if(startActiveTime == 0){
    if(value > 500){
      startActiveTime=millis();
      Serial.println("started timing");
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
          Serial.println("still active");
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
}

void sendActiveTime(){
  int activeTime = (( millis() - startActiveTime ) / 1000) -3;
  Serial.print("active time in seconds:");
  Serial.print( activeTime );
  Serial.println();
}
