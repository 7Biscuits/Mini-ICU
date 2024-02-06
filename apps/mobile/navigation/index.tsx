import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import LoginScreen from "../screens/Login";
import SingupScreen from "../screens/Signup";
import HomeScreen from "../screens/HomeScreen";
import ICUMonitor from "../screens/ICUMonitor";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SingupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ICUMonitor" component={ICUMonitor} />
    </Stack.Navigator>
  );
}