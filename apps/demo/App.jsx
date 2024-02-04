import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import Patients from './screens/Patients';
import Monitor from './screens/Monitor';
import Auth from './screens/Auth';
import { registerRootComponent } from 'expo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Patients" component={Patients} />
        <Stack.Screen name="Monitor" component={Monitor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

registerRootComponent(App);

export default App;