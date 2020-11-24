import React, { Component } from "react";
import { View, Button, PermissionsAndroid, Text, TouchableOpacity } from "react-native";
import Modal from 'react-native-simple-modal';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";


class First extends Component{  
  state = {
    marker: {
      cafe_name: 'default',
      cafe_latitude: 0.000,
      cafe_longitude: 0.000,
    },

    region: {
      latitude: 37.610810,
      longitude: 126.996610,
      latitudeDelta: 0.006,
      longitudeDelta: 0.009
    },

    open: false
  }
  constructor(props) {
    super(props);
    this.getLoc();
    // this.state = {
    //   region:{
    //     latitude: 37.610810,
    //     longitude: 126.996610,
    //     latitudeDelta: 0.03,
    //     longitudeDelta: 0.04
    //   }
    // }
  }


  render() {
    const{navigation} = this.props;
    return (
      <View style={{ flex: 1, padding: 16, }}>
        <Button title="내 위치 가져오기" onPress={this.getLoc}></Button>
        <MapView
          style={{ flex: 1, }}
          provider={PROVIDER_GOOGLE}
          initialRegion={
            this.state.region
          }
          showsUserLocation={true}
        >
          <Marker coordinate={{ latitude: 37.610810, longitude: 126.996610 }}
            TouchableOpacity onPress={() => this.setState({ open: true })} />
          <Marker coordinate={{ latitude: 37.611706, longitude: 126.999249 }}
            TouchableOpacity onPress={() => this.setState({ open: true })} />
          <Marker coordinate={{ latitude: 37.519395, longitude: 127.027842 }}
            TouchableOpacity onPress={() => this.setState({ open: true })} />
        </MapView>

        {/* 모달 (마커 버튼 클릭시 발생) */}
        <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={() => console.log('모달 생성')}
          modalDidClose={() => this.setState({ open: false })}
          style={{ alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 20, marginBottom: 10 }}
              TouchableOpacity onPress={() => navigation.navigate("CafeScreen")}
            >카페 이름 누르면 카페 페이지 이동
            </Text>
            <Text>
              카페 경도 : xxxx
                        </Text>
            <Text>
              카페 위도 : xxxx
                        </Text>
            <Text>
              이미지 : xxxx
                        </Text>
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={() => this.setState({ open: false })}>
              <Text>카페정보 닫기</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  getLoc = () => {
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
        alert('error : ' + error.message);
      });

  }
  getMarker = () => {
    this.setState({
      marker: {
        cafe_name: "Hyun joong cafe",
      }
    });

  }


  async requestLocationPermission() {
    try {

      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        alert('위치정보 사용을 허가하셨습니다.');
      } else {
        alert('위치정보 사용을 거부하셨습니다.\n앱의 기능사용이 제한됩니다.');
      }

    } catch (err) { alert('퍼미션 작업 에러'); }

  }

  async componentDidMount() {
    await this.requestLocationPermission()
  }
}
export default First;








