import { TextInput, View } from "react-native";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Button from "./Button";

const PatientDialog = ({ hidden }: { hidden: boolean }) => {
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
          placeholder="Search Patients"
          placeholderTextColor={Colors.text}
          style={{
            fontSize: FontSize.base,
            width: "75%",
            marginLeft: 5,
            color: Colors.accent,
          }}
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
          placeholder="Search Patients"
          placeholderTextColor={Colors.text}
          style={{
            fontSize: FontSize.base,
            width: "75%",
            marginLeft: 5,
            color: Colors.accent,
          }}
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
          placeholder="Search Patients"
          placeholderTextColor={Colors.text}
          style={{
            fontSize: FontSize.base,
            width: "75%",
            marginLeft: 5,
            color: Colors.accent,
          }}
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
          placeholder="Search Patients"
          placeholderTextColor={Colors.text}
          style={{
            fontSize: FontSize.base,
            width: "75%",
            marginLeft: 5,
            color: Colors.accent,
          }}
        />
      </View>
      <Button style={{ width: "50%" }} onPress={() => {}}>
        Add
      </Button>
    </View>
  );
};

export default PatientDialog;
