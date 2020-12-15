import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import Geolocation from 'react-native-geolocation-service';
// 홈 탭 카페 리스트 띄우는 화면
class TabHomeScreen extends Component {
    state = {
        
        uid: '',
        cafeInfo: [],
        updated : '',
        imageUrl: ''
    };
 
    // 유저 uid 불러와서 저장
    getUid() {
        auth().onAuthStateChanged(user => {
            if(user!=null){
                console.log('hometab');
                this.setState({uid:user.uid});                
            }         
        })
    }


    // 카페 리스트 불러와서 배열에 저장
    getcafeLists() {
        const {cafeInfo} = this.state;

        // 현재 위치를 기준으로 가까운 순으로 카페를 정렬하기 위해 현재 위치 불러오기
        const currentPos = new Object();
        Geolocation.getCurrentPosition((position) => {
            currentPos.lat = position.coords.latitude;
            currentPos.lon = position.coords.longitude;
            console.log(currentPos);
          },
            (error) => {
                // 불러오지 못했을 경우 최대값 넘는 값으로 설정
                console.log(error.message);
                currentPos.lat = 100; // 위도 최대값 90을 넘는값으로 설정
                currentPos.lon = 200; // 경도 최대값 180을 넘는값으로 설정
            });
        
        // 카페리스트 불러오기
        firestore().collection('cafelist').get().
        then(querySnapshot=>{
            console.log('Total cafes: ', querySnapshot.size);
            // cafeInfo 배열 초기화
            cafeInfo.splice(0, cafeInfo.length);       
            querySnapshot.forEach(documentSnapshot => {
                const tmp = new Object();
                // tmp = {id : documentSnapshot.id}; 리드 온리라 에러남
                tmp.id = documentSnapshot.id;
                tmp.address = documentSnapshot.data().address;
                tmp.latitude = documentSnapshot.data().latitude;
                tmp.longitude = documentSnapshot.data().longitude;
                tmp.manager = documentSnapshot.data().manager;
                tmp.name = documentSnapshot.data().name;
                tmp.owner = documentSnapshot.data().owner;
                tmp.tel = documentSnapshot.data().tel;
                // 현재 위치와의 거리 계산
                tmp.dist = Math.pow((currentPos.lat - documentSnapshot.data().latitude), 2) + Math.pow((currentPos.lon - documentSnapshot.data().longitude), 2);
                cafeInfo.push(tmp);            
            })
            // 현재 위치를 가져오는데 성공했을 경우 정렬
            if (currentPos.lat !=100 && currentPos.lon != 200){
                cafeInfo.sort(function (a,b) {
                    if (a.dist > b.dist){
                        return 1;
                    }
                    if (a.dist < b.dist){
                        return -1;
                    }
                    return 0;
                });
            }
            this.setState({updated : 'true'});
        })
 
    }

    // 카페 이미지 불러오고 다음화면으로 이동
    getImage(idx) {
        // 일단 로고만 불러옴
        let imageRef = storage().ref('cafeImages/'+this.state.cafeInfo[idx].id+'/1');
        
        imageRef.getDownloadURL()
        .then((url) => {
            // 카페 아이디, 정보, UID, 이미지 URL 과 함께 카페데이터 화면으로 이동
            console.log('navigate to cafedata');
            this.props.navigation.navigate('Home2', {
                cafeId: this.state.cafeInfo[idx].id,
                data: this.state.cafeInfo[idx],
                uid: this.state.uid,
                image: url,
                
            })
        }).catch((e)=>{
            // 이미지 URL을 불러오지 못해서 제외하고 카페데이터 화면으로 이동
            console.log(e)
            this.props.navigation.navigate('Home2', {
                cafeId: this.state.cafeInfo[idx].id,
                data: this.state.cafeInfo[idx],
                uid: this.state.uid,
            })
        });
    }



    constructor(props) {
        super(props);
        this.getcafeLists();
        this.getUid();
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getcafeLists();
        });
      }
      
      componentWillUnmount() {
        this._unsubscribe();
      }

    render () {
        
        return (
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate('Map')
                        }}
                    >
                        <Image
                        style={{alignItems:'center', marginBottom: 20}}
                        source = {require('../assets/images/searchbar.png')}
                        />
                    </TouchableOpacity>
                    {
                        this.state.cafeInfo.map((item, idx)=>(
                        <TouchableOpacity
                        style = {styles.caffeBtn}
                        key={idx}
                        onPress={()=>{
                            this.getImage(idx);
                        }}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                        ))
                    }
                </ScrollView>    

        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
        
    },
    scrollView: {
        backgroundColor: 'white'

    },
    
    caffeBtn:{
      width:"80%",
      backgroundColor:"#f2f2f2",
      borderRadius:25,
      height:40,
      alignItems:"center",
      justifyContent:"center",
      marginLeft: 37,
      marginBottom:15,
      elevation: 5
    }
      
  })


export default TabHomeScreen;

   
    