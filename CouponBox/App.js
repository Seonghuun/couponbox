/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react'; 
import { Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import TabUserScreen from './src/user_tab';
import TabHomeScreen from './src/home_tab';
import TabMapScreen from './src/map_tab';
import TabCouponScreen from './src/coupon_tab';
import LoginScreen from './src/login';
import SignupScreen from './src/signup';
import CafeDataScreen from './src/cafedata';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name = 'Home1' component = {TabHomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name = 'Home2' component = {CafeDataScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name = 'Map1' component = {TabMapScreen} options={{headerShown: false}}/>
      <Stack.Screen name = 'Map2' component = {CafeDataScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
  
}

// 탭 스크린
MainPage = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        
        // activeBackgroundColor: '#E6E6E6',
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        style: {
          backgroundColor: '#fff'
        }
      }}
      screenOptions={({route})=>({
        tabBarLabel: route.name,
        tabBarIcon: ({focused})=>(
          TabBarIcon(focused, route.name)
        )
      })}
    >
      <Tab.Screen name="Home" component={HomeStack}/>
      <Tab.Screen name="User" component={TabUserScreen}/>
      <Tab.Screen name="Map" component={MapStack}/>
      <Tab.Screen name="Coupon" component={TabCouponScreen}/>
      

    </Tab.Navigator>
  )
}

// 탭바 아이콘 정의
const TabBarIcon = (focused, name) => {
  let iconImagePath;

  if (name==='Home') {
      iconImagePath = focused? require('./assets/images/home.png') : require('./assets/images/home_unfocused.png')
  } else if (name==='User'){
      iconImagePath = focused? require('./assets/images/user.png') : require('./assets/images/user_unfocused.png')
  } else if (name==='Map'){
      iconImagePath = focused? require('./assets/images/map.png') : require('./assets/images/map_unfocused.png')
  } else if (name==='Coupon'){
    iconImagePath = focused? require('./assets/images/ticket.png') : require('./assets/images/ticket_unfocused.png')
}

  return (
      <Image
          style={{
              width: focused ? 24 : 20,
              height: focused ? 24 : 20,
          }}
          source = {iconImagePath}
      />
  )
}

class App extends Component {
  
  render () {
    return (
      
     
      <NavigationContainer>
        <Stack.Navigator >
          
          <Stack.Screen name = 'Login' component = {LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name = 'Signup' component = {SignupScreen} options={{headerShown: false}}/>
          <Stack.Screen name = 'Main' component = {MainPage} options={{headerShown: false}}/>
          
        </Stack.Navigator>
        
      </NavigationContainer>
      
      
    )
  }
}

export default App;
