import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import searchImg from '../assets/images/searchBar.png'
import {auth, firestore, storage} from './firebase';

class TabHomeScreen extends Component {
    state = {
        
        uid: '',
        cafeInfo: [],
        cafeList: [],
        updated : '',
        imageUrl: ''
    };
 
    getUid() {
        auth.onAuthStateChanged(user => {
            this.setState({uid:user.uid});
            console.log(this.state.uid);
            
        })
    }
    getcafeLists() {
        const {cafeInfo, cafeList } = this.state;
    firestore.collection('test').doc('Cafe').collection('CafeList').get().
    then(querySnapshot=>{
        console.log('Total cafes: ', querySnapshot.size);
        cafeInfo.splice(0, cafeInfo.length);       
        querySnapshot.forEach(documentSnapshot => {
            
            cafeList.push(documentSnapshot.id);
            cafeInfo.push(documentSnapshot.data());
            
        })
        console.log(this.state.cafeList);        
        console.log(this.state.cafeInfo);
        this.setState({updated : 'true'});
        
    })
    }
    getImage(idx) {
        // const {imageUrl} = this.state;
        let imageRef = storage.ref('cafeImages/'+this.state.cafeList[idx]);
        
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
        }).catch((e)=>console.log(e));
        
        // console.log(this.state.imageUrl);
        
    }

    constructor(props) {
        super(props);
        this.getcafeLists();
        this.getUid();
      }


        
    render () {
        
        return (
            // <SafeAreaView style={styles.container}>
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
          <Text>{item.Name}</Text>
        </TouchableOpacity>
            
          ))
        }
        </ScrollView>    
            
                
               
            

            //  </SafeAreaView>
            
            
            
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center'
        
    },
    scrollView: {
        backgroundColor: 'white'
        // alignItems: 'center'
        // marginHorizontal: 50,
    },
    
    caffeBtn:{
      width:"100%",
      backgroundColor:"#E6E6E6",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
    //   marginTop:10,
      marginBottom:10
    }
      
  })


export default TabHomeScreen;

   
    