/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class UseCouponScreen extends Component{
  render () {
    const {params} = this.props.route;
    const db = params ? params.db : null;
    const handleClick = () => {
      db.collection('test')
      .doc('User')
      .collection('UserList')
      .doc('User1')
      .collection('Stamps')
      .doc('Cafe2')
      .get()
      .then(doc => {
        if(!doc.data()) {
          alert('No data');
        }
        else{
          alert('카페이름:'+doc.data().CafeName+'\n스탬프 개수:'+doc.data().StampNumber);
        }
      });
    };
    const handleClick2 = () => {
      db.collection('test')
      .doc('User')
      .collection('UserList')
      .doc('User1')
      .collection('Stamps')
      .get()
      .then( allStamp => {
        allStamp.forEach(doc => {
          alert('카페 이름:' + doc.data().CafeName + '\n도장개수:'+doc.data().StampNumber);
        });
      })
    }
    return (
      <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
      }}>
        <Text>Use Coupon</Text>
        <Button
            title="개수 조회"
            onPress={()=>{ handleClick2() }}
        />
      </View>
    )
  }
}


export default UseCouponScreen;
