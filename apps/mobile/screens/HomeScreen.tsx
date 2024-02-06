import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Logs } from "expo"
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import AppText from "../components/AppText";
import Spacing from "../constants/Spacing";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
import SectionHeader from "../components/SectionHeader";
import Screen from "../components/Screen";
import { getUser } from "../services/user";
import { getPatients, createPatient } from "../services/patient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import PatientDialog from "../components/PatientDialog";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

Logs.enableExpoCliLogging();

const HomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  console.log("asdasdasdasdnkejwdnkandkjnei");
  const [user, setUser] = useState({
    email: "",
    name: "",
    age: 0,
    userId: "",
  });

  const [patients, setPatients] = useState<any>([]);
  const [hidden, setHidden] = useState(true);

  const fetchUser = async (): Promise<void> => {
    const userid = await AsyncStorage.getItem("userid");
    if (!userid) {
      console.log("userid not found");
      return;
    }
    const response = await getUser(userid);
    console.log(response);
    setUser(response);
  };

  const fetchPatients = async (): Promise<void> => {
    try {
      const response = await getPatients();
      console.log(response);
      setPatients(response.patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleAddPatient = async (
    name: string,
    age: string,
    gender: string,
    disease: string
  ): Promise<void> => {
    const userid = await AsyncStorage.getItem("userid");
    if (!userid) {
      console.log("userid not found");
      return;
    }
    const newPatient = await createPatient(name, age, gender, disease);
    setPatients([...patients, newPatient]);
  };

  useEffect(() => {
    console.log("hello from home")
    const fetchData = async () => {
      await fetchUser();
      await fetchPatients();
    };

    fetchData();
  }, []);

  return (
    <Screen>
      <ScrollView
        style={{
          paddingHorizontal: Spacing.padding.base,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Image
              source={require("../assets/images/default_pfp.jpeg")}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
            />
            <View
              style={{
                marginLeft: Spacing.margin.base,
              }}
            >
              <AppText>Hello, Welcome</AppText>
              <AppText
                style={{
                  fontFamily: Font["poppins-semiBold"],
                  textTransform: "capitalize",
                }}
              >
                {user.name}
              </AppText>
            </View>
          </View>
          <IconButton name="notifications" />
        </View>

        <View
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: Spacing.padding.sm,
            paddingHorizontal: Spacing.padding.base,
            borderRadius: Spacing.borderRadius.base,
            marginVertical: Spacing.margin.xl,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons name="search-outline" size={24} color={Colors.text} />
          <TextInput
            placeholder="Search Patients"
            placeholderTextColor={Colors.text}
            style={{
              fontSize: FontSize.base,
              width: "75%",
              marginLeft: 5,
            }}
          />
          <IconButton
            name="options-outline"
            style={{
              backgroundColor: Colors.accent,
            }}
            color={Colors.black}
          />
        </View>
        <Button style={{ margin: 10 }} onPress={() => { setHidden(!hidden)
        console.log("press")}} >
          Add Patient
        </Button>
        <PatientDialog hidden={hidden} handlePress={handleAddPatient} />
        <SectionHeader title="Your Patients" />
        {patients.map((patient: any) => (
          <TouchableOpacity
            style={{
              padding: Spacing.padding.sm,
              marginBottom: Spacing.margin.base,
              backgroundColor: Colors.primary,
              borderRadius: Spacing.borderRadius.base,
              flexDirection: "row",
            }}
            key={patient.patientId}
            onPress={() => navigate("ICUMonitor", { patient: patient })}
          >
            <Image
              source={require("../assets/images/default_pfp.jpeg")}
              style={{
                width: 50,
                height: 50,
                borderRadius: Spacing.borderRadius.base,
                marginTop: 10,
              }}
            />
            <View
              style={{
                marginLeft: Spacing.margin.base,
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
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={Colors.text}
                />
                <AppText
                  style={{
                    marginLeft: Spacing.margin.sm,
                  }}
                >
                  {patient.dateAdded}
                </AppText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;
