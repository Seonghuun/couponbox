import 'react-native-gesture-handler';
import React, { Component, useEffect, useRef } from 'react';
import { View, Text, Image, PermissionsAndroid, TouchableOpacity, StyleSheet, YellowBox } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from 'react-native-simple-modal';
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import auth from "@react-native-firebase/auth";

YellowBox.ignoreWarnings([
  'Animated: `useNativeDriver` was not specified.',
]);

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
      latitude: 37.444,
      longitude: 126.996610,
      latitudeDelta: 0.006,
      longitudeDelta: 0.009
    },
    //현재 카페
    nowCafe: {
      id : 'cafe0',
      address: 'Seoul Default',
      latitude: 0,
      longitude: 0,
      manager: 'none',
      name: 'Default',
      owner: 'none',
      registerDate: '',
      tel: 'none'


    },
    mapList: [],
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
    const {mapList, cafeInfo} = this.state;
    firestore().collection('cafelist').get().
    then(querySnapshot=>{
        console.log('Total cafes: ', querySnapshot.size);
        cafeInfo.splice(0, cafeInfo.length);       
        querySnapshot.forEach(documentSnapshot => {
          // 자동완성에 띄울 객체 형식에 맞게 생성후 mapList에 저장
          const tmp = new Object();
          tmp.description= documentSnapshot.data().name;
          const tmp_2 = new Object();
          const tmp_3 = new Object();
          tmp.geometry = tmp_2;
          tmp.geometry.location = tmp_3;
          tmp.geometry.location.lat = documentSnapshot.data().latitude;
          tmp.geometry.location.lng = documentSnapshot.data().longitude;
          mapList.push(tmp);

          // 마커와 모달에 사용할 객체 생성후 cafeInfo에 저장
          const tmp_4 = new Object();
          tmp_4.id = documentSnapshot.id;
          tmp_4.address = documentSnapshot.data().address;
          tmp_4.latitude = documentSnapshot.data().latitude;
          tmp_4.longitude = documentSnapshot.data().longitude;
          tmp_4.manager = documentSnapshot.data().manager;
          tmp_4.name = documentSnapshot.data().name;
          tmp_4.owner = documentSnapshot.data().owner;
          tmp_4.registerDate = documentSnapshot.data().registerDate;
          tmp_4.tel = documentSnapshot.data().tel;
          cafeInfo.push(tmp_4);
        
        })
        // re-render을 위해서 setState
        this.setState({updated:true});
        
    })
}

getImage(id) {
    // const {imageUrl} = this.state;
    // 일단 로고만 불러옴
    let imageRef = storage().ref('cafeImages/'+ id+'/1');
    
    imageRef.getDownloadURL()
    .then((url) => {
      this.setState({imageUrl:url})
      console.log('getimage');
    }).catch((e)=>{
        // console.log(e)
        console.log('no image');
    });
}

componentDidMount() {
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
    requestLocationPermission();    
    // console.log('didmount');
  });
}

// props가 변동이 있을때(ex. navigate시 param 넘겨줄때)
componentDidUpdate(prevProps) {
  // console.log('didupdate');
  const {params} = this.props.route;
  const searchRegion = params ? params.region : null;
  const prevRegion = prevProps.route.params? prevProps.route.params.region : null;
  console.log('현재 프롭', searchRegion);
  console.log('이전 프롭', prevRegion);
  if(searchRegion!=prevRegion){
    this.setState({
      region: {
        latitude: searchRegion.latitude,
        longitude: searchRegion.longitude,
        latitudeDelta: 0.0030,
        longitudeDelta: 0.0040
      }
    });
  }
}

componentWillUnmount() {
  this._unsubscribe();
}

  render () {
    
    console.log('render');
    return (
      <View style={{flex:1}}>
        <TouchableOpacity
        onPress={() => 
            this.props.navigation.navigate('Search', {mapList:this.state.mapList})
          }
        >
          <Image
            style={{resizeMode:'contain'}}
            source = {require('../assets/images/searchbar.png')}
          />
        </TouchableOpacity>
          <MapView
            style={{flex:4}}
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.region}
            region={this.state.region}
            showsUserLocation={true}
            >
            {this.state.cafeInfo.map((item, index) => (
              <Marker
                key={index}
                coordinate={{ latitude : item.latitude ? item.latitude : 0, longitude: item.longitude ? item.longitude : 0 }}
                TouchableOpacity onPress={() => 
                  {
                    this.setState({
                      region: {
                      latitude : item.latitude,
                      longitude : item.longitude,
                      latitudeDelta: 0.0030,
                      longitudeDelta: 0.0040
                      }
                    })
                    this.getImage(item.id);
                    console.log(item.id, item.name);
                    this.setState({ open: true, nowCafe: item})                    
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
                    // searchRegion = null;
                    console.log('navigate to cafedata');
                    this.props.navigation.navigate('Map2', {
                      cafeId: this.state.nowCafe.id,
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
                    style={{height:80, width:80, marginLeft:30, marginRight:10}} 
                    source={{uri: this.state.imageUrl?this.state.imageUrl:null }}
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