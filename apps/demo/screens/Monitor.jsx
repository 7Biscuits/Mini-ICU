import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Card from "../components/MyCard";
import { Video, ResizeMode } from "expo-av";

export default function Monitor() {
  const [spo2, setSpo2] = useState(90);
  const [ecg, setEcg] = useState(90);
  const [emg, setEmg] = useState(90);

  useEffect(() => {
    const interval = setInterval(() => {
      const spo2Value = Math.floor(Math.random() * (100 - 80 + 1) + 80);
      const ecgValue = Math.floor(Math.random() * (100 - 80 + 1) + 80);
      const emgValue = Math.floor(Math.random() * (100 - 80 + 1) + 80);

      setSpo2(spo2Value);
      setEcg(ecgValue);
      setEmg(emgValue);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Card />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <View style={styles.mainCardView}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text>ECG</Text>
            <View style={styles.subCardView}>
              <Text style={{ fontSize: 30 }}>{ecg}</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainCardView}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text>EMG</Text>
            <View style={styles.subCardView}>
              <Text style={{ fontSize: 30 }}>{emg}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <View style={styles.mainCardView}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text>SPO2</Text>
            <View style={styles.subCardView}>
              <Text style={{ fontSize: 30 }}>{spo2}</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainCardView}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text>Condition</Text>
            <View style={styles.subCardView}>
              <Text
                style={{ fontSize: 12, color: spo2 < 90 ? "red" : "green" }}
              >
                {spo2 < 90 ? "Critical" : "Normal"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Video
        source={{
          uri: "https://static.videezy.com/system/resources/previews/000/038/626/original/alb_ekg004_1080p_24fps.mp4",
        }}
        paused={false}
        style={styles.video}
        useNativeControls={false}
        shouldPlay={true}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  mainCardView: {
    height: 90,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#757373",
    borderRadius: 15,
    flexDirection: "column",
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: 350,
    height: 250,
    marginLeft: 15,
    marginRight: 15,
  },
});