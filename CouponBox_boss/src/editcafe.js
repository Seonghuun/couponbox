import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";


class EditCafeSceen extends Component {

    state = {
        caffe_name : '',
        tel :'',
        address : '',
        manager : '',
        updated : ''

    }
    addCafe() {
        
        firestore().collection('test').doc('Cafe').collection('CafeList').get().
            then(querySnapshot=>{
                var size = querySnapshot.size+1;
                console.log('Total cafes: ', querySnapshot.size);
                console.log(size);
                firestore().
                    collection('test').
                    doc('Cafe').collection('CafeList').doc('Cafe' + size.toString()).
                    set({
                        Name : this.state.caffe_name,
                        Manager : this.state.manager,
                        Address : this.state.address,
                        Tel : this.state.tel,
                        RegisterDate : new Date()
                        
                    })
                    .then(() => {
                        console.log('Cafe added');
                    });
            });
        
    }


    render() {
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
                        this.addCafe()
                        this.props.navigation.navigate('Main');
                        // this.setState({updated:"true"})
                    }}
                >
                    <Text style={styles.loginText}>수정</Text>
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
      elevation:5,
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
    }
      
  })

export default EditCafeSceen;