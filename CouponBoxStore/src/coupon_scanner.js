/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
    return (
      <>
      { this.state.scan &&
        <View style={styles.sectionContainer}>
          
          <QRCodeScanner
            reactivate={false} //일단 false로 해둠. 나중에 ok 누르면 재활성화 되도록 수정필요
            showMarker={true}
            ref={(node) => {this.scanner = node}}
            onRead={this.onSuccess}

            topContent={
              <Text>
                Scan your QRCode
              </Text>
            }
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
