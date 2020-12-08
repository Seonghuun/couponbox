/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import {ButtonGroup} from 'react-native-elements';
import React, {Component} from 'react'; 
import { Image, View, Text, FlatList, Button,StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';



class Main extends Component {
  state = {
        
    uid: '',
    cafeInfo: [],
    cafeList: [],
    updated : ''
};
constructor(props) {
  super(props);
  this.getUid();
  this.getcafeLists();  
}

getUid() {
    auth().onAuthStateChanged(user => {
        this.setState({uid:user.uid});
        console.log(this.state.uid);
        
    })
}
getcafeLists() {
  
    const {cafeInfo, cafeList } = this.state;
    firestore().collection('cafelist').get().
    then(querySnapshot=>{
        console.log('Total cafes: ', querySnapshot.size);
        cafeList.splice(0, cafeList.length);  
        cafeInfo.splice(0, cafeInfo.length);       //배열 초기화 
        querySnapshot.forEach(documentSnapshot => {
          if (documentSnapshot.data().owner == this.state.uid){
            cafeList.push(documentSnapshot.id);
            cafeInfo.push(documentSnapshot.data());
          }
            
            
            
        })
        
        console.log(this.state.cafeList);
        this.setState({updated : 'true'});
        
    })
}
getImage(idx) {
  // const {imageUrl} = this.state;
  console.log(idx);
  // 로고 불러오기
  let imageRef = storage().ref('cafeImages/'+this.state.cafeList[idx]+'/1');

  imageRef.getDownloadURL()
  .then((url) => {
      console.log(url);
      console.log('navigate to cafedata');
      this.props.navigation.navigate('Detail', {
          cafeId: this.state.cafeList[idx],
          data: this.state.cafeInfo[idx],
          uid: this.state.uid,
          image: url,
          
      })
  }).catch((e)=>{
    console.log(e)
    console.log('navigate to cafedata');
      this.props.navigation.navigate('Detail', {
          cafeId: this.state.cafeList[idx],
          data: this.state.cafeInfo[idx],
          uid: this.state.uid,
          
          
      })
  });
  
  console.log(this.state.imageUrl);
  
}

componentDidMount() {
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
    this.getcafeLists(); 
  });
}

componentWillUnmount() {
  this._unsubscribe();
}

  
  render () {

    
    return (
      <View style={{alignItems:'center'}}>
        <Text style={{padding:40, fontSize:20, alignSelf:'center'}}>
          My Cafe List
        </Text>
        {
          this.state.cafeInfo.map((item, idx)=>(
            <TouchableOpacity
              key={idx}
              style={styles.cafeBtn}
              onPress={()=>{
                this.getImage(idx);
              }}
            >
              <Text>
              {item.name}
              </Text>
            </TouchableOpacity>
            
          ))
        }
        
                {/* <Button title="getUID"
                    onPress={()=>{
                        this.getUid()                       
                      }}/> */}

            <TouchableOpacity
              style={styles.regBtn}
                onPress={()=>{
                  this.props.navigation.navigate('Register', {
                    uid: this.state.uid
                  });
                }}
            >
              <Text>
                카페 등록
              </Text>
            </TouchableOpacity>
                
            </View>
      
    )
  }
}

const styles = StyleSheet.create({
  cafeBtn:{
    width:"80%",
    backgroundColor:"#E6E6E6",
    borderRadius:25,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10,
    elevation: 5,
  },
  regBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10,
    elevation: 5,
  }
  
})

export default Main;
