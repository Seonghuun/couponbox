import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Button } from 'react-native';
import { floor } from 'react-native-reanimated';

class CompleteCouponPan extends Component{
  render () {
    const couponData = this.props.param;

    const stamp_bg_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fskin3%2Fpan3.png?alt=media&token=0b4a27f2-f4b9-4df1-9165-516d1d6bc6f6";

    const goUsing = this.props.goUsing;

    return (
      <>
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
          
        <Text>카페 이름 : {couponData.cafeName}</Text>
        <Text>쿠폰 갯수 : {couponData.stampNum}</Text>
        
        <ImageBackground
          source = {{uri: stamp_bg_uri }}
          style={{width: 300, height:450, top: 100,
            justifyContent: 'center', alignItems: 'center', backgroundColor:'white'}}
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
        </View>
      </>
      
    );
  }
}

export default CompleteCouponPan;