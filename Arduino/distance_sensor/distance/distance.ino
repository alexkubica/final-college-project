void setup() {
  //Serial Port begin
  Serial.begin (9600);
  //Define inputs and outputs

} 
void loop() {
  asyncDelay(250,&handleDistanceSensor);
}
