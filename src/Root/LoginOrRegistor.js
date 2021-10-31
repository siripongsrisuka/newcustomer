import React, {useContext, useState,useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import db from '../../db/firestore'
import { AuthContext } from '../context';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';


const LoginOrRegistor = ({navigation,route}) => {
  const {phoneLogin2} = useContext(AuthContext);
  const [phoneNumber,setPhoneNumber]= useState();
  const recaptchaVerifier = useRef(null);
  const [objPhoneConfirm, setObjPhoneConfirm] = useState(null);
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === 'web'
      ? {
          text:
            'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
        }
      : undefined
  );
  // const attemptInvisibleVerification = false;
  const attemptInvisibleVerification = true;
  const [otp, setOtp] = useState(null);
  const [phone, setPhone] = useState("");

  const checkPhoneNumber = () => {
    if(phone.length != 10){
      alert('กรุณากรอกหมายเลขโทรศัพท์มือถือให้พอดี 10 หลัก')
      return 
    } else if(phone.substring(0,1) != '0' ){
      alert('กรุณาให้เลขหลักแรกโทรศัพท์เป็น 0')
      return 
    } else {
        phoneLogin2(phone,recaptchaVerifier.current)
        navigation.navigate('FirebaseOtpVerifyScreen')

/*         db.collection('customer').where("tel","==",phone).get().then((qsnapshot) => {
          if (qsnapshot.docs.length > 0) {
            try {
              const thGlobalPhoneNum = '+66' + phone.substring(1)
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              const verificationId = phoneProvider.verifyPhoneNumber(
                thGlobalPhoneNum,
                recaptchaVerifier.current
              );
              // setVerificationId(verificationId);
              alert(verificationId)
              // navigation.navigate('FirebaseOtpVerifyScreen',{verificationId:verificationId})
              // showMessage({
              //   text: 'Verification code has been sent to your phone.',
              // });
            } catch (err) {
              alert({ text: `Error: ${err.message}`, color: 'red' });
            }
              
          } else {
            alert('กรุณาสมัครสมาชิก เพื่อเข้าใช้งานระบบ')
          }
        }) */
    }
  }

  // const active = () => {

  // }
  // const checkPhoneNumber = () => {
  //   phoneLogin2(phone),navigation.navigate('aa')
  // }

  return (
    <View style={{flex:1,backgroundColor:'white',alignItems:'center'}}  >
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />
        <Image source={require('../../image/coverphoto.jpg')} style={{width:"100%",height:300,borderWidth:3}} resizeMode='contain' />
        
        {Platform.OS === 'android' ? (
        <View>
          <TextInput
                placeholder='กรอกเบอร์โทรศัพท์'
                value={phone}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={10}
                onChangeText={setPhone}
                keyboardType='phone-pad'
                style={{margin:10,borderRadius:10,fontSize:18,backgroundColor:Colors.InputColor,width:Dimensions.Width/1.2,alignItems:'center',height:50}}
            />
        </View>
      ) : null}
        <TouchableOpacity style={styles.touch} onPress={checkPhoneNumber} >
            <Text style={{fontSize:24,fontWeight:'bold',color:'white'}} >เข้าสู่ระบบ</Text>
        </TouchableOpacity>
        <View style={{margin:2}} >
            <Text style={{fontSize:20}} >หรือ</Text>
        </View>
        {/* <TouchableOpacity 
            onPress={() => {navigation.navigate("RegisterForm")}}>
            <Text style={{fontSize:16,textDecorationLine:'underline',color:Colors.secondaryColor}} >สมัครสมาชิก</Text>
        </TouchableOpacity> */}
        <TouchableOpacity 
            onPress={() => {navigation.navigate("aa")}}>
            <Text style={{fontSize:16,textDecorationLine:'underline',color:Colors.secondaryColor}} >สมัครสมาชิก</Text>
        </TouchableOpacity>
    </View>
  );
};

export default LoginOrRegistor;

const styles = StyleSheet.create({
    touch : {
        width:Dimensions.Width/1.2,
        alignItems:'center',
        backgroundColor:Colors.primaryColor,
        height:50,
        borderRadius:30,
        justifyContent:'center'
    },

    text: {
    //fontFamily: 'Kufam-SemiBoldItalic', //now can't use font ,It's bug.
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },

});