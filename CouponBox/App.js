import 'react-native-gesture-handler';
import React, {Component} from 'react'; 
import { Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import TabUserScreen from './src/user_tab';
import TabHomeScreen from './src/home_tab';
import TabMapScreen from './src/map_tab';
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

MyPage = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeBackgroundColor: '#E6E6E6',
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
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
      <Tab.Screen name="Map" component={TabMapScreen}/>
      

    </Tab.Navigator>
  )
}

const TabBarIcon = (focused, name) => {
  let iconImagePath;

  if (name==='Home') {
      iconImagePath = require('./assets/images/home.png')
  } else if (name==='User'){
      iconImagePath = require('./assets/images/user.png')
  } else if (name==='Map'){
      iconImagePath = require('./assets/images/map.png')
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
          <Stack.Screen name = 'Main' component = {MyPage} options={{headerShown: false}}/>
          
        </Stack.Navigator>
        
      </NavigationContainer>
      
      
    )
  }
}

export default App;
