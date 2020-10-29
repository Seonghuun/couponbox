/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';

class UseCouponScreen extends Component {
  render (){
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      }}>
          <Text>Use Coupon Screen</Text>
      </View>
    )
  }
}

export default UseCouponScreen;
