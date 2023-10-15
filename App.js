import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './screens/signup/Signup';
import VerifyOTP from './screens/verifyOTP/VerifyOTP';
import Welcome from './screens/welcome/Welcome';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false }} name="signup" component={Signup}/>
        <Stack.Screen options={{headerShown: false }} name="verifyOTP" component={VerifyOTP}/>
        <Stack.Screen options={{headerShown: false }} name="welcome" component={Welcome}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
