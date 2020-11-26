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

class UsingCouponScreen extends Component{

  render () {
    const userUID = "User1";

    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Text>Use Coupon</Text>
        <QRCode
          value={userUID+',useCoupon'}
          />
      </View>
    );
  }
}

export default UsingCouponScreen;
