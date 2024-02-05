import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { categories, user, workoutPlans, workouts } from "../data";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import AppText from "../components/AppText";
import Spacing from "../constants/Spacing";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
import CategoryList from "../components/CategoryList";
import SectionHeader from "../components/SectionHeader";
import Workout from "../components/Workout";
import Rating from "react-native-easy-rating";
import Screen from "../components/Screen";
import { getUser } from "../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import PatientDialog from "../components/PatientDialog";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [userS, setUser] = useState({
    email: "",
    name: "",
    age: 0,
    userId: "",
  });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userid = await AsyncStorage.getItem("userid");
      if (!userid) {
        console.log("userid not found");
        return;
      }
      const response = await getUser(userid);
      setUser(response.user);
      console.log("done done doen");
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
                {userS.name}
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
        <Button style={{ margin: 10 }} onPress={() => setHidden(!hidden)}>
          Add Patient
        </Button>
        <PatientDialog hidden={hidden} />
        <SectionHeader title="Featured Workouts" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          pagingEnabled
          snapToInterval={270 + Spacing.margin.lg}
        >
          {workouts.map((workout) => (
            <Workout
              onPress={() => navigate("PlanOverview", { workout: workout })}
              workout={workout}
              key={workout.id}
            />
          ))}
        </ScrollView>
        <SectionHeader title="Trending Plans" />
        {workoutPlans.map((plan) => (
          <TouchableOpacity
            style={{
              padding: Spacing.padding.sm,
              marginBottom: Spacing.margin.base,
              backgroundColor: Colors.primary,
              borderRadius: Spacing.borderRadius.base,
              flexDirection: "row",
            }}
            key={plan.id}
          >
            <Image
              source={plan.image}
              style={{
                width: 100,
                height: 100,
                borderRadius: Spacing.borderRadius.base,
              }}
            />
            <View
              style={{
                marginLeft: Spacing.margin.base,
                justifyContent: "space-between",
              }}
            >
              <AppText
                style={{
                  fontFamily: Font["poppins-semiBold"],
                }}
              >
                {plan.name}
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
                    marginLeft: Spacing.margin.base,
                  }}
                >
                  {plan.duration} | {plan.location}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Rating
                  rating={plan.rating}
                  max={5}
                  iconWidth={20}
                  iconHeight={20}
                />
                <AppText
                  style={{
                    marginLeft: Spacing.margin.sm,
                  }}
                >
                  {plan.rating}
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
