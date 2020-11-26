import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Button, PermissionsAndroid, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-simple-modal';
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import auth from "@react-native-firebase/auth";

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
    uid: '',
    region: {
      latitude: 37.610810,
      longitude: 126.996610,
      latitudeDelta: 0.006,
      longitudeDelta: 0.009
    },
    //현재 카페
    nowCafe: {
      
      address: 'Seoul Default',
      latitude: 0,
      longitude: 0,
      manager: 'none',
      name: 'Default',
      owner: 'none',
      registerDate: '',
      tel: 'none'


    },
    nowCafeIdx: 0,
    cafeInfo: [],
    updated: false,
    
    open: false,
  }

  constructor(){
    super();
    this.getcafeLists();
    this.getUid();
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

  getUid() {
    auth().onAuthStateChanged(user => {
        if(user!=null){
            
            this.setState({uid:user.uid});                
        }         
    })
}

  getcafeLists() {
    const {cafeInfo} = this.state;
    firestore().collection('cafelist').get().
    then(querySnapshot=>{
        console.log('Total cafes: ', querySnapshot.size);
        cafeInfo.splice(0, cafeInfo.length);       
        querySnapshot.forEach(documentSnapshot => {
            // 카페 데이터 (필드)
            cafeInfo.push(documentSnapshot.data());
        
        })
        console.log(typeof(cafeInfo[0].latitude));
        this.setState({updated:true});
        
    })
}

getImage() {
    // const {imageUrl} = this.state;
    // 일단 로고만 불러옴
    let imageRef = storage().ref('cafeImages/cafe'+(this.state.nowCafeIdx+1)+'/1');
    
    imageRef.getDownloadURL()
    .then((url) => {
        // console.log(url);
        console.log('navigate to cafedata');
        this.props.navigation.navigate('Map2', {
            cafeId: 'cafe'+ this.state.nowCafeIdx+1,
            data: this.state.nowCafe,
            image: url,
            uid: this.state.uid,
            
        })
    }).catch((e)=>{
        console.log(e)
        this.props.navigation.navigate('Map2', {
            cafeId: 'cafe'+ this.state.nowCafeIdx+1,
            data: this.state.nowCafe,
            uid: this.state.uid,
            
        })
    });
}

  componentDidMount() {
    requestLocationPermission();
    
  }

  render () {
      console.log('render 시작')
 
    return (
      <View style={{flex:1, padding:16,}}>
          <MapView 
            style={{flex:1,}}
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.region}
            showsUserLocation={true}
            >
            {this.state.cafeInfo.map((item, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                TouchableOpacity onPress={() => this.setState({ open: true, nowCafe: item, nowCafeIdx: index })} 
              />
            ))
            }
          </MapView>
          <Modal
          offset={250}
            // isVisible={this.state.visibleModal === 5}
            open={this.state.open}
            
            modalDidClose={() => this.setState({ open: false })}
            style={{ alignItems: 'center' }}>
            
            <View>
                <TouchableOpacity
                onPress={()=>{
                    this.getImage();
                }}
                >
                <Text>
                {this.state.nowCafe.name}
              </Text>
                </TouchableOpacity>
              
              <Text>
                {this.state.nowCafe.tel}
              </Text>
              <Text>
                {this.state.nowCafe.address}
              </Text>

          </View>
        </Modal>
      </View>
    )
  }
}

export default TabMapScreen;