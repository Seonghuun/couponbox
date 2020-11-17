import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";

class CafeDataScreen extends Component {
    
    render () {
        const {params} = this.props.route;
        const data = params ? params.data : null;
       
        console.log(data);
        return (
            <View>
                <Text>
                    {data.Name}
                </Text>
                <Text>
                    {data.Address}
                </Text>
                <Text>
                    {data.Manager}
                </Text>
                <Text>
                    {data.Tel}
                </Text>
            </View>
            
            
            
        )
    }
}


export default CafeDataScreen;

   
    