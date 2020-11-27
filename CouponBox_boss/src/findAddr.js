/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';
import Postcode from 'react-native-daum-postcode';

class FindAddrScreen extends Component{
  render () {

    const setData =(data)=>{
        //console.log(data);
        this.props.route.params.onGoBack(data);
        this.props.navigation.goBack();
    }

    return (
        <Postcode
            style={{ width: 400, height: 200}}
            jsOptions={{ animated: true }}
            onSelected={
                (data)=>setData(data)
            }
        />
    )
  }
}

export default FindAddrScreen;
