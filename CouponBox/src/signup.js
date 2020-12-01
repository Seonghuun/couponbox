import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";


class SignupScreen extends Component {

    state = {
        uid : '',
        email :'',
        pw : '',
        name : '',
        
        phonenum : ''

    }
    addUser() {
        firestore().
                    collection('userlist').doc(this.state.uid).
                    set({
                        email : this.state.email,
                        name : this.state.name,
                        phonenum : this.state.phonenum

                    })
                    .then(() => {
                        console.log('User added');
                    });
    }

    signup() {
        if(!this.state.email){
            alert('이메일을 입력해주세요');
            return;
          }
          if(!this.state.pw){
            alert('비밀번호를 입력해주세요');
            return;
          }
          if(!this.state.name){
            alert('이름을 입력해주세요');
            return;
          }
          if(!this.state.phonenum){
            alert('휴대폰 번호를 입력해주세요');
            return;
          }
          if(this.state.pw.length<6){
            alert('비밀번호는 최소 6자 입니다.');
            return;
          }
        auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.pw)
            .then(() => {
                console.log('User account created & signed in!');
                auth().onAuthStateChanged(user => {
                    if(user!=null){
                        this.setState({uid:user.uid});
                        console.log('load success');
                        console.log('signup');
                        this.addUser();
                        this.props.navigation.navigate('Main');
                        console.log('navigate');
                    }
                    
                })
                
            })
            .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                alert('That email address is invalid!');
            }

            console.error(error);
        });
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.email}
                        style={styles.input}
                        placeholder="E-MAIL" 
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({email:text})}
                         // 개행
                        maxLength={100}
                        autoCapitalize={'none'} //대문자 자동수정 안함
                        editable={true}
                    />
                </View>
                
                <View style={styles.inputView}>
                    <TextInput
                        value={this.state.pw}
                        style={styles.input}
                        placeholder="PASSWORD" 
                        placeholderTextColor="#003f5c"
                        onChangeText={text=>this.setState({pw:text})}
                         // 개행
                        maxLength={100}
                        autoCapitalize={'none'} //대문자 자동수정 안함
                        editable={true}
                        secureTextEntry={true}  
                    />
                </View>
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
                        this.signup()
                    }}
                >
                    <Text style={styles.loginText}>Sign up and Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={()=>{
                        this.props.navigation.navigate('Login');
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
      padding:20,
      
      elevation: 5
    },
    
    loginBtn:{
      width:"65%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      marginBottom:10,
      
      elevation: 5
    },
    cancelBtn:{
        width:"65%",
        backgroundColor:"#f2f2f2",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10,
        elevation: 5
      }
      
  })

export default SignupScreen;