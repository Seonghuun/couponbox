/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 /**
  * 사용자가 쿠폰 발급받는 화면
  * 사용자의 아이디 등 고유한 문자열을 이용해 QR코드 띄워야 함
  * 카페 사장님은 이것을 스캔하면 서버를 통해 쿠폰 발급
  */

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';

class GetCouponScreen extends Component {
  render (){
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      }}>
          <Text>Get Coupon</Text>
      </View>
    )
  }
}

export default GetCouponScreen;
