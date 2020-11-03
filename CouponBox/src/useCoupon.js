/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component,useState } from 'react';
import { StyleSheet, View, Text, Button, Dimensions, ScrollView, StatusBar, Image, ImageBackground } from 'react-native';
import { event } from 'react-native-reanimated';
import CouponPannel from './couponPannel.js';

class UseCouponScreen extends Component{
  state = {
    sliderState: {currentPage: 0}
  }
  render () {
    //스탬프 개수 보관하는 배열
    const stamps = [
      { CafeName: "default1", CafeID: "a1111", number : 4},
      { CafeName: "default2", CafeID: "a1222", number : 2},
      { CafeName: "default3", CafeID: "a1333", number : 3},
      { CafeName: "default4", CafeID: "a1444", number : 7},
      { CafeName: "default5", CafeID: "a1555", number : 10},
    ]

    //파이어베이스 db를 인자로 받아오는 부분
    const {params} = this.props.route;
    const db = params ? params.db : null;

    //db의 데이터 처리 부분
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

    // 스탬프함 슬라이드 부분
    const { width, height } = Dimensions.get('window');

    const setSliderPage = (event: any) => {
      const { currentPage } = this.state.sliderState;
      const { x } = event.nativeEvent.contentOffset;
      const indexOfNextScreen = Math.floor((x+1)/width);
      if(indexOfNextScreen !== currentPage){
        this.setState({
          sliderState: {
            ...this.state.sliderState,
            currentPage: indexOfNextScreen,
          }
        })
      }
    };

    const { currentPage: pageIndex } = this.state.sliderState;

    //스탬프에 사용할 이미지 로드
    const stamp_bg_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fbg_example.png?alt=media&token=9e0b055a-222f-41f8-bcde-2ad88b63ed97";
    const stamp_img_uri = "https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2F%EA%B7%B8%EB%A6%BC3.png?alt=media&token=19ad8f65-8f6a-432c-8e19-64214cafba3d";

    return (
      <>
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}
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
        <View style={{ width, height }}>
        <CouponPannel 
          param = {{cafeName: stamps[1].CafeName, stampNum: stamps[1].number}}
          />
        </View>
        <View style={{ width, height }}>
        <CouponPannel 
          param = {{cafeName: stamps[2].CafeName, stampNum: stamps[2].number}}
          />
        </View>
        <View style={{ width, height }}>
        <CouponPannel 
          param = {{cafeName: stamps[3].CafeName, stampNum: stamps[3].number}}
          />
        </View>
        <View style={{width, height }}>
          <Text>Use Coupon</Text>
        </View>
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(5).keys()).map((key, index) => (
          <View style={[styles.paginationDots, {opacity:pageIndex === index ? 1 : 0.2 }]} key={index} />
        ))}
      </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  paginationWrapper: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
});

export default UseCouponScreen;
