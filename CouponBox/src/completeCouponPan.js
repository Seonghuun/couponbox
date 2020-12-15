import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { floor } from 'react-native-reanimated';

class CompleteCouponPan extends Component{
  render () {
    const couponData = this.props.param;

    const stamp_bg_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fskin3%2Fpan3.png?alt=media&token=0b4a27f2-f4b9-4df1-9165-516d1d6bc6f6";
    const stamp_img_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fskin3%2Fstamp3_2.png?alt=media&token=d8e6289a-43df-40fc-85a3-0ad2f9ffdb2b";

    const goUsing = this.props.goUsing;

    return (
      <>
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
        
        <ImageBackground
          source = {{uri: stamp_bg_uri }}
          style={{width: 330, height: 530, top: 75, left:15}}
        >
          
          
            
          <Text
        style={{fontSize: 20, top:425, left:-10, color:'#797D7F', alignSelf:'center'}}>{couponData.cafeName}</Text>
        {[...Array(10)].map((n, index) => (
            <Image
            source = {{uri: stamp_img_uri}}
            style={{position: 'absolute', width: '25%', height:'12%', resizeMode:'contain', top:92+Math.floor(index/2)*62, left:67+92*(index%2)}}
            />
            
          ))}
        <TouchableOpacity
          style={{
            top: 200, left:110,
              width:"25%",
              backgroundColor:"#CACFD2",
              borderRadius:25,
              height:50,
              alignItems:"center",
              justifyContent:"center",
              elevation:8,
             
          
          }}
          onPress={
            ()=>goUsing()
          }
        >
          <Text
          style={{color:'white'}}
          >쿠폰 사용</Text>
        </TouchableOpacity>
        
        </ImageBackground>
        </View>
      </>
      
    );
  }
}

export default CompleteCouponPan;