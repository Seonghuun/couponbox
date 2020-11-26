import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import noimage from '../assets/images/noimage.png';
import Geocoder from 'react-native-geocoding';


Geocoder.init("AIzaSyAlKslfpnRohoHZfp2Og86p9ZgIe_6IK7E", {language : "ko"});

class RegisterCafeSceen extends Component {

    state = {
        caffe_name : '',
        tel :'',
        address : '',
        manager : '',
        updated : '',
        latitude : '',
        longitude: '',
    }

    //주소를 위도,경도로 변환해주는 함수
    toGeocode (addr){
        const {latitude, longitude} = this.state;
        Geocoder.from(addr)
          .then(json => {
              var location = json.results[0].geometry.location;
              console.log("toGeocode test : ",location);
              this.setState({latitude: location.lat, longitude:location.lng});
              console.log('after geocode',this.state);
          })
          .catch(error => console.warn(error));
      }

    addCafe(id) {
        this.toGeocode (this.state.address);
        this.state.latitude==='' ?
        alert('잘못된 주소 입니다') :
        firestore().collection('cafelist').get().
            then(querySnapshot=>{
                var size = querySnapshot.size+1;
                console.log('Total cafes: ', querySnapshot.size);
                console.log(size);
                this.uploadImage(size.toString());
                firestore().
                    collection('cafelist').doc('cafe' + size.toString()).
                    set({
                        name : this.state.caffe_name,
                        manager : this.state.manager,
                        address : this.state.address,
                        tel : this.state.tel,
                        registerDate : new Date(),
                        owner: id,
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        
                    })
                    .then(() => {
                        console.log('Cafe added');
                    });
            });
        
    }
    uploadImage(id) {
        const reference = storage().ref('cafeImages/cafe'+id+'/create');
        reference.putString('create').then((snapshot)=>{
            console.log('cafeImages/cafe'+id+'/noimage')
        })

    }


    render() {
        const {params} = this.props.route;
        const uid = params ? params.uid : null;

        // console.log(uid);
        return (
            <View style={styles.mainView}>
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.caffe_name}
                        style={styles.input}
                        placeholder="카페 이름" 
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({caffe_name:text})}
                         // 개행
                        maxLength={100}
                        autoCapitalize={'none'} //대문자 자동수정 안함
                        editable={true}
                    />
                </View>
                
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.manager}
                        style={styles.input}
                        placeholder="매니저 이름" 
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({manager:text})}
                         // 개행
                        maxLength={100}
                        autoCapitalize={'none'} //대문자 자동수정 안함
                        editable={true}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.tel}
                        style={styles.input}
                        placeholder="전화번호" 
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({tel:text})}
                         // 개행
                        maxLength={100}
                        autoCapitalize={'none'} //대문자 자동수정 안함
                        editable={true}
                    />
                </View>
                
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.address}
                        style={styles.input}
                        placeholder="주소" 
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({address:text})}
                         // 개행
                        maxLength={100}
                        autoCapitalize={'none'} //대문자 자동수정 안함
                        editable={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={()=>{
                        this.addCafe(uid);
                        this.state.latitude==!'' && this.props.navigation.navigate('Main');
                        // this.setState({updated:"true"})
                    }}
                >
                    <Text style={styles.loginText}>등록</Text>
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
    inputView:{
      width:"65%",
      backgroundColor:"#f2f2f2",
      borderRadius:25,
      height:45,
      marginTop: 10,
      marginBottom:10,
      justifyContent:"center",
      padding:20
    },
    
    loginBtn:{
      width:"65%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      marginBottom:20
    }
      
  })

export default RegisterCafeSceen;