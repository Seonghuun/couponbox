/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

class GetCouponScreen extends Component{

  render () {
    const userUID = "User1";

    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Text>Get Coupon</Text>
        <QRCode
          value={userUID}
          />
      </View>
    );
  }
}

export default GetCouponScreen;
