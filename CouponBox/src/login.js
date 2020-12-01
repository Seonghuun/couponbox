
import 'react-native-gesture-handler';
import React, {Component} from 'react'; // 리액트라는 모듈에서 컴포넌트 클래스 임포트
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import Logo from '../assets/images/logo.png';
import auth from "@react-native-firebase/auth"

const fbAuth = auth();


class LoginScreen extends Component { //컴포넌트 상속하는 앱
  state = {
    idInput: '',
    pwInput: '',

  } 

  login() {
    
    if(!this.state.idInput){
      alert('이메일을 입력해주세요');
      return;
    }
    if(!this.state.pwInput){
      alert('비밀번호를 입력해주세요');
      return;
    }
    fbAuth
    .signInWithEmailAndPassword(this.state.idInput, this.state.pwInput)
    .then(() => {
      // alert('login success');
      this.props.navigation.navigate('Main'); 
      
      
    })
    .catch(error=> {
      alert('가입하지 않은 이메일이거나, 잘못된 비밀번호입니다.');
      // this.setState({idInput:''});
      this.setState({pwInput:''});
    });
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({idInput:''});
      this.setState({pwInput:''});
    });
  }
  
  componentWillUnmount() {
    this._unsubscribe();
  }
  

  render() { // 렌더링하는 함수
    return ( //화면 구성하는 것  
      
      <View style={styles.mainView}>
        <Image
          style={styles.image}
          source={Logo}
          resizeMode='contain'
        />
        <View style={styles.inputView}>
        <TextInput
                    value={this.state.idInput}
                    style={styles.input}
                    placeholder="E-MAIL" 
                    placeholderTextColor="#003f5c"
                    onChangeText={text=>this.setState({idInput:text})}
                     // 개행
                    maxLength={100}
                    autoCapitalize={'none'} //대문자 자동수정 안함
                    editable={true}
                    keyboardType='email-address'
                    
        />
        </View>
        <View style={styles.inputView}>
        
        <TextInput
                    value={this.state.pwInput}
                    style={styles.input}
                    placeholder="PASSWORD" 
                    placeholderTextColor="#003f5c"
                    onChangeText={text=>this.setState({pwInput:text})}
                    // 개행
                    maxLength={100}
                    autoCapitalize={'none'} //대문자 자동수정 안함
                    editable={true}
                    secureTextEntry={true}                    
                    
        />
        
        
        </View>
        
        <TouchableOpacity style={styles.loginBtn}
           onPress={()=>{
             this.login()
            
           }}
        >
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{
                this.props.navigation.navigate('Signup'), {fbAuth}
            }}
        >
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>       
        

      </View>
      
      
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1, // 차지하는 영역의 비율
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 50,
    alignItems: 'center', //수평 정렬
    // justifyContent: 'center' // 수직 정렬
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#f2f2f2',
    
    fontSize: 15,
    padding: 10
  },
  image: {
    width: '85%',
    height: 275
  },
  inputView:{
    width:"65%",
    backgroundColor:"#f2f2f2",
    borderRadius:25,
    height: 45,
    marginTop: 10,
    marginBottom:10,
    justifyContent:"center",
    padding:20,
    elevation: 5
  },
  
  loginBtn:{
    width:"65%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:20,
    elevation: 5
  }
    
})


export default LoginScreen;
