import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
class Second extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1, justifyContent: 'center' }} >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={{ alignItems: 'center' }}>Second Page</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Second;