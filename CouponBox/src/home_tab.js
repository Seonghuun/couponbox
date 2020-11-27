import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import searchImg from '../assets/images/searchBar.png'

class TabHomeScreen extends Component {
    state = {
        
        uid: '',
        cafeInfo: [],
        cafeList: [],
        updated : '',
        imageUrl: ''
    };
 
    // 유저 uid 불러와서 저장
    getUid() {
        auth().onAuthStateChanged(user => {
            if(user!=null){
                console.log('hometab');
                this.setState({uid:user.uid});                
            }         
        })
    }

    // 카페 리스트 불러와서 배열에 저장
    getcafeLists() {
        const {cafeInfo, cafeList } = this.state;
        firestore().collection('cafelist').get().
        then(querySnapshot=>{
            console.log('Total cafes: ', querySnapshot.size);
            cafeInfo.splice(0, cafeInfo.length);       
            querySnapshot.forEach(documentSnapshot => {
                // 카페 아이디 (cafe1)
                cafeList.push(documentSnapshot.id);
                // 카페 데이터 (필드)
                cafeInfo.push(documentSnapshot.data());
            
            })
            this.setState({updated : 'true'});
        })
    }

    // 카페 이미지 불러오고 다음화면으로 이동
    getImage(idx) {
        // const {imageUrl} = this.state;
        // 일단 로고만 불러옴
        let imageRef = storage().ref('cafeImages/'+this.state.cafeList[idx]+'/1');
        
        imageRef.getDownloadURL()
        .then((url) => {
            // console.log(url);
            console.log('navigate to cafedata');
            this.props.navigation.navigate('Home2', {
                cafeId: this.state.cafeList[idx],
                data: this.state.cafeInfo[idx],
                uid: this.state.uid,
                image: url,
                
            })
        }).catch((e)=>{
            console.log(e)
            this.props.navigation.navigate('Home2', {
                cafeId: this.state.cafeList[idx],
                data: this.state.cafeInfo[idx],
                uid: this.state.uid,
            })
        });
    }



    constructor(props) {
        super(props);
        this.getcafeLists();
        this.getUid();
      }

    render () {
        
        return (
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity>
                        <Image
                        style={{height:80, width:'100%', alignItems:'center'}}
                        source = {require('../assets/images/searchBar.png')}
                        />
                    </TouchableOpacity>
                    {
                        this.state.cafeInfo.map((item, idx)=>(
                        <TouchableOpacity
                        style = {styles.caffeBtn}
                        key={idx}
                        onPress={()=>{
                            this.getImage(idx);
                        }}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                        ))
                    }
                </ScrollView>    

        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
        
    },
    scrollView: {
        backgroundColor: 'white'

    },
    
    caffeBtn:{
      width:"100%",
      backgroundColor:"#E6E6E6",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginBottom:10
    }
      
  })


export default TabHomeScreen;

   
    