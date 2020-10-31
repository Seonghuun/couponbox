/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/home';
import GetCouponScreen from './src/getCoupon';
import UseCouponScreen from './src/useCoupon';


const Stack = createStackNavigator();



class App extends Component{
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
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
