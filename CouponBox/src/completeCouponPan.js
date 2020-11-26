/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Button } from 'react-native';
import { floor } from 'react-native-reanimated';

class CompleteCouponPan extends Component{
  render () {
    const couponData = this.props.param;

    const stamp_bg_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fbackground1.png?alt=media&token=eb316fbf-8c7a-4407-b309-8a70a946152f";

    const goUsing = this.props.goUsing;

    return (
      <>
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
          
        <Text>카페 이름 : {couponData.cafeName}</Text>
        <Text>쿠폰 갯수 : {couponData.stampNum}</Text>
        </View>
        <ImageBackground
          source = {{uri: stamp_bg_uri }}
          style={{width: 270, height:450, 
            position: 'absolute',
            top: 50, left: 70,
            justifyContent: 'center', alignItems: 'center',}}
        >
          <View>
            <Button
          style={{
            top: 160,
            width: 60,
            position: 'absolute',
            backgroundColor: 'transparent', 
          }}
            title='쿠폰 사용'
            onPress={
              ()=>goUsing()
            }
          />
          </View>
        </ImageBackground>
      </>
      
    );
  }
}

export default CompleteCouponPan;

