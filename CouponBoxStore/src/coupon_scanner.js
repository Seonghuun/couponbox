/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Alert } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';


class CouponScanScreen extends Component {
  state = {
    scan: true,
    UserID: 'Default',
  };
  
  render () {

    //파이어베이스 db를 인자로 받아오는 부분
    const {params} = this.props.route;
    const db = params ? params.db : null;

    
    //const UserID = 'User1';
    const CafeID = 'Cafe1';
    
    //qr스캐너가 읽었을 경우 처리하는 부분
    const {scan, UserID} = this.state;
    const onSuccess = (e) => {
      this.setState({scan: false, UserID: e.data})
      console.log(scan)
      console.log(e.data)
      addStamp(UserID)
      Alert.alert(
        '스탬프 발급',
        UserID+'님의 스탬프 발급에 성공했습니다.',
        [
          {text: '확인', onPress: () => this.setState({scan: true})}
        ]

      )
    }

    //도장 개수 늘려주는 부분
    //!!!도장이 없는 경우, 필드를 생성? 해줘야함
    const addStamp = (UserID) => {
      const CafeDoc = db.collection('test')
      .doc('User')
      .collection('UserList')
      .doc(UserID)
      .collection('Stamps')
      .doc(CafeID);
      CafeDoc.get()
      .then(doc => {
        const nowNum = doc.data().StampNumber + 1;
        console.log(nowNum);
        CafeDoc.update({StampNumber: nowNum});
      })
    }

    return (
      <>
        {scan &&
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={(node) => {this.scanner = node}}
            onRead={onSuccess}
            
            topContent={
              <Text>
                Scan your QRCode
              </Text>
            }
          />
        }
      </>
    )
  }
};

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    sectionContainer: {
      marginTop: 32,
    },
  });

export default CouponScanScreen;
