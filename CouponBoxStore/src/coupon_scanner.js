/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class CouponScanScreen extends Component {
  render () {
    return (
        <View>
            <QRCodeScanner
                reactivate={true}
                showMarker={true}
                ref={(node) => {this.scanner = node}}
                topContent={
                    <Text style={styles.centerText}>
                        QR코드를 스캔해 주십시오.
                    </Text>
                }
            />
            <Text>QR Scan Screen</Text>
        </View>
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
  });

export default CouponScanScreen;
