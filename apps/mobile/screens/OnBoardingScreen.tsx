import {
  Dimensions,
  ImageBackground,
  Text,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Button from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "OnBoarding">;

const OnBoardingScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const { height } = Dimensions.get("window");

  return (
    <ImageBackground
      source={require("../assets/images/onboarding.png")}
      style={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <LinearGradient
        style={{
          height: height / 2.5,
          paddingHorizontal: Spacing.padding.lg,
        }}
        colors={[`rgba(0,0,0,0.1)`, "#000"]}
      >
        <Text
          style={{
            fontSize: FontSize.base,
            color: Colors.text,
            fontFamily: Font["poppins-regular"],
            textAlign: "center",
            marginTop: -30,
            marginBottom: Spacing.margin.xxl,
          }}
        >
          A Miniaturized Intensive Care Unit
        </Text>
        <View style={{ paddingTop: 10 }}>
          <Button style={{ margin: 10 }} onPress={() => navigate("Login")}>Login</Button>
          <Button style={{ margin: 10 }} onPress={() => navigate("Signup")}>Sign up</Button>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default OnBoardingScreen;