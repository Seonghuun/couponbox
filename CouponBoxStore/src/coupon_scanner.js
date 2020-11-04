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


class CouponScanScreen extends Component {
  state = {
    scan: true
  };
  onSuccess = (e) => {
    this.setState(() => {
      scan: false
    })
    console.log(this.state.scan)
    alert(e.data)
  }
  render () {

    //파이어베이스 db를 인자로 받아오는 부분
    const {params} = this.props.route;
    const db = params ? params.db : null;

    
    const UserID = 'User1';
    const CafeID = 'Cafe1';
    
    //도장 개수 늘려주는 부분
    const addStamp = () => {
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
      { this.state.scan &&
        <View style={styles.sectionContainer}>
          
          <QRCodeScanner
            reactivate={true} //일단 false로 해둠. 나중에 ok 누르면 재활성화 되도록 수정필요
            showMarker={true}
            ref={(node) => {this.scanner = node}}
            onRead={this.onSuccess}

            topContent={
              <Text>
                Scan your QRCode
              </Text>
            }
          />
          <Button title = 'addStamp'
              onPress={addStamp}
          />
        </View>
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
