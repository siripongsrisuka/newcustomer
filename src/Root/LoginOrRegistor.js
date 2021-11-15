import React, {useContext, useState,useEffect} from 'react';
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

const LoginOrRegistor = ({navigation}) => {
  const [phone, setPhone] = useState("");

  const checkPhoneNumber = () => {
    if(phone.length != 10){
      alert('กรุณากรอกหมายเลขโทรศัพท์มือถือให้พอดี 10 หลัก')
      return 
    } else if(phone.substring(0,1) != '0' ){
      alert('กรุณาให้เลขหลักแรกโทรศัพท์เป็น 0')
      return 
    } else {
        navigation.navigate('FirebaseOtpVerifyScreen',{phone:phone})
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