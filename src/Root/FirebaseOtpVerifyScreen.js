import React, {useContext, useState,useEffect,useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,TextInput
} from 'react-native';
// import {TextInput} from 'react-native-gesture-handler'

import {Context as AuthContext} from '../context/AuthContext';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner, FirebaseRecaptcha } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase'


const FirebaseOtpVerifyScreen = ({navigation,route}) => {
  const {state:{recaptchaVerifier,objPhoneConfirm,registerData},recapchaVerify,phoneLogin2,tryExpoFirebaseOtp} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  let textInput = useRef(null)
  const lengthInput = 6

  const [internalVal,setInternalVal] = useState("");
  
  const {phone} = route.params
  const recapchaRef = useRef(null);
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const attemptInvisibleVerification = true;
  console.log(registerData)
  useEffect(()=>{
    setTimeout(()=>{phoneLogin2(phone,recapchaRef.current)},2000)
    setTimeout(()=>{textInput.focus()},3000)   // some trick to let auto focus work, wait little for webview of invisible recapcha accomplish then do the auto focus

  },[])

  useEffect(() => {
    let isCancelled = false;
    if(objPhoneConfirm !== null){
      if(!isCancelled){
        setModalVisible(false)
        onChangeText(internalVal)
      }
    }

    return () => {
      isCancelled = true;
    };
  },[objPhoneConfirm])


  const onChangeText = (val) => {
    setInternalVal(val)
    if(val.length === lengthInput){
      if(objPhoneConfirm == null){
        setModalVisible(true)
      } else {
        tryExpoFirebaseOtp(objPhoneConfirm,val,address=registerData.address,birthday=registerData.birthDay,customerName=registerData.customerName,email=registerData.email,tel=registerData.phoneNumber,gender=registerData.gender)
      }
      
    } 
  }


  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recapchaRef}
        firebaseConfig={firebase.app().options}
        androidHardwareAccelerationDisabled   // Prevent app cashed from this RECAPCHA webview , Boolean value to disable Hardware Acceleration in the WebView, https://github.com/expo/expo/issues/11256
        attemptInvisibleVerification={attemptInvisibleVerification}
      /> 
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style = {{height:200,width:Dimensions.Width}} >
              <PacmanIndicator color= {Colors.primaryColor} size = {60} />
          </View>
          <Text style={{fontSize:24}} >กรุณารอซักครู่ กำลังเข้าสู่ระบบ</Text>
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoiddingView}
      >
        <Text style={styles.textTitle}>กรอกหมายเลข OTP ที่ได้รับจาก SMS</Text>
        <View>
          <View style={{position:'absolute',marginBottom:0}} > 
          <TextInput
            ref={(input) => textInput = input}
            onChangeText={onChangeText}
            style={{width:300,height:100,backgroundColor:'red'}}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
          </View>
          
          <View style={styles.containerInput}>
            {
              Array(lengthInput).fill().map((data,index) => (
                <View 
                  key={index}
                  style={[
                    styles.cellView,
                    {
                      borderBottomColor:index === internalVal.length ? '#FB6C6A':'#234DB7'
                    }
                  ]}>
                  <Text 
                    style={styles.cellText}
                    onPress={() => textInput.focus()}
                  >
                    {internalVal && internalVal.length >0 ? internalVal[index]:""}
                  </Text>
                </View>
              ))
            }
          </View>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
};

export default FirebaseOtpVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  containerAvoiddingView:{
    flex:1,
    alignItems:'center',
    padding:10
  },
  textTitle:{
    marginTop:50,
    marginBottom:50,
    fontSize:16
  },
  containerInput:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  cellView:{
    paddingVertical:11,
    width:40,
    margin:5,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1.5
  },
  cellText:{
    textAlign:'center',
    fontSize:16
  },
  bottomView:{
    flexDirection:'row',
    flex:1,
    // justifyContent:'flex-end',
    marginBottom:50,
    alignItems:'flex-end',
    backgroundColor:'red'
  },
  btnChangeNumber:{
    width:150,
    height:50,
    borderRadius:10,
    alignItems:'flex-start',
    justifyContent:'center'
  },
  textChange:{
    color:'#234DB7',
    alignItems:'center',
    fontSize:15
  },
  btnResend:{
    width:150,
    height:50,
    borderRadius:10,
    alignItems:'flex-end',
    justifyContent:'center'
  },
  textResend:{
    alignItems:'center',
    fontSize:15
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
});