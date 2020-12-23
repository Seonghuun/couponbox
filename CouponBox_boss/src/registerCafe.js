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
        zonecode : '', //우편번호
        address : '',  //도로명주소
        address_d : '' , //상세주소
        manager : '',
        updated : '',
        latitude : 0,
        longitude: 0,
    }
    

    //다음 데이터 받음
    getAddr (daum_data){
        this.setState({
            address: daum_data.address,
            zonecode: daum_data.zonecode,
        })
        console.log('state ', this.state);
    }


    //주소를 위도,경도로 변환해주는 함수
    async toGeocode (addr){
        await Geocoder.from(addr)
          .then(json => {
              const location = json.results[0].geometry.location;
              console.log("toGeocode test : ",location);
              this.setState({latitude: location.lat, longitude:location.lng});
              console.log('after geocode',this.state.latitude, this.state.longitude);
          })
          .catch(error => console.warn(error));
      }

    //카페 추가하는 부분
    async addCafe(id) {
        await this.toGeocode(this.state.address);
        if(this.state.longitude===0){
            alert('다시 시도해 주십시오.');
        }
        else{
            await firestore().collection('cafelist').get().
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
                        addrees_d : this.state.address_d,
                        tel : this.state.tel,
                        registerDate : new Date(),
                        owner: id,
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                    })
                    .then(() => {
                        console.log('Cafe added');
                        alert('카페 추가가 완료되었습니다');
                        this.props.navigation.navigate('Main');
                    });
            });
        }
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

        //우편번호 설정
        const setZonecode =(zcode)=>{
            this.setState({
                zonecode: zcode,
            })
        }

        // console.log(uid);
        return (
            <View style={styles.mainView}>
              <Text
                style={{fontSize:20, padding:30}}
              >
                카페 등록
              </Text>
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
                        value={this.state.zonecode}
                        style={styles.input2}
                        placeholder="우편번호" 
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({zonecode:text})}
                         // 개행
                        maxLength={100}
                        autoCapitalize={'none'} //대문자 자동수정 안함
                        editable={true}
                    />
                    <TouchableOpacity
                    style={styles.zoneNum}
                    onPress={()=>{
                        this.props.navigation.navigate('findAddr',{
                            onGoBack: (dData) => this.getAddr(dData),
                        });
                      }}
                    >
                      <Text style={{color:'white'}}>주소찾기</Text>
                    </TouchableOpacity>
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
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.address_d}
                        style={styles.input}
                        placeholder="상세주소" 
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({address_d:text})}
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
                        
                        // this.setState({updated:"true"})
                    }}
                >
                    <Text style={styles.loginText}>등록</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={()=>{
                        this.props.navigation.goBack();
                        
                        // this.setState({updated:"true"})
                    }}
                >
                    <Text style={styles.loginText}>취소</Text>
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
    input2: { //우편번호
      width: '65%',
      height: 45,
      backgroundColor: '#f2f2f2',
      top:39,
      fontSize: 15,
      padding: 10
    },
    zoneNum: { //주소찾기 버튼
      width:"40%",
      backgroundColor:"#F7819F",
      borderRadius:25,
      height:38,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      marginBottom:20,
      top:-22.5,
      left:132,
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
      padding:20,
      elevation:5,
    },
    inputView2:{
        width:"65%",
        backgroundColor:"#f2f2f2",
        borderRadius:25,
        height:45,
        marginTop: 10,
        marginBottom:10,
        padding:20,
        
      },
    loginBtn:{
      width:"65%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      marginBottom:20,
      elevation:5,
    },
    cancelBtn:{
      width:"65%",
      backgroundColor:"#FFFFFF",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:0,
      marginBottom:20,
      elevation:1,
    }
      
  })

export default RegisterCafeSceen;