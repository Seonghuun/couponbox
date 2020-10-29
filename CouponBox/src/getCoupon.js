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
import { WebView } from 'react-native-webview';
import QRCode from 'react-native-qrcode-svg';

class GetCouponScreen extends Component{

  render () {
    return (
      <View>
        <Text>Get Coupon</Text>
        <QRCode
          value="aa"
          />
      </View>
    );
  }
}

export default GetCouponScreen;
