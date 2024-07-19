// VCC to 3.3V on the ESP32.
// GND to GND on the ESP32.
// CS (Chip Select) to GPIO 15 on the ESP32.
// RESET to GPIO 4 on the ESP32.
// DC/RS (Data/Command) to GPIO 2 on the ESP32.
// SDI/MOSI (Serial Data In) to GPIO 23 on the ESP32.
// SCK (Serial Clock) to GPIO 18 on the ESP32.
// LED to 3.3V through a current-limiting resistor (usually 220Ω).

// We'll use the TFT_eSPI library, which is optimized for the ESP32 and supports many TFT displays, including the ILI9488.
// Very Important Go in Library section and do it accordingly instruction given
// Navigate to the TFT_eSPI library folder. You can find it in your Arduino libraries directory.
// Open the User_Setup.h file in the TFT_eSPI library folder.
// Uncomment and set the correct driver for your display (e.g., #define ILI9488_DRIVER).


// I am attaching user_setup.h file here as its you need to do with only ILI9488 Display ---->

//                            USER DEFINED SETTINGS
// //   Set driver type, fonts to be loaded, pins used and SPI control method etc.
// //
// //   See the User_Setup_Select.h file if you wish to be able to define multiple
// //   setups and then easily select which setup file is used by the compiler.
// //
// //   If this file is edited correctly then all the library example sketches should
// //   run without the need to make any more changes for a particular hardware setup!
// //   Note that some sketches are designed for a particular TFT pixel width/height

// // User defined information reported by "Read_User_Setup" test & diagnostics example
// #define USER_SETUP_INFO "User_Setup"

// // ##################################################################################
// //
// // Section 1. Call up the right driver file and any options for it
// //
// // ##################################################################################

// // Only define one driver, the other ones must be commented out
// #define ILI9488_DRIVER     // WARNING: Do not connect ILI9488 display SDO to MISO if other devices share the SPI bus (TFT SDO does NOT tristate when CS is high)

// // ##################################################################################
// //
// // Section 2. Define the pins that are used to interface with the display here
// //
// // ##################################################################################

// // ###### EDIT THE PIN NUMBERS IN THE LINES FOLLOWING TO SUIT YOUR ESP32 SETUP ######

// #define TFT_MISO 19  // Master In Slave Out pin
// #define TFT_MOSI 23  // Master Out Slave In pin
// #define TFT_SCLK 18  // Serial Clock pin
// #define TFT_CS   15  // Chip select control pin
// #define TFT_DC    2  // Data Command control pin
// #define TFT_RST   4  // Reset pin (could connect to RST pin)
// #define TFT_BL   22  // LED back-light control pin

// // ##################################################################################

// // Section 4. Other options

// // ##################################################################################

// #define SPI_FREQUENCY  27000000
// #define SPI_READ_FREQUENCY  20000000
// #define SPI_TOUCH_FREQUENCY  2500000

// //#define USE_HSPI_PORT
// //#define SUPPORT_TRANSACTIONS


// #define TFT_MISO  19 // Not connected because it not in use but if you want to connect then connect in GPIO 19
// #define TFT_MOSI 23
// #define TFT_SCLK 18
// #define TFT_CS   15  // Chip select control pin
// #define TFT_DC    2  // Data Command control pin
// #define TFT_RST   4  // Reset pin (could connect to RST pin)


// If your display’s RESET pin is connected to the ESP32 RESET pin or 3.3V, uncomment the line #define TFT_RST -1.
// If you are using a specific GPIO pin for the RESET (e.g., GPIO 4), comment out #define TFT_RST -1 and define the correct GPIO pin instead (e.g., #define TFT_RST 4).


//#define SCREEN_WIDTH 320
//#define SCREEN_HEIGHT 240
//
//
//#define BLACK   0x0000
//#define BLUE    0x001F
//#define RED     0xF800
//#define GREEN   0x07E0
//#define CYAN    0x07FF
//#define MAGENTA 0xF81F
//#define YELLOW  0xFFE0
//#define WHITE   0xFFFF


#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include <TFT_eSPI.h>  // Include the graphics library
// #include <WiFi.h>
#include <HTTPClient.h>

#define REPORTING_PERIOD_MS 1000

PulseOximeter pox;
TFT_eSPI tft = TFT_eSPI();  // Create object "tft"
int relayPin = 13;          // GPIO 13 for ESP32
int redPin = 12;
int greenPin = 14;
int bluePin = 27;

uint32_t tsLastReport = 0;

// WiFiClient client;
// HTTPClient httpClient;

// char ssid[] = "ATL";
// char pass[] = "ATL@sbsR";

// char ip[] = "10.10.0.15";

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
  // initWiFi();
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
    tft.setTextSize(3);                // Set text size
    tft.setCursor(0, 0);                     // Set cursor position
    tft.print("BPM: ");
    tft.println(heartRate);
    tft.setCursor(0, 40);  // Set cursor position
    tft.print("SPO2: ");
    tft.print(spO2);
    tft.println("%");
    // postData(spO2);

    // Control ventilator based on SpO2 level
    if (spO2 >= 0 && spO2 < 90) {
      // tft.fillScreen(TFT_BLACK);
      tft.setTextSize(3);
      tft.setCursor(110, 110);
      tft.println("Mini-ICU Start!");
      // Serial.println("Motor Start");
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
  // postData(spO2);
}

// void initWiFi() {
//   WiFi.mode(WIFI_STA);
//   WiFi.begin(ssid, pass);
//   Serial.print("Connecting to WiFi");
//   while (WiFi.status() != WL_CONNECTED) {
//     Serial.print('.');
//     delay(1000);
//   }
//   Serial.println(WiFi.localIP());
// }

// void postData(int spo2) {
//   String spo2String = String(spo2);
//   String URL = "http://" + String(ip) + ":8080/api/monitor/" + spo2String;
//   httpClient.begin(client, URL);
//   httpClient.POST(URL);
//   Serial.println(URL);
//   // delay(1500);
// }
