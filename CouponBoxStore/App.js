/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import 'react-native-gesture-handler';
import React, {Component} from 'react'; 
import { Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/login';
import SignupScreen from './src/signup';
import Main from './src/main';
import RegisterCafeSceen from './src/registerCafe';

const Stack = createStackNavigator();

class App extends Component {
  
  render () {
    return (
      
     
      <NavigationContainer>
        <Stack.Navigator >
          
          <Stack.Screen name = 'Login' component = {LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name = 'Signup' component = {SignupScreen} options={{headerShown: false}}/>
          <Stack.Screen name = 'Main' component = {Main} options={{headerShown: false}}/>
          <Stack.Screen name = 'Register' component = {RegisterCafeSceen} options={{headerShown: false}}/>
          
        </Stack.Navigator>
        
      </NavigationContainer>
      
      
    )
  }
}

export default App;
