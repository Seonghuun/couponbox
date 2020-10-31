/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component,useState } from 'react';
import { View, Text, Button, Dimensions, ScrollView, StatusBar, Image, ImageBackground } from 'react-native';


class UseCouponScreen extends Component{
  render () {
    const stamps = [
      { 'CafeName': "default1", 'number' : 4},
      { 'CafeName': "default2", 'number' : 6},
      { 'CafeName': "default3", 'number' : 3},
      { 'CafeName': "default4", 'number' : 8},
      { 'CafeName': "default5", 'number' : 9},
  ]
    const {params} = this.props.route;
    const db = params ? params.db : null;
    const handleClick = () => {
      db.collection('test')
      .doc('User')
      .collection('UserList')
      .doc('User1')
      .collection('Stamps')
      .doc('Cafe2')
      .get()
      .then(doc => {
        if(!doc.data()) {
          alert('No data');
        }
        else{
          alert('카페이름:'+doc.data().CafeName+'\n스탬프 개수:'+doc.data().StampNumber);
        }
      });
    };

    const { width, height } = Dimensions.get('window');

    const stamp_bg_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fbg_example.png?alt=media&token=9e0b055a-222f-41f8-bcde-2ad88b63ed97";
    const stamp_img_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2F%EA%B7%B8%EB%A6%BC3.png?alt=media&token=19ad8f65-8f6a-432c-8e19-64214cafba3d";
    return (
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
      >
        <View style={{ width, height, alignItems:'center'}}>
          <Text>카페 이름 : {stamps[0].CafeName}</Text>
          <Text>쿠폰 갯수 : {stamps[0].number}</Text>
          <Text/>
          <ImageBackground
            source = {{uri: stamp_bg_uri }}
            style={{width: 300, height:400}}
          >
          <Text/>
          <Image
            source = {{uri: stamp_img_uri}}
            style={{width: 80, height:80, top:10, left:40}}
          />
          <Image
            source = {{uri: stamp_img_uri}}
            style={{width: 80, height:80, top:-70, left:170}}
          />
          <Image
            source = {{uri: stamp_img_uri}}
            style={{width: 80, height:80, top:-60, left:40}}
          />
          <Image
            source = {{uri: stamp_img_uri}}
            style={{width: 80, height:80, top:-140, left:170}}
          />
          </ImageBackground>
          <Button
            title="값 받기"
            onPress={()=>{handleClick()}}
          />
        </View>
        <View style={{ width, height, alignItems:'center' }}>
          <Text>카페 이름 : {stamps[1].CafeName}</Text>
          <Text>쿠폰 갯수 : {stamps[1].number}</Text>
          <Text/>
          <Image
            source = {{uri: stamp_bg_uri }}
            style={{width: 300, height:400}}
            />
        </View>
        <View style={{ width, height }}>
          <Text>Screen 3</Text>
        </View>
        <View style={{ width, height }}>
          <Text>Screen 4</Text>
        </View>
        <View style={{width, height }}>
          <Text>Use Coupon</Text>
        </View>
      </ScrollView>
      
    )
  }
}


export default UseCouponScreen;
