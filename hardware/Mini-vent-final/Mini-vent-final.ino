#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);   // I2C Display
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#define REPORTING_PERIOD_MS 1000
PulseOximeter pox;
uint32_t tsLastReport = 0;
int relayPin = 7;  // This is for Uno but if you want to connect with node mcu you can connect with D7 but metion pin GPIO 13 i.e D7 = GPIO 13

WiFiClient client;
HTTPClient httpClient;

char ssid[] = "<wifi-name>";
char pass[] = "<wifi-pass>";

void onBeatDetected() {
  Serial.println("Beat!");
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.print("Initializing pulse oximeter..");
  lcd.begin();
  lcd.backlight();   // Turn on the blacklight and print a message.
  lcd.setCursor(2, 0);
  lcd.print("INITIALIZING");
  delay(2000);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH); // Relay High means Off

  if (!pox.begin()) {
    Serial.println("FAILED");
  } else {
    Serial.println("SUCCESS");
  }

  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Connected");
  Serial.println(WiFi.localIP());
  
  Serial.println();
  Serial.print("Connected! IP-Address: ");
  Serial.println(WiFi.localIP()); //Displaying the IP Address
  delay(1000);

  pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
  pox.setOnBeatDetectedCallback(onBeatDetected);       // Register a callback for the beat detection
}

void loop() {
  // Make sure to call update as fast as possible
  pox.update();
  float  BPM = pox.getHeartRate();
  float SpO2 = pox.getSpO2();

  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {

    Serial.print("Heart Beat:");
    Serial.println(pox.getHeartRate());
    Serial.print("SpO2:");
    Serial.println(pox.getSpO2());
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("BPM: ");
    lcd.print(pox.getHeartRate());

    lcd.setCursor(0, 1);
    lcd.print("SpO2: ");
    lcd.print(pox.getSpO2());
    lcd.print("%");

    if (pox.getSpO2() >= 0 && pox.getSpO2() < 90 ) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Mini-Vent Start!");
      lcd.setCursor(0, 1);
      lcd.print("SpO2: ");
      lcd.print(pox.getSpO2());
      lcd.print("%");
      Serial.println("Motor is Start");
      digitalWrite(relayPin, LOW); // Relay low means relay On
    }
    else {
      digitalWrite(relayPin, HIGH); // Relay low means relay On
    }

    tsLastReport = millis();
    postData(pox.getSpO2());
  }
}

void postData(int spo2) {
  String spo2String = String(spo2);
  String URL = "http://192.168.69.134:8080/api/monitor/" + spo2String;
  httpClient.begin(client, URL);
  httpClient.POST(URL);
  Serial.println(URL);
  delay(2500);
}