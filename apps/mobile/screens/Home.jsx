import { useEffect } from 'react';
import { View, Image, StyleSheet, BackHandler, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // Do nothing on back press to prevent going back to the previous screen
            return true;
        });
        return () => backHandler.remove();
    }, []);

    const handleQuitPress = () => {
        BackHandler.exitApp();
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#333',
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={{ uri: "https://sunbeamschoolmau.edu.in/images/school-logo.png" }}
                    style={styles.logo}
                />
                <Text style={{ marginTop: 40, marginLeft: 10, fontSize: 11, color: "white" }}>Made by Sunbeam English School Bhagwanpur</Text>
            </View>

            <View style={styles.container}>
                <Image
                    source={require('../j.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={styles.title}>Mini ICU</Text>
                <Text style={styles.subTitle}>An Economical Minituarized ICU System</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Patients')}>
                    <Text style={[styles.buttonText, { backgroundColor: "green" }]}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleQuitPress}>
                    <Text style={[styles.buttonText, { backgroundColor: "red" }]}>Quit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333', // Dark grey background
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 70,
        height: 65,
        marginLeft: 10,
        marginTop: 10,
    },
    image: {
        width: '90%',
        height: 200,
        marginBottom: 20,
        borderRadius: 5
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 15,
        color: "grey",
        marginBottom: 20
    },
    button: {
        width: '30%',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff', // white text
        fontSize: 16,
        textAlign: 'center',
        borderRadius: 5,
        padding: 10
    },
});

export default HomeScreen;