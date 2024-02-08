import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Video, ResizeMode } from "expo-av";
import Colors from "../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import AppText from "../components/AppText";
import { Ionicons } from "@expo/vector-icons";
import { getMonitorData } from "../services/monitor";

type Props = NativeStackScreenProps<RootStackParamList, "ICUMonitor">;

export default function ICUMonitor({ route }: Props) {
  const patient = route.params.patient;
  const [spo2, setSpo2] = useState(90);
  const [ecg, setEcg] = useState(90);
  const [emg, setEmg] = useState(90);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const monitorData = await getMonitorData();
      setSpo2(monitorData[monitorData.length - 1].bloodOxygenLevel);
      setEcg(monitorData[monitorData.length - 1].ecg);
      setEmg(monitorData[monitorData.length - 1].emg);
    };

    fetchData();
    const fetchDataInterval = setInterval(fetchData, 2500);

    return () => clearInterval(fetchDataInterval);
  }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const spo2Value = Math.floor(Math.random() * (100 - 80 + 1) + 80);
//       const ecgValue = Math.floor(Math.random() * (100 - 80 + 1) + 80);
//       const emgValue = Math.floor(Math.random() * (100 - 80 + 1) + 80);

//       setSpo2(spo2Value);
//       setEcg(ecgValue);
//       setEmg(emgValue);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <View
          style={{
            padding: Spacing.padding.xl,
            backgroundColor: Colors.primary,
            borderRadius: Spacing.borderRadius.base,
            flexDirection: "row",
          }}
          key={patient.patientId}
        >
          <Image
            source={require("../assets/images/default_pfp.jpeg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: Spacing.borderRadius.base,
              marginTop: 10,
            }}
          />
          <View
            style={{
              marginLeft: Spacing.margin.xl,
              justifyContent: "space-between",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <AppText
                style={{
                  fontFamily: Font["poppins-semiBold"],
                }}
              >
                {patient.name}
              </AppText>
              <AppText
                style={{
                  fontFamily: Font["poppins-regular"],
                  fontSize: FontSize.sm,
                  padding: 3,
                }}
              >
                ({patient.patientId})
              </AppText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AppText
                style={{
                  marginLeft: Spacing.margin.base,
                }}
              >
                {patient.age} | {patient.gender}
              </AppText>
            </View>
            <AppText
              style={{
                marginLeft: Spacing.margin.base,
              }}
            >
              Disease: {patient.disease}
            </AppText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="calendar-outline" size={16} color={Colors.text} />
              <AppText
                style={{
                  marginLeft: Spacing.margin.sm,
                }}
              >
                {patient.dateAdded}
              </AppText>
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
                style={{ fontSize: 12, color: spo2 < 90 ? "red" : Colors.accent }}
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
        // paused={false}
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
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
