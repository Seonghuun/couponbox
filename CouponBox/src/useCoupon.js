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
import CompleteCouponPan from './completeCouponPan'



class UseCouponScreen extends Component{
  state = {
    sliderState: {currentPage: 0},
    
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      //alert("hello");
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render () {
    const coupons = [
      { CafeName: "default1", CafeID: "a1111", number : 10},
      { CafeName: "default1", CafeID: "a1111", number : 10},
    ]
    //스탬프 개수 보관하는 배열
    const stamps = [
      { CafeName: "default1", CafeID: "a1111", number : 4},
      { CafeName: "default2", CafeID: "a1222", number : 2},
      { CafeName: "default3", CafeID: "a1333", number : 3},
      { CafeName: "default4", CafeID: "a1444", number : 7},
      { CafeName: "default5", CafeID: "a1555", number : 8},
    ]
    
    //파이어베이스 db를 인자로 받아오는 부분
    const {params} = this.props.route;
    const db = params ? params.db : null;
    
    //유저 데이터
    const UserUID = 'User1'

    const gotoUsingCoupon = () => {
      this.props.navigation.navigate('UsingCoupon')
    }

    //db의 데이터 처리 부분
    const getStamps = () => {
      db.collection('test')
      .doc('User')
      .collection('UserList')
      .doc('User1')
      .collection('Stamps')
      .get()
      .then(snapshot => {
        if(snapshot.empty) {
          console.log('No matchin Documents');
          return;
        }
        this.setState(
          snapshot.forEach(doc => {
            this.state.stamps3.push(doc.data());
          })
        )
        pages = this.state.stamps3.length;
        console.log(this.state.stamps3);
      })
    }

    // 쿠폰함 슬라이드 부분
    const { width, height } = Dimensions.get('window');
    var pages = 5;
    var pages2 = 2;
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
        {[...Array(pages2)].map((n, index) => (
          <View style={{ width, height }}>
          <CompleteCouponPan
            param = {{cafeName: coupons[index].CafeName, stampNum: coupons[index].number}}
            goUsing = {gotoUsingCoupon}
          />
          </View>
        ))}
        {[...Array(pages)].map((n, index) => (
          <View style={{ width, height }}>
          <CouponPannel 
            param = {{cafeName: stamps[index].CafeName, stampNum: stamps[index].number}}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(pages+pages2).keys()).map((key, index) => (
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
