import React, {useContext, useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';

import {
  FormButton,
  FormInput,
  SocialButton,
} from '../components'
import {rnSocialLogo,Shopcham_FINAL_CF} from '../assets'
import {Context as AuthContext} from '../context/AuthContext';

import firebaseAuth, { firebase } from '@react-native-firebase/auth'
import{GoogleSignin}from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import db from '../db/firestore'


const FirebaseLoginScreen = ({navigation,route}) => {
  const {phoneLogin2} = useContext(AuthContext);
  const [phoneNumber,setPhoneNumber]= useState();
  const [objPhoneConfirm, setObjPhoneConfirm] = useState(null);
  const [otp, setOtp] = useState(null);

  // useEffect(()=>{
  //   GoogleSignin.configure({
  //     webClientId:'107386561764-3u4ugc5rbm88bhl8h32eqhrcko7tru95.apps.googleusercontent.com',
  //   })
  // },[])

  // useEffect(()=>{
  //   firebaseAuth().onAuthStateChanged(user => {

  //     // alert('yyyyyyyd')
  //   })
  // },[])



  const logInStatus = async () => {
    try{
      console.log('current user:'+firebaseAuth().currentUser.uid)
      alert('current user:'+firebaseAuth().currentUser.uid)
    }catch(err){
      alert(err.message)
    }

  }


  const googleLogin = async () => {
    try{
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = await firebaseAuth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      const objAuth = await firebaseAuth().signInWithCredential(googleCredential);

      return objAuth
    }catch(err){
      alert('error messsage')
      // alert(JSON.stringify(err))
      console.log(err)
    }
  }


  const fbLogin = async () => {
    try{
        // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      console.log('result')
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      console.log(data)
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = firebaseAuth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      return firebaseAuth().signInWithCredential(facebookCredential);

    }catch(err){
      console.log({err})
    }
  }


  const signOut = async () => {
    return await firebaseAuth().signOut();
  }

  const checkPhoneNumber = () => {
    if(phoneNumber.length != 10){
      alert('กรุณากรอกหมายเลขโทรศัพท์มือถือให้พอดี 10 หลัก')
      return 
  } else if(phoneNumber.substring(0,1) != '0' ){
      alert('กรุณาให้เลขหลักแรกโทรศัพท์เป็น 0')
      return 
  } else {
    db.collection('shop').where("tel","==",phoneNumber).get().then((qsnapshot) => {
      if (qsnapshot.docs.length > 0) {
          phoneLogin2(phoneNumber),navigation.navigate('FirebaseOtpVerifyScreen')
      } else {
        alert('กรุณาลงทะเบียน เพื่อเข้าใช้งานระบบ')
      }
    
    })
    
  }


  }

 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={Shopcham_FINAL_CF}
        style={styles.logo}
      />
      <View style ={{margin:10}}/>
      <Text style={styles.text}>กรุณากรอกเบอร์มือถือ</Text>


      {Platform.OS === 'android' ? (
        <View>
          <FormInput
            labelValue={phoneNumber}
            onChangeText={(userPhone) => setPhoneNumber(userPhone)}
            placeholderText="Phone Number"
            iconType="phone"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <SocialButton
            buttonTitle="ต่อไป"
            btnType="phone"
            color="#99C937"
            backgroundColor="#E0F6B4"
            onPress={checkPhoneNumber}
          />
          {/* <TouchableOpacity 
          onPress={()=>{phoneLogin2(phoneNumber).then(res=>navigation.navigate('FirebaseOtpVerifyScreen')).catch(err=>alert('fell'))}}
          style={{width:200,alignSelf:'center',padding:10,justifyContent:'center',alignItems:'center',borderRadius:30,backgroundColor:Colors.primaryColor}} >
            <Text style={{fontSize:18,fontWeight:'bold',color:'white'}} >ต่อไป</Text>
          </TouchableOpacity> */}

          {/* -------------- End of Phone Authen --------------*/}

{/*           <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={()=> fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={()=>{googleLogin()}}
          />

          <SocialButton
            buttonTitle="Show Auth Status"
            color="#f2da6d"
            backgroundColor="#a0b0a4"
            onPress={() => logInStatus()}
          />

          <SocialButton
            buttonTitle="Sign Out"
            color="#f2da6d"
            backgroundColor="#a0b0a4"
            onPress={() => signOut()}
          /> */}

        </View>
      ) : null}

    </ScrollView>
  );
};

export default FirebaseLoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    //fontFamily: 'Kufam-SemiBoldItalic', //now can't use font ,It's bug.
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    // fontFamily: 'Lato-Regular', //now can't use font ,It's bug.
  },
});