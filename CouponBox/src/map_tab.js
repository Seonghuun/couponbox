import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Button, PermissionsAndroid, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-simple-modal';
import firestore from "@react-native-firebase/firestore";

/***************************** */
/*  필수 사항
/*  1. AndroidManifest.xml의 마지막 meta-data 필드 참조할 것
/*  2. API키 필요
/*  3. 추후에 해당 어플만 사용하도록 구글맵플랫폼에서 제한 걸어야함
/*  4. npm install react-native-maps 등 import 보고 설치할 것
/*  5. 위치정보 퍼미션, 마찬가지로 manifest 파일 참조
/*  6. 
/***************************** */

//위치정보 사용 요구
async function requestLocationPermission() {
  try { if (Platform.OS === "ios") { 
    return await Geolocation.requestAuthorization("always"); 
    }
    if (Platform.OS === "android") { 
      return await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, ); 
    } 
    console.log('location permission success')
  } catch (e) { 
    console.log(e); 
  } 
}

class TabMapScreen extends Component{
  state={
    region: {
      latitude: 37.610810,
      longitude: 126.996610,
      latitudeDelta: 0.006,
      longitudeDelta: 0.009
    },
    //현재 카페
    nowCafe: {
      cafeName: 'Default',
      cafeAddress: 'Seoul Default',
      latitude: 0,
      longitude: 0,
    },
    cafeInfo: [],
    
    open: false,
  }

  constructor(){
    super();
    this.getLocation();
  }

  //현재위치로 설정
  getLocation = () => {
    const {region, } = this.state;
    Geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0030,
          longitudeDelta: 0.0040
        }
      });
    },
      (error) => {
        console.log(error.message);
      });
    console.log('현재위치');
    console.log(region.latitude);
    console.log(region.longitude);
  }

  getcafeLists() {
    const {cafeInfo} = this.state;
    firestore().collection('cafelist').get().
    then(querySnapshot=>{
        console.log('Total cafes: ', querySnapshot.size);
        cafeInfo.splice(0, cafeInfo.length);       
        querySnapshot.forEach(documentSnapshot => {
            // 카페 아이디 (cafe1)
            cafeList.push(documentSnapshot.id);
            // 카페 데이터 (필드)
            cafeInfo.push(documentSnapshot.data());
        
        })
        this.setState({updated : 'true'});
    })
}

  componentDidMount() {
    requestLocationPermission();
    
  }

  render () {
    //카페 리스트
    const cafeList = [
      {
        cafeName: 'Cafe1', cafeAddress: 'Seoul Default', 
        latitude: 37.61082, longitude: 126.99661,
      },
      {
        cafeName: 'Cafe2', cafeAddress: 'Seoul Default',
        latitude: 37.61183, longitude: 126.99662,
      },
      {
        cafeName: 'Cafe3', cafeAddress: 'Seoul Default',
        latitude: 37.61284, longitude: 126.99661,
      },
    ]
    var cafes=3;

    console.log('cafe1 '+cafeList[0].latitude);
    console.log('cafe2 '+cafeList[1].latitude);
    console.log('cafe3 '+cafeList[2].latitude);
    return (
      <View style={{flex:1, padding:16,}}>
          <MapView 
            style={{flex:1,}}
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.region}
            showsUserLocation={true}
            >
            {[...Array(cafes)].map((n, index) => (
              <Marker
                coordinate={{ latitude: cafeList[index].latitude, longitude: cafeList[index].longitude }}
                TouchableOpacity onPress={() => this.setState({ open: true, nowCafe: cafeList[index] })} 
              />
            ))}
          </MapView>
          <Modal
            open={this.state.open}
            modalDidClose={() => this.setState({ open: false })}
            style={{ alignItems: 'center' }}>
            <View>
              <Text>
                {this.state.nowCafe.cafeName}
              </Text>
              <Text>
                010-xxxx-xxxx
              </Text>
              <Text>
                서울시 성북구 어디어디
              </Text>

          </View>
        </Modal>
      </View>
    )
  }
}

export default TabMapScreen;