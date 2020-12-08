import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';


class CafeDetailScreen extends Component {

    state = {
        avatar: ''

    }
    addImage(id) {
        ImagePicker.launchImageLibrary({}, response=>{ // showImagePicker : 사진 찍거나, 사진첩에서 불러옴
            try{
                console.log(response.path)
                console.log(response.path.split('.')[1])
                this.setState({
                    avatar: response.uri
                })
                this.uploadImage(id, response.path)
            } catch(error){
                
            }
            
            // this.uploadImage(id, response.uri);
        })
    }

    uploadImage(id, path) {
        let imageRef = storage().ref('cafeImages/'+id);
        imageRef.listAll().then((result)=>{
            const num = result._items.length;
            const reference = storage().ref('cafeImages/'+id+'/'+num);
            reference.putFile(path).then((snapshot)=>{
                console.log('upload success')
            })
        })
        
    }

    render() {
        const {params} = this.props.route;
        const cafeId = params ? params.cafeId : null;
        const data = params ? params.data : null;
        const url = params ? params.image : null;
        // console.log(url);
        return (
            <View style={styles.mainView}>
                <Image
                    source={{uri:this.state.avatar? this.state.avatar : url}}
                    style={styles.avatar}/>
                <Text style={{fontSize:20, marginBottom:20}}>
                    {data.name}
                </Text>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={()=>{
                        this.addImage(cafeId);
                        // this.uploadImage(cafeId);
                    }}
                >
                    <Text style={styles.loginText}>이미지 업로드</Text>
                </TouchableOpacity>  
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={()=>{
                        this.props.navigation.navigate('CouponScan', {cafeId: cafeId, cafeName: data.name});
                     
                    }}
                >
                    <Text style={styles.loginText}>QR 스캐너</Text>
                </TouchableOpacity>  
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={()=>{
                        this.props.navigation.navigate('Edit');
                        
                    }}
                >
                    <Text style={styles.loginText}>카페 정보 수정</Text>
                </TouchableOpacity>  
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={()=>{
                        
                    }}
                >
                    <Text style={styles.loginText}>발급 이력 확인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={()=>{
                        this.props.navigation.goBack();
                    }}
                >
                    <Text style={styles.loginText}>메인 메뉴</Text>
                </TouchableOpacity>  
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
    avatar: {
        width: 100,
        height: 100
    },
    input: {
      width: '100%',
      height: 45,
      backgroundColor: '#f2f2f2',
      
      fontSize: 15,
      padding: 10
    },
    image: {
      width: '85%',
      height: 300
    },
    
    loginBtn:{
      width:"80%",
      backgroundColor:"#f2f2f2",
      borderRadius:25,
      height:40,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      marginBottom:10,
      elevation: 5,
    }
      
  })

export default CafeDetailScreen;