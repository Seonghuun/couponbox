import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import auth from "@react-native-firebase/auth";


class TabUserScreen extends Component {
    state = {
        myUID : ""
    }
    
    checkLogin() {
        auth().onAuthStateChanged(user => {
            this.setState({myUID:user.uid});
        })
    }
    
    render () {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>{this.state.myUID}</Text>
                <TouchableOpacity 
           onPress={()=>{
             this.checkLogin()
            
           }}
        >
          <Text>check</Text>
        </TouchableOpacity>
            </View>
        )
    }
}

export default TabUserScreen;