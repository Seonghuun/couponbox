import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, Image, PermissionsAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-simple-modal';
// import Modal from 'react-native-modal';
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
    visibleModal: null,
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
    imageUrl: '',
    
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

getImage(idx) {
    // const {imageUrl} = this.state;
    // 일단 로고만 불러옴
    let imageRef = storage().ref('cafeImages/cafe'+(idx+1)+'/1');
    
    imageRef.getDownloadURL()
    .then((url) => {
      this.setState({imageUrl:url})
      console.log('getimage');
    }).catch((e)=>{
        console.log(e)
        this.setState({imageUrl:''})
    });
}

  // componentDidMount() {
  //   requestLocationPermission();
    
  // }

  render () {
    return (
      <View style={{flex:1}}>
          <MapView 
            style={{flex:1}}
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.region}
            showsUserLocation={true}
            >
            {this.state.cafeInfo.map((item, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                TouchableOpacity onPress={() => 
                  {
                    this.getImage(index);
                    console.log('setstate');
                    this.setState({ open: true, nowCafe: item, nowCafeIdx: index+1 })
                    
                  } 
                  }
              />
            ))
            }
          </MapView>

          <Modal
            offset={250}
            open={this.state.open}            
            modalDidClose={() => this.setState({ open: false, imageUrl:'' })}
            // style={{ alignItems: 'center' }}
            modalStyle={{
              width: '90%',
              height: '16%'
            }}
            
            >
            
            <View style={styles.topView}>
              <View style={{flexDirection:'column'}}>
                <TouchableOpacity
                  onPress={()=>{
                    console.log('navigate to cafedata');
                    this.props.navigation.navigate('Map2', {
                      cafeId: 'cafe'+ this.state.nowCafeIdx,
                      data: this.state.nowCafe,
                      image: this.state.imageUrl,
                      uid: this.state.uid,
                    })
                  }}>
                  <Text style={{color:'blue', fontSize:15}}>{this.state.nowCafe.name}</Text>
                </TouchableOpacity>
                <Text style={{fontSize:12}}>{this.state.nowCafe.address}</Text>
              </View>

              <Image
                    style={{height:80, width:80, marginRight:10}} 
                    source={{uri: this.state.imageUrl}}
              />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  topView:{
      flex:1,
      justifyContent:'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 50
      
  }

})

export default TabMapScreen;