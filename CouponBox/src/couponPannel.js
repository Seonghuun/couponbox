import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { floor } from 'react-native-reanimated';

class CouponPannel extends Component{
  render () {
    const couponData = this.props.param;

    const stamp_bg_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fbackground1.png?alt=media&token=eb316fbf-8c7a-4407-b309-8a70a946152f";
    const stamp_img_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2F%EA%B7%B8%EB%A6%BC3.png?alt=media&token=19ad8f65-8f6a-432c-8e19-64214cafba3d";
    

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
        <Text>카페 이름 : {couponData.cafeName}</Text>
        <Text>쿠폰 갯수 : {couponData.stampNum}</Text>
        <ImageBackground
          source = {{uri: stamp_bg_uri }}
          style={{width: 270, height: 450}}
        >
          {[...Array(couponData.stampNum)].map((n, index) => (
            <Image
            source = {{uri: stamp_img_uri}}
            style={{position: 'absolute', width: 80, height:80, top:20+Math.floor(index/2)*80, left:35+110*(index%2)}}
            />
            
          ))}
        
        </ImageBackground>
      </View>
    );
  }
}

export default CouponPannel;
