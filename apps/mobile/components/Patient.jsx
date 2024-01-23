import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"

const Patient = ({ patient, imgUri, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Monitor")} style={styles.mainCardView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.subCardView}>
                    <Image
                        source={{ uri: imgUri }}
                        resizeMode="contain"
                        style={{
                            borderRadius: 25,
                            height: 50,
                            width: 50,
                        }}
                    />
                </View>
                <View style={{ marginLeft: 12 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: "black",
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                        }}>
                    </Text>
                    <View
                        style={{
                            marginTop: 2,
                            borderWidth: 0,
                            width: '100%',
                        }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: 12,
                            }}>
                            {patient}
                        </Text>
                    </View>
                </View>

            </View>
            <View
                style={{
                    height: 25,
                    backgroundColor: "pink",
                    borderWidth: 0,
                    width: 25,
                    marginLeft: -26,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                }}>
                <Text style={{ color: "white" }}>
                    0
                </Text>
            </View>
        </TouchableOpacity>

    );
}


const styles = StyleSheet.create({
    mainCardView: {
        width: "80%",
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "grey",
        borderRadius: 15,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        // backgroundColor: Colors.history_back,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Patient;