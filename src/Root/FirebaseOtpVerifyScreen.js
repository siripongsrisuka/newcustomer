import React, {useContext, useState,useEffect,useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler'

import {Context as AuthContext} from '../context/AuthContext';



const FirebaseOtpVerifyScreen = ({navigation,route}) => {
  const {state:{objPhoneConfirm},confirmOtp2} = useContext(AuthContext);
  let textInput = useRef(null)
  const lengthInput = 6

  const [internalVal,setInternalVal] = useState("");

  // useEffect(() => {
  //   console.log(objPhoneConfirm)
  // },[])


  const onChangeText = (val) => {
    setInternalVal(val)
    if(val.length === lengthInput){
      confirmOtp2(objPhoneConfirm,val)
    }
  }



  useEffect(() => {
    textInput.focus()

    return ()=>{
      textInput.current = false
    }
  },[])

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoiddingView}
      >
        <Text style={styles.textTitle}>กรอกหมายเลข OTP ที่ได้รับจาก SMS</Text>
        <View>
          <TextInput
            ref={(input) => textInput = input}
            onChangeText={onChangeText}
            style={{width:0,height:0}}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
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
        

        <View style={styles.bottomView}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('FirebaseLoginScreen')}> */}
            <TouchableOpacity onPress={() => {} }>
              <View style={styles.btnChangeNumber}>
                <Text style={styles.textChange}>เปลี่ยนเบอร์</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('FirebaseLoginScreen')}> */}
            <TouchableOpacity onPress={() => {} }>
              <View style={styles.btnResend}>
                <Text style={styles.textResend}>ขอ OTP ใหม่อีกครั้ง</Text>
              </View>
            </TouchableOpacity>
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
  }
});