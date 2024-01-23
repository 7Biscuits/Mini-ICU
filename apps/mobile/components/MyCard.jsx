import { StyleSheet, View, Image, Text } from "react-native";

export default function MyCard() {
    return (
        <View style={styles.container}>
            <View style={styles.card_template}>
                <Image
                    style={styles.card_image}
                    source={require("../i.png")}
                />
                <View style={styles.text_container}>
                    <Text style={styles.card_title}>Mini-Vent</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: "center",
    },
    card_template: {
        width: 350,
        height: 250,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)"
    },
    card_image: {
        width: 350,
        height: 250,
        borderRadius: 10
    },
    text_container: {
        position: "absolute",
        width: 350,
        height: 30,
        bottom: 0,
        padding: 5,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    card_title: {
        color: "white",

    }
});