import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";


class UserProfileScreen extends Component {

    state = {
        uid : '',
        name : '',        
        phonenum : ''
    }
    addUser(uid, email) {
        if(!this.state.name){
            alert('이름을 입력해주세요');
            return;
        }
        if(!this.state.phonenum){
            alert('휴대폰 번호를 입력해주세요');
            return;
        }
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


    render() {
        const {params} = this.props.route;
        const uid = params ? params.uid : null;
        const email = params ? params.email : null;
        return (
            <View style={styles.mainView}>
                <Image
                source={require('../assets/images/userImage.jpg')}
                style={{width:90, height: 90, borderRadius: 80 /2}}
                />
                <TouchableOpacity
                style={{marginTop:10, marginBottom:30}}
                    // onPress={()=>{
                        
                    // }}
                >
                    <Text style={{color:'blue', fontWeight:'bold'}}>프로필 사진 바꾸기</Text>
                </TouchableOpacity>
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.name}
                        style={styles.input}
                        placeholder="NAME" 
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
                        placeholder="PHONE NUMBER" 
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