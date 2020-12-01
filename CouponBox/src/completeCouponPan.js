import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Button, TouchableOpacity } from 'react-native';
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
          
        
        {/* <Text>쿠폰 갯수 : {couponData.stampNum}</Text> */}
        
        <ImageBackground
          source = {{uri: stamp_bg_uri }}
          style={{width: 330, height: 530, top: 100, left:15}}
        >
          
            
          <Text
        style={{fontSize: 20, top:425, left:100, color:'#797D7F', alignContent:'center'}}>{couponData.cafeName}</Text>
        {/* <Text
        style={{fontSize: 20, top:225, left:100, color:'#797D7F', alignContent:'center'}}>heloo</Text> */}
        <TouchableOpacity
          style={{
            top: 220, left:110,
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