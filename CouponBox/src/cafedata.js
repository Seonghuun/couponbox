import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import logo from '../assets/images/logo.png';

class CafeDataScreen extends Component {

    getStamp(uid, cafeId) {
        firestore().collection('userlist').doc(uid).collection('stamp').get().
        then(querySnapshot=>{
            console.log(querySnapshot.size); 
            const tmp = new Object();    
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.data().cafeId == cafeId){
                    tmp.id = cafeId;
                    tmp.name = documentSnapshot.data().cafeName;
                    tmp.num = documentSnapshot.data().number;                    
                }            
            })
            console.log(tmp);
            const coupons = [];
            const stamps = [];

            if(tmp.num >= 10){
                const cNum = Math.floor(tmp.num/10);
                console.log(cNum);
                const sNum = tmp.num%10;
                for (var i =0; i< cNum; i++){
                    coupons.push({CafeName:tmp.name, CafeID: tmp.id, number: 10});
                }
                stamps.push({CafeName:tmp.name, CafeID: tmp.id, number:sNum});
            }
            else{
                stamps.push({CafeName:tmp.name, CafeID: tmp.id, number:tmp.num});
            }

            
            this.props.navigation.navigate('CouponList', {uid:uid, data: tmp, coupons: coupons, stamps:stamps});
            

        })
      }
        
    render () {
        const {params} = this.props.route;
        const cafeId = params ? params.cafeId : null;
        const data = params ? params.data : null;
        const uid = params ? params.uid : null;
        const imageUrl = params ? params.image : null;
        console.log(cafeId);
        
        
        return (

            <View style={styles.mainView}>
                <Image
                    style={{height:300, width:350, alignItems:'center'}} 
                    source={{uri: imageUrl}}
                    resizeMode='contain'
                    
                />
                <Text style={styles.titleText}>
                    {data.name}
                </Text>
                <Text style={styles.baseText}>
                    {data.address}
                </Text>
                <Text style={styles.baseText}>
                    전화번호: {data.tel}
                </Text>
                <Text style={styles.baseText}>
                    Open: 08:00
                </Text>
                <Text style={styles.baseText}>
                    Close: 24:00
                </Text>
                <View style={styles.btnView}>
                <TouchableOpacity style = {styles.caffeBtn}
                onPress={()=>{
                    this.props.navigation.navigate('GetCoupon', {uid:uid});
                }}
                >
                    <Text>도장 받기</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.caffeBtn}
                onPress={()=>{
                    this.getStamp(uid, cafeId);
                }}
                >
                    <Text>쿠폰 사용</Text>
                </TouchableOpacity>
                </View>
                
            </View>
            
            
            
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
      flex: 1, // 차지하는 영역의 비율
      backgroundColor: 'white',
      height: '100%',
      paddingTop: 50,
      alignItems: 'center', //수평 정렬
      // justifyContent: 'center' // 수직 정렬
    },
    btnView: {
        flex:1,
        flexDirection: 'row'
    },
    titleText: {
        fontFamily: "Cochin",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10

    },
    baseText: {
        fontFamily: "Cochin",
        marginBottom: 5

    },
    inputView:{
      width:"65%",
      backgroundColor:"#f2f2f2",
      borderRadius:25,
      height: 45,
      marginTop: 10,
      marginBottom:10,
      justifyContent:"center",
      padding:20
    },
    
    caffeBtn:{
        width:"30%",
        backgroundColor:"#E6E6E6",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:20,
        marginTop:30,
        marginBottom:10
      }
      
  })
  
export default CafeDataScreen;

   
    