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
import { Image, View, Text, FlatList, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


class Main extends Component {
  state = {
        
    uid: '',
    cafeInfo: [],
    cafeList: [],
    updated : ''
};
constructor(props) {
  super(props);
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
    firestore().collection('test').doc('Cafe').collection('CafeList').get().
    then(querySnapshot=>{
        console.log('Total cafes: ', querySnapshot.size);
        cafeInfo.splice(0, cafeInfo.length);       
        querySnapshot.forEach(documentSnapshot => {
            
            cafeList.push(documentSnapshot.id);
            cafeInfo.push(documentSnapshot.data());
            
        })
        
        console.log(this.state.cafeInfo);
        this.setState({updated : 'true'});
        
    })
}

  
  render () {
    
    return (
      <View>
        {
          this.state.cafeInfo.map((item, idx)=>(
            <Button
              key={idx}
              title={item.Name}
            />
          ))
        }
        
                {/* <Button title="getUID"
                    onPress={()=>{
                        this.getUid()                       
                      }}/> */}
                <Button
                    title="카페 등록"
                    onPress={()=>{
                      this.props.navigation.navigate('Register');
                    }}    
                />
                
            </View>
      
     
     
      
    )
  }
}

export default Main;
