/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUyzSomwRy8atRgJHDuJT01Uh4GjqqsT0",
  authDomain: "couponbox-b7a3d.firebaseapp.com",
  databaseURL: "https://couponbox-b7a3d.firebaseio.com",
  projectId: "couponbox-b7a3d",
  storageBucket: "couponbox-b7a3d.appspot.com",
  messagingSenderId: "954319225728",
  appId: "1:954319225728:web:560a5266f599a30bd97765",
  measurementId: "G-83G7ZJYC1Z"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

class HomeScreen extends Component{
  render () {
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      }}>
        <Text>Home</Text>
        <Text/>
        <Button
            title="쿠폰 발급"
            onPress={()=>{
                this.props.navigation.navigate('GetCoupon')
            }}
        />
        <Text/>
        <Button
            title="쿠폰 사용"
            onPress={()=>{
                this.props.navigation.navigate('UseCoupon', {db})
            }}
        />
        <Text/>
        <Button
            title="  지도  "
            onPress={()=>{
                this.props.navigation.navigate('Map')
            }}
        />
      </View>
      
    )
  }
}


export default HomeScreen;
