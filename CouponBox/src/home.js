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


class HomeScreen extends Component{
  render () {
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      }}>
        <Text>Home</Text>
        <Button
            title="쿠폰 발급"
            onPress={()=>{
                this.props.navigation.navigate('GetCoupon')
            }}
        />
      </View>
    )
  }
}


export default HomeScreen;
