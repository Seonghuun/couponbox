import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';



class TabMapScreen extends Component {

    
    render () {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>지도 나올 곳</Text>
            </View>
        )
    }
}

export default TabMapScreen;