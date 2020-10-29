/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/home';
import UserScreen from './src/user';
import GetCouponScreen from './src/get_coupon';
import UseCouponScreen from './src/use_coupon';

const Stack = createStackNavigator();

class App extends Component {
  render (){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="User" component={UserScreen}/>
          <Stack.Screen name="GetCoupon" component={GetCouponScreen}/>
          <Stack.Screen name="UseCoupon" component={UseCouponScreen}/>
        </Stack.Navigator>
      </NavigationContainer> 
    )
  }
}

const styles = StyleSheet.create({
});

export default App;
