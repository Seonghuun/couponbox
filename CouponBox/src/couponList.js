import 'react-native-gesture-handler';
import React, { Component,useState, version } from 'react';
import { StyleSheet, View, Text, Button, Dimensions, ScrollView, StatusBar, Image, ImageBackground } from 'react-native';
import { event } from 'react-native-reanimated';
import CouponPannel from './couponPannel.js';
import CompleteCouponPan from './completeCouponPan';
import firestore from "@react-native-firebase/firestore";


// 내가 보유한 해당 카페의 쿠폰
class CouponListScreen extends Component{
  state = {
    sliderState: {currentPage: 0},    
    chk: false,
    coupons: [],
    stamps: [],
    updated : false,
  }

  getStamp(uid, cafeId) {
    const {coupons, stamps} = this.state;
    
    firestore().collection('userlist').doc(uid).collection('stamp').get().
    then(querySnapshot=>{
        console.log(querySnapshot.size); 
        const tmp = new Object();    
        querySnapshot.forEach(documentSnapshot => {
            if (documentSnapshot.id == cafeId){
                tmp.id = cafeId;
                tmp.name = documentSnapshot.data().name;
                tmp.num = documentSnapshot.data().number;                    
            }            
        })
        console.log('tmp',tmp);
        coupons.splice(0, coupons.length); 
        stamps.splice(0, stamps.length);
        if(tmp.num >= 10){
            const cNum = Math.floor(tmp.num/10);
            console.log(cNum);
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
        this.setState({updated:true});
        

    })
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getStamp(this.props.route.params.uid, this.props.route.params.cafeId)
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  constructor(props) {
    super(props);
    const {params} = this.props.route;
    const uid = params ? params.uid : null;
    const cafeId = params ? params.cafeId : null;
    console.log(uid, cafeId);
    this.getStamp(uid, cafeId);
  }


  render () {
    
    const {params} = this.props.route;
    const uid = params ? params.uid : null;
    //인자로 받아오는 부분
    const sPage = this.state.stamps.length;
    const cPage = this.state.coupons.length;
    console.log(this.state.stamps);


    // console.log(stamps);


    const gotoUsingCoupon = () => {
      this.props.navigation.navigate('UsableCoupon', {uid:uid})
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

        {(this.state.stamps.length>0)?
          [...Array(sPage)].map((n, index) => (
            <View style={{ width:width, height:height}} key={index}>
            <CouponPannel 
              param = {{cafeName: this.state.stamps[index].CafeName, stampNum: this.state.stamps[index].number}}
              />
            </View>
          ))
          :
          <View>
            <Image
            style={{top: 250,left:20,height:100, width:100, alignItems:'center'}} 
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/couponbox-b7a3d.appspot.com/o/sprites%2Fskin3%2FnoBeverage.png?alt=media&token=faf7ff9d-f8ed-4e09-a039-e24a26d8cc1e'}}
            resizeMode='contain'
                    
            />
            <Text
            style={{top:265, fontWeight:'bold'}}
            >
              등록된 쿠폰이 없습니다!
            </Text>
          </View>
          
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

export default CouponListScreen;