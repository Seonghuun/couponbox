import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { AppRegistry, View, Text, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

class UsableCouponScreen extends Component{

  render () {
    const {params} = this.props.route;
    const userUID = params ? params.uid : null;

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

export default UsableCouponScreen;