#include <WiFi.h>
#include <HTTPClient.h>
#include "MAX30100_PulseOximeter.h"

WiFiClient client;
HTTPClient httpClient;

char ssid[] = "ATL";
char pass[] = "ATL@sbsR";

PulseOximeter pox;

void onBeatDetected() {
  Serial.println("Beat!");
}

void setup() {
  Serial.begin(115200);
  initWiFi();
  Serial.print("RRSI: ");
  Serial.println(WiFi.RSSI());

  if (!pox.begin()) {
    Serial.println("FAILED");
    for (;;)
      ;
  } else {
    Serial.println("SUCCESS");
  }

  pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
  pox.setOnBeatDetectedCallback(onBeatDetected);
}

void loop() {
  // put your main code here, to run repeatedly:
  pox.update();
  float heartRate = pox.getHeartRate();
  float spO2 = pox.getSpO2();
  Serial.print("Heart Beat: ");
  Serial.println(heartRate);
  Serial.print("SpO2: ");
  Serial.print(spO2);
  postData(90);
}

void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}

void postData(int spo2) {
  String spo2String = String(spo2);
  String URL = "http://10.10.0.15:8080/api/monitor/" + spo2String;
  httpClient.begin(client, URL);
  httpClient.POST(URL);
  Serial.println(URL);
  delay(2500);
}