import { TextInput, View } from "react-native";
import { useState } from "react";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Button from "./Button";

interface Props {
  hidden: boolean;
  handlePress: (
    name: string,
    age: string,
    gender: string,
    disease: string
  ) => {};
}

const PatientDialog: React.FC<Props> = ({ hidden, handlePress }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [disease, setDisease] = useState("");

  const handleAddPatient = (): void => {
    handlePress(name, age, gender, disease);
  };

  return (
    <View
      style={{
        backgroundColor: "#4a4a4a",
        padding: 10,
        borderRadius: 10,
        display: `${hidden ? "none" : "flex"}`,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.padding.sm,
          paddingHorizontal: Spacing.padding.base,
          borderRadius: Spacing.borderRadius.base,
          marginVertical: Spacing.margin.base,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Enter Patient's name"
          placeholderTextColor={Colors.text}
          style={{
            fontSize: FontSize.base,
            width: "75%",
            marginLeft: 5,
            color: Colors.accent,
          }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.padding.sm,
          paddingHorizontal: Spacing.padding.base,
          borderRadius: Spacing.borderRadius.base,
          marginVertical: Spacing.margin.base,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Enter Patient's age"
          placeholderTextColor={Colors.text}
          style={{
            fontSize: FontSize.base,
            width: "75%",
            marginLeft: 5,
            color: Colors.accent,
          }}
          value={age}
          onChangeText={(text) => setAge(text)}
        />
      </View>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.padding.sm,
          paddingHorizontal: Spacing.padding.base,
          borderRadius: Spacing.borderRadius.base,
          marginVertical: Spacing.margin.base,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Enter Patient's gender"
          placeholderTextColor={Colors.text}
          style={{
            fontSize: FontSize.base,
            width: "75%",
            marginLeft: 5,
            color: Colors.accent,
          }}
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
      </View>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.padding.sm,
          paddingHorizontal: Spacing.padding.base,
          borderRadius: Spacing.borderRadius.base,
          marginVertical: Spacing.margin.base,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Enter the disease name"
          placeholderTextColor={Colors.text}
          style={{
            fontSize: FontSize.base,
            width: "75%",
            marginLeft: 5,
            color: Colors.accent,
          }}
          value={disease}
          onChangeText={(text) => setDisease(text)}
        />
      </View>
      <Button
        style={{ width: "50%" }}
        onPress={handleAddPatient}
      >
        Add
      </Button>
    </View>
  );
};

export default PatientDialog;
