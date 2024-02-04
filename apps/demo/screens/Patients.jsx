import Patient from "../components/Patient";
import { View, StyleSheet } from "react-native";

export default function Patients({ navigation }) {
    return (
        <View style={styles.container}>
            <Patient patient={"Patient 1"} imgUri={"https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTcwMTI5MTM0MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"}  navigation={navigation} />
            <Patient patient={"Patient 2"} imgUri={"https://images.unsplash.com/photo-1525186402429-b4ff38bedec6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTcwMTI4ODcyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"} navigation={navigation} />
            <Patient patient={"Patient 3"} imgUri={"https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTcwMTI5MTM4Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"} navigation={navigation} />
            <Patient patient={"Patient 4"} imgUri={"https://images.unsplash.com/photo-1542206395-9feb3edaa68d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTcwMTI5MTQxNQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"} navigation={navigation} />
            <Patient patient={"Patient 5"} imgUri={"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVyc29ufHx8fHx8MTcwMTI5MTQ0OA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=200"}  navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        // justifyContent: 'center',
    }
});