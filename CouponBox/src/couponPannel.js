/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

class CouponPannel extends Component{
  render () {
    const couponData = this.props.param;

    const stamp_bg_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fbg_example.png?alt=media&token=9e0b055a-222f-41f8-bcde-2ad88b63ed97";
    const stamp_img_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2F%EA%B7%B8%EB%A6%BC3.png?alt=media&token=19ad8f65-8f6a-432c-8e19-64214cafba3d";

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
        <Text>카페 이름 : {couponData.cafeName}</Text>
        <Text>쿠폰 갯수 : {couponData.stampNum}</Text>
        <Text/>
        <ImageBackground
          source = {{uri: stamp_bg_uri }}
          style={{width: 300, height:400}}
        >
          {[...Array(couponData.stampNum)].map((n, index) => (
            <Image
            source = {{uri: stamp_img_uri}}
            style={{width: 80, height:80, top:30, left:40}}
            />
          ))}
        
        </ImageBackground>

      </View>
    );
  }
}

export default CouponPannel;


