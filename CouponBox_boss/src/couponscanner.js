import 'react-native-gesture-handler';
import React, { Component} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import { DefaultTheme } from '@react-navigation/native';


class CouponScanScreen extends Component {
  state = {
    scan: true,
  };

  render () {

    // //파이어베이스 db를 인자로 받아오는 부분
    // const {params} = this.props.route;
    // const db = params ? params.db : null;
    const db = firestore();
    
    //const UserID = 'User1';
    //const CafeID = 'Cafe1';
    const {params} = this.props.route;
    const cafeID = params ? params.cafeId : null;
    const cafeName = params ? params.cafeName : null;

    //qr스캐너가 읽었을 경우 처리하는 부분
    const {scan} = this.state;
    const onSuccess = (e) => {
      const UserID = e.data.split(',')[0];
      const Command = e.data.split(',')[1];
      this.setState({scan: false})
      console.log('CafeID: ', cafeID);
      console.log('CafeName: ', cafeName);
      console.log('scanOK?: ', this.state.scan);
      console.log('qrscan Data: ', e.data);
      console.log('UserID: ', UserID);
      if(Command==='getStamp'){
        console.log('get stamp');
        addStamp(UserID);
      }
      else if(Command==='useCoupon'){
        console.log('use Coupon');
        useCoupon(UserID);
      }
      else{
        Alert.alert(
          'QR코드 오류',
          'QR코드를 확인해 주십시오',
          [{text: '확인', onPress: () => this.setState({scan: true})}]
        )
      }
    }

    //쿠폰 사용하는 부분
    const useCoupon = (UserID) => {
      const UserDoc = db.collection('userlist')
        .doc(UserID);
      UserDoc.get()
        .then(doc => {
          if(doc.exists){ //유저가 존재하는 경우
            const CafeDoc = UserDoc.collection('stamp').doc(cafeID);
            CafeDoc.get()
              .then(doc => {
                if(!doc.exists){ // 카페가 존재하지 않는 경우
                  console.log('CafeDoc not exist');
                  const alertTitle = '사용 실패';
                  const alertMsg = '잘못된 QR코드 입니다';
                }
                else{
                  if(doc.data().number>=10){
                    const nextNum = doc.data().number-10;
                    CafeDoc.update({number: nextNum});
                    Alert.alert(
                      '사용 완료',
                      '쿠폰 사용에 성공했습니다',
                      [{text: '확인', onPress: () => this.setState({scan: true})}]
                    )
                  }
                  else{
                    Alert.alert(
                      '사용 실패',
                      '스탬프의 개수가 모자랍니다',
                      [{text: '확인', onPress: () => this.setState({scan: true})}]
                    )
                  }
                }
              })
              .catch(err => {
                console.log('Error getting Cafedoc', err);
                Alert.alert(
                  '오류발생',
                  'CafeDoc오류가 발생했습니다',
                  [{text: '확인', onPress: () => this.setState({scan: true})}]
                )
              })
          }
          else{
            Alert.alert(
              'QR코드 오류',
              '잘못된 QR코드 입니다',
              [{text: '확인', onPress: () => this.setState({scan: true})}]
            )
          }
        })
        .catch(err => {
          console.log('Error getting Userdoc', err);
          Alert.alert(
            '오류발생',
            'UserDoc오류가 발생했습니다',
            [{text: '확인', onPress: () => this.setState({scan: true})}]
          )
        })
    }

    //도장 개수 늘려주는 부분
    const addStamp = (UserID) => {
      const UserDoc = db.collection('userlist')
        .doc(UserID);
      UserDoc.get()
        .then(doc => {
          if(doc.exists){ //유저가 존재하는 경우
            const CafeDoc = UserDoc.collection('stamp').doc(cafeID);
            CafeDoc.get()
              .then(doc => {
                if(!doc.exists){ // 카페가 존재하지 않는 경우
                  console.log('CafeDoc not exist');
                  CafeDoc.set({name: cafeName, number: 1});
                  //console.log(test1.number);
                }
                else{
                  const nextNum = doc.data().number+1;
                  console.log('now stamp number: ', nextNum);
                  CafeDoc.update({number: nextNum});
                }
                Alert.alert(
                  '스탬프 발급',
                  '스탬프 발급에 성공했습니다.',
                  [{text: '확인', onPress: () => this.setState({scan: true})}]
                )
              })
              .catch(err => {
                console.log('Error getting Cafedoc', err);
              })
          }
          else{
            Alert.alert(
              'QR코드 오류',
              '잘못된 QR코드 입니다',
              [{text: '확인', onPress: () => this.setState({scan: true})}]
            )
          }
        })
        .catch(err => {
          console.log('Error getting Userdoc', err);
          Alert.alert(
            '오류발생',
            '오류가 발생했습니다',
            [{text: '확인', onPress: () => this.setState({scan: true})}]
          )
        })
    }
        /*
      const CafeDoc = db.collection('userlist')
        .doc(UserID)
        .collection('stamp')
        .doc(cafeID);
      CafeDoc.get()
        .then(doc => {
          if(!doc.exists){ // 카페가 존재하지 않는 경우
            console.log('CafeDoc not exist');
            CafeDoc.set({number: 1});
            //console.log(test1.number);
          }
          else{
            const nextNum = doc.data().number+1;
            console.log('now stamp number: ', nextNum);
            CafeDoc.update({number: nextNum});
          }
          Alert.alert(
            '스탬프 발급',
            this.state.UserID+'님의 스탬프 발급에 성공했습니다.',
            [{text: '확인', onPress: () => this.setState({scan: true})}]
          )
        })
        .catch(err => {
          console.log('Error getting doc', err);
          Alert.alert(
            '오류발생',
            '오류가 발생했습니다',
            [{text: '확인', onPress: () => this.setState({scan: true})}]
          )
        })*/
      

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