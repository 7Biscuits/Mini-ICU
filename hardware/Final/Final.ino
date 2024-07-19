#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include <TFT_eSPI.h>
#include <HTTPClient.h>

#define REPORTING_PERIOD_MS 1000

PulseOximeter pox;
TFT_eSPI tft = TFT_eSPI();
int relayPin = 13;
int redPin = 12;
int greenPin = 14;
int bluePin = 27;

uint32_t tsLastReport = 0;

void onBeatDetected() {
  Serial.println("Beat!");
}

void setup() {
  Serial.begin(115200);
  Serial.print("Initializing pulse oximeter..");

  tft.init();
  tft.setRotation(1);                      // Set the rotation (0-3)
  tft.fillScreen(TFT_BLACK);               // Clear screen to black
  tft.setTextColor(TFT_WHITE, TFT_BLACK);  // Set text color and background
  tft.setTextSize(4);                      // Set text size
  tft.setCursor(110, 110);                 // Set cursor position
  tft.println("LIFE SAVIOUR!");
  delay(2000);
  tft.fillScreen(TFT_BLACK);
  tft.setTextSize(3);       // Set text size
  tft.setCursor(110, 110);  // Set cursor position
  tft.println("PLACE FINGER!");
  delay(2000);
  tft.fillScreen(TFT_BLACK);

  pinMode(relayPin, OUTPUT);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  digitalWrite(relayPin, HIGH);  // Relay High means Off
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, HIGH);

  // Initialize the PulseOximeter instance
  if (!pox.begin()) {
    Serial.println("FAILED");
    for (;;)
      ;
  } else {
    Serial.println("SUCCESS");
  }

  // Register a callback for the beat detection
  pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
  pox.setOnBeatDetectedCallback(onBeatDetected);
}

void loop() {
  // Make sure to call update as fast as possible
  pox.update();

  // Report the results every REPORTING_PERIOD_MS milliseconds
  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
    tsLastReport = millis();

    float heartRate = pox.getHeartRate();
    int spO2 = pox.getSpO2();

    Serial.print("Heart Beat: ");
    Serial.println(heartRate);
    Serial.print("SpO2: ");
    Serial.println(spO2);
    // Serial.println(" %");
    tft.setTextColor(TFT_WHITE, TFT_BLACK);  // Set text color and background
    tft.setTextSize(3);                      // Set text size
    tft.setCursor(0, 0);                     // Set cursor position
    tft.print("BPM: ");
    tft.println(heartRate);
    tft.setCursor(0, 40);  // Set cursor position
    tft.print("SPO2: ");
    tft.print(spO2);
    tft.println("%");

    // Control ventilator based on SpO2 level
    if (spO2 >= 0 && spO2 < 90) {
      tft.setTextSize(3);
      tft.setCursor(110, 110);
      tft.println("Mini-ICU Start!");
      digitalWrite(relayPin, LOW);  // Relay low means relay On
      digitalWrite(greenPin, LOW);
      digitalWrite(bluePin, LOW);
      digitalWrite(redPin, HIGH);
    }
    else if (spO2 >= 90) {
      digitalWrite(relayPin, HIGH);  // Relay high means relay Off
      digitalWrite(redPin, LOW);
      digitalWrite(bluePin, LOW);
      digitalWrite(greenPin, HIGH);
    }
  }
}