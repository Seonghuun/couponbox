import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';


class TabUserScreen extends Component {
    state = {
        myUID : "",
        myEmail: "",
        myName: "",
        myNum: "",
        image: ""
    }
    // 로그인 상태 체크하고 유저 정보 state에 저장
    checkLogin() {
        auth().onAuthStateChanged(user => {
            if(user!=null){
                console.log('usertab');
                this.setState({myUID:user.uid});
                this.setState({myEmail:user.email});
                this.getImage(user.uid);
                firestore().collection('userlist').doc(user.uid)
                .onSnapshot(dss=>{
                    this.setState({myName: dss.data().name})
                    this.setState({myNum: dss.data().phonenum})
                })
            }
            // 로그아웃 했을때
            else{
                console.log('usertab check again');
            }          
        })        
    }
    // 로그아웃
    signOut() {
        auth().signOut().
        then(()=> {
            console.log('User signed out');
            this.props.navigation.navigate('Login'); 
        })       
    }

    getImage(uid) {
        // 일단 로고만 불러옴
        let imageRef = storage().ref('userImages/'+uid);
        
        imageRef.getDownloadURL()
        .then((url) => {
            // 카페 아이디, 정보, UID, 이미지 URL 과 함께 카페데이터 화면으로 이동
            this.setState({image: url});
            console.log('image success');
        }).catch((e)=>{
            // 이미지 URL을 불러오지 못해서 제외하고 카페데이터 화면으로 이동
            console.log(e);
        });
    }
    
    constructor(props) {
        super(props);
        this.checkLogin();
    }
    
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          this.checkLogin();
        });
    }
      
    componentWillUnmount() {
        this._unsubscribe();
    }
    
    render () {
        return (
            <View style={styles.container}>            
                <View style={styles.topView}>
                    <Image
                        source={{uri: this.state.image ? this.state.image: null}}
                        style={{width:80, height: 80, borderRadius: 80 /2}}
                        
                    />
                    <View style={{marginHorizontal: 7, flexDirection:'column'}}>
                    <Text style={styles.baseText}>이메일:   {this.state.myEmail}</Text>
                    <Text style={styles.baseText}>이름:      {this.state.myName}</Text>
                    <Text style={styles.baseText}>번호:      {this.state.myNum}</Text>
                    </View>
                    
                
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.BtnTheme}>
                        <Text>즐겨찾는 카페</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnTheme}
                    // onPress = {()=>{
                    //     this.props.navigation.navigate('Search');
                    // }}
                    >
                        <Text>쿠폰 내역</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnTheme}
                    onPress = {()=>{
                        this.props.navigation.navigate('EditProfile', {uid:this.state.myUID, email:this.state.myEmail, name:this.state.myName, num:this.state.myNum});
                    }}
                    >
                        <Text>프로필 편집</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BtnTheme_2}
                        onPress={()=>{
                            this.signOut();                           
                          }}
                    >
                        <Text style={{color:'blue'}}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6E6E6",
    },
    topView:{
        height:'30%',
        backgroundColor: "#E6E6E6",
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30
        
    },
    bottomView: {
        height:'70%',
        backgroundColor: 'white',
        alignItems:"center",
    //   justifyContent:"center",
    },
    baseText: {
        // fontFamily: "Cochin",
        marginBottom: 5,
        fontSize: 15

    },
    
    BtnTheme:{
      width:"90%",
      backgroundColor:"#F2F2F2",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:15,
      marginBottom:10
    },
    BtnTheme_2:{
        width:"90%",
        backgroundColor:"#F2F2F2",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:15,
        marginBottom:10
      }
      
  })

export default TabUserScreen;