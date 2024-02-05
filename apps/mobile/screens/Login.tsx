import { Dimensions, Text, TextInput, View, Alert } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Button from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { login } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const { height } = Dimensions.get("window");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = async (): Promise<void> => {
    console.log(email, password);
    const response = await login(email, password);
    console.log(response);
    if (response.status === 200) {
      await AsyncStorage.setItem("userid", response.user.userId);
      Alert.alert(response.message, "Now you can login to your account", [
        { text: "OK", onPress: () => navigate("Home") },
      ]);
    } else {
      Alert.alert(response.message, response.error, [{ text: "OK" }]);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.black,
        justifyContent: "center",
        alignItems: "center",
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
            fontSize: FontSize.xxl,
            color: Colors.text,
            fontFamily: Font["poppins-regular"],
            textAlign: "center",
          }}
        >
          Login
        </Text>
        <Text
          style={{
            fontSize: FontSize.sm,
            color: Colors.accent,
            fontFamily: Font["poppins-regular"],
            textAlign: "center",
            marginBottom: Spacing.margin.xxl,
          }}
        >
          Please signin to continue
        </Text>
        <View style={{ width: 250 }}>
          <TextInput
            placeholder="Enter username or email"
            placeholderTextColor={Colors.text}
            style={{
              fontSize: FontSize.base,
              backgroundColor: "#232b2b",
              height: 50,
              borderColor: Colors.accent,
              borderWidth: 1,
              marginBottom: 10,
              padding: 15,
              borderRadius: 5,
              color: Colors.accent,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            multiline={false}
            numberOfLines={1}
            scrollEnabled={true}
          />
          <TextInput
            placeholder="Enter password"
            placeholderTextColor={Colors.text}
            style={{
              fontSize: FontSize.base,
              backgroundColor: "#232b2b",
              height: 50,
              borderColor: Colors.accent,
              borderWidth: 1,
              marginBottom: 10,
              padding: 15,
              borderRadius: 5,
              color: Colors.accent,
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            multiline={false}
            numberOfLines={1}
            scrollEnabled={true}
          />
        </View>
        <View style={{ paddingTop: 10 }}>
          <Button style={{ margin: 10 }} onPress={handlePress}>
            Submit
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;