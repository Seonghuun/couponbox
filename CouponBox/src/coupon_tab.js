import 'react-native-gesture-handler';
import React, { Component,useState, version } from 'react';
import { StyleSheet, View, Text, Button, Dimensions, ScrollView, StatusBar, Image, ImageBackground } from 'react-native';
import { event } from 'react-native-reanimated';
import CouponPannel from './couponPannel.js';
import CompleteCouponPan from './completeCouponPan';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";


// 내가 보유한 모든 쿠폰
class AllCouponListScreen extends Component{
  state = {
    sliderState: {currentPage: 0},    
    coupons : [],
    stamps : [],
    uid : '',
    cPage : 0,
    sPage : 0
  }
  // 내가 보유한 모든 쿠폰, 스탬프 불러오기
  getUserCoupon(){
    const {coupons, stamps} = this.state;
    auth().onAuthStateChanged(user => {
        if(user!=null){
            this.setState({uid:user.uid});
            firestore().collection('userlist').doc(user.uid).collection('stamp').get().
            then(querySnapshot=>{
            // console.log(querySnapshot.size); 
            coupons.splice(0, coupons.length); 
            stamps.splice(0, stamps.length);
            querySnapshot.forEach(documentSnapshot => {
                const tmp = new Object();  
                tmp.id = documentSnapshot.id;
                tmp.name = documentSnapshot.data().name;
                tmp.num = documentSnapshot.data().number;
                if(tmp.num >= 10){
                    const cNum = Math.floor(tmp.num/10);
                    const sNum = tmp.num%10;
                    for (var i =0; i< cNum; i++){
                        coupons.push({CafeName:tmp.name, CafeID: tmp.id, number: 10});
                    }
                    if(sNum>0){
                        stamps.push({CafeName:tmp.name, CafeID: tmp.id, number:sNum});
                    }                
                }
                else{
                    if (tmp.num>0){
                        stamps.push({CafeName:tmp.name, CafeID: tmp.id, number:tmp.num});
                    }                
                }                            
            })
            this.setState({cPage:coupons.length, sPage:stamps.length}) 
        })
        
        }
        // 로그아웃 했을때
        else{
            console.log('usertab check again');
        }
        })          
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      //alert("hello");
      this.getUserCoupon();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  constructor(props) {
    super(props);
    this.getUserCoupon();
  }


  render () {
    const sPage = this.state.stamps.length;
    const cPage = this.state.coupons.length;

    const gotoUsingCoupon = () => {
      this.props.navigation.navigate('UsableCoupon', {uid:this.state.uid})
    }

    // 쿠폰함 슬라이드 부분
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


    return (
      <>
      <ImageBackground
          source={{uri:"https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fskin3%2Fbackground3.png?alt=media&token=b1a84dd1-fadc-4248-afbc-0a3d24cd8f0d"}}
          style={{width:width, height:height, top:0, left:0, alignItems: 'center' }}
          >
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
        {
          [...Array(cPage)].map((n, index) => (
            <View style={{ width:width, height: height}} key={index}>
            <CompleteCouponPan
              param = {{cafeName: this.state.coupons[index].CafeName, stampNum: this.state.coupons[index].number}}
              goUsing = {gotoUsingCoupon}
            />
            </View>
          ))
        }
        {
          [...Array(sPage)].map((n, index) => (
            <View style={{ width:width, height:height}} key={index}>
            <CouponPannel 
              param = {{cafeName: this.state.stamps[index].CafeName, stampNum: this.state.stamps[index].number}}
              />
            </View>
          ))
        }
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(sPage+cPage).keys()).map((key, index) => (
          <View style={[styles.paginationDots, {opacity:pageIndex === index ? 1 : 0.2 }]} key={index} />
        ))}
      </View>
      </ImageBackground>
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
    backgroundColor: 'black',
    marginLeft: 10,
  },
});

export default AllCouponListScreen;