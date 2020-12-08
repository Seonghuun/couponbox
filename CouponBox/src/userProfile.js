import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

// 유저 프로필 편집
class UserProfileScreen extends Component {

    state = {
        uid : '',
        image: '',
    }

    getImage(uid) {
        // 일단 로고만 불러옴
        let imageRef = storage().ref('userImages/'+uid);
        
        imageRef.getDownloadURL()
        .then((url) => {
            // 카페 아이디, 정보, UID, 이미지 URL 과 함께 카페데이터 화면으로 이동
            this.setState({image: url});
        }).catch((e)=>{
            // 이미지 URL을 불러오지 못해서 제외하고 카페데이터 화면으로 이동
            console.log(e)
        });
    }

    addImage(id) {
        try{
            ImagePicker.launchImageLibrary({}, response=>{ // showImagePicker : 사진 찍거나, 사진첩에서 불러옴
                console.log(response.path)
                if(response.path==undefined){
                    console.log('error');
                    return;
                }
                console.log(response.path.split('.')[1])
                this.setState({
                    image: response.uri
                })
                this.uploadImage(id, response.path)
                // this.uploadImage(id, response.uri);
            })
        }catch{
            console.log('error');
        }
        
    }

    uploadImage(id, path) {
        let imageRef = storage().ref('userImages/'+id);
        imageRef.putFile(path).then((snapshot)=>{
            console.log('upload success')

        })
    }

    addUser(uid, email) {
        // 정보 입력하지 않았을 때
        if(!this.state.name){
            alert('이름을 입력해주세요');
            return;
        }
        if(!this.state.phonenum){
            alert('휴대폰 번호를 입력해주세요');
            return;
        }
        // 입력한 정보 db에 반영하고 유저 탭 첫화면으로 이동
        firestore().
                    collection('userlist').doc(uid).
                    set({
                        email : email,
                        name : this.state.name,
                        phonenum : this.state.phonenum
                    })
                    .then(() => {
                        console.log('User edited');
                        this.props.navigation.navigate('User1');
                    });
    }

    constructor(props) {
        super(props);
        const {params} = this.props.route;
        const uid = params ? params.uid : null;
        const name = params ? params.name : null;
        const num = params ? params.num : null;
        this.state = { name: name, phonenum: num };
        this.getImage(uid);
    }


    render() {
        const {params} = this.props.route;
        const uid = params ? params.uid : null;
        const email = params ? params.email : null;
        return (
            <View style={styles.mainView}>
                <Image
                source={{uri: this.state.image? this.state.image : null}}
                style={{width:90, height: 90, borderRadius: 80 /2}}
                />
                <TouchableOpacity
                style={{marginTop:10, marginBottom:30}}
                    onPress={()=>{
                        this.addImage(uid);
                    }}
                >
                    <Text style={{color:'blue', fontWeight:'bold'}}>프로필 사진 바꾸기</Text>
                </TouchableOpacity>
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.name}
                        style={styles.input}
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({name:text})}
                         // 개행
                        maxLength={100}
                        autoCapitalize={'none'} //대문자 자동수정 안함
                        editable={true}
                    />
                </View>
                
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.phonenum}
                        style={styles.input}
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({phonenum:text})}
                         // 개행
                        maxLength={100}
                        autoCapitalize={'none'} //대문자 자동수정 안함
                        editable={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={()=>{
                        this.addUser(uid, email);
                    }}
                >
                    <Text style={styles.loginText}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={()=>{
                        this.props.navigation.navigate('User1');
                    }}
                >
                    <Text style={styles.loginText}>Cancel</Text>
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
      marginBottom:10
    },
    cancelBtn:{
        width:"65%",
        backgroundColor:"#f2f2f2",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
      }
      
  })

export default UserProfileScreen;