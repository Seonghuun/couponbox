import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { floor } from 'react-native-reanimated';

class CouponPannel extends Component{
  render () {
    const couponData = this.props.param;

    const stamp_bg_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fskin3%2Fpan3.png?alt=media&token=0b4a27f2-f4b9-4df1-9165-516d1d6bc6f6";
    const stamp_img_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fskin3%2Fstamp3.png?alt=media&token=e1f6d7e8-84d0-4673-ad48-f631364a9fd7";
    

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
        <Text>카페 이름 : {couponData.cafeName}</Text>
        <Text>쿠폰 갯수 : {couponData.stampNum}</Text>
        <ImageBackground
          source = {{uri: stamp_bg_uri }}
          style={{width: 330, height: 530}}
        >
          {[...Array(couponData.stampNum)].map((n, index) => (
            <Image
            source = {{uri: stamp_img_uri}}
            style={{position: 'absolute', width: '25%', height:'15%', top:20+Math.floor(index/2)*80, left:35+110*(index%2)}}
            />
            
          ))}
        
        </ImageBackground>
      </View>
    );
  }
}

export default CouponPannel;
