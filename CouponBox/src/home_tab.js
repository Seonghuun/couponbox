import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";

class TabHomeScreen extends Component {
    state = {
        
        uid: '',
        cafeInfo: [],
        cafeList: [],
        updated : ''
    };
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

    constructor(props) {
        super(props);
        this.getcafeLists();
      }


        
    render () {
        
        return (
            <View>
                {
          this.state.cafeInfo.map((item, idx)=>(
            <Button
              key={idx}
              title={item.Name}
              onPress={()=>{
                  console.log('navigate to cafedata');
                  this.props.navigation.navigate('Home2', {
                      data: this.state.cafeInfo[idx],
                      
                  })
              }}
            />
          ))
        }
                
                <Button title="getUID"
                    onPress={()=>{
                        this.getUid()                       
                      }}/>
                <Button
                    title="get cafe lists"
                    onPress={()=>{
                        this.getcafeLists()
                    }}    
                />
            </View>

            
            
            
        )
    }
}


export default TabHomeScreen;

   
    