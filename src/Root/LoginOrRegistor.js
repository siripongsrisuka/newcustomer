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
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import db from '../../db/firestore'
import { AuthContext } from '../context';


const LoginOrRegistor = ({navigation,route}) => {
  const {phoneLogin2} = useContext(AuthContext);
  const [phoneNumber,setPhoneNumber]= useState();
  const [objPhoneConfirm, setObjPhoneConfirm] = useState(null);
  const [otp, setOtp] = useState(null);
  const [phone, setPhone] = useState();
  const checkPhoneNumber = () => {
    if(phone.length != 10){
      alert('กรุณากรอกหมายเลขโทรศัพท์มือถือให้พอดี 10 หลัก')
      return 
    } else if(phone.substring(0,1) != '0' ){
      alert('กรุณาให้เลขหลักแรกโทรศัพท์เป็น 0')
      return 
    } else {
        phoneLogin2(phone),navigation.navigate('FirebaseOtpVerifyScreen')

/*         db.collection('shop').where("tel","==",phone).get().then((qsnapshot) => {
          if (qsnapshot.docs.length > 0) {
              phoneLogin2(phone),navigation.navigate('FirebaseOtpVerifyScreen')
          } else {
            alert('กรุณาสมัครสมาชิก เพื่อเข้าใช้งานระบบ')
          }
        }) */
    }
  }

  return (
    <View style={{flex:1,backgroundColor:'white',alignItems:'center'}}  >
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
                style={{margin:10,borderRadius:30,fontSize:18,backgroundColor:Colors.InputColor,width:Dimensions.Width/1.2,alignItems:'center'}}
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