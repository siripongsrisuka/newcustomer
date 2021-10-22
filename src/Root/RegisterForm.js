import React, {useContext, useState} from 'react';
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
import {AntDesign} from '@expo/vector-icons'; 
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import db from '../../db/firestore'
import { AuthContext } from '../context';

const RegisterForm = ({navigation,route}) => {
  const {phoneLogin2} = useContext(AuthContext);
  const [phoneNumber,setPhoneNumber]= useState('');
  const [storeName,setStoreName] = useState('');
  const [storeOnwerName,setStoreOnwerName] = useState('');
  const [storeOnwerSurname,setStoreOnwerSurname] = useState('');

  const checkData = () => {
    // if(storeOnwerName == ''){
    //   alert('กรุณาใส่ชื่อ')
    // } else if(storeOnwerSurname == ''){
    //   alert('กรุณาใส่นามสกุล')
    // } else if(storeName == ''){
    //   alert('กรุณาใส่ชื่อร้านค้า')
    // } else {
    //   checkPhoneNumber()
    // }


    checkPhoneNumber()
  }

  const checkPhoneNumber = () => {
    // navigation.navigate('RegisterForm2',{phoneNumber:phoneNumber}) 
    phoneLogin2(phoneNumber)
    navigation.navigate('FirebaseOtpVerifyScreen')

/*     if(phoneNumber == ''){
      alert('กรุณากรอกหมายเลขโทรศัพท์มือถือ')
      return 
    } else if(phoneNumber.length != 10){
      alert('กรุณากรอกหมายเลขโทรศัพท์มือถือให้พอดี 10 หลัก')
    } else if(phoneNumber.substring(0,1) != '0' ){
      alert('กรุณาให้เลขหลักแรกโทรศัพท์เป็น 0')
      return 
    } else {
        navigation.navigate('RegisterForm2',{phoneNumber:phoneNumber}) 
        db.collection('shop').where("tel","==",phoneNumber).get().then((qsnapshot) => {
          if (qsnapshot.docs.length > 0) {
            alert('เบอร์นี้ ถูกใช้ลงทะเบียนแล้ว กรุณาเข้าสู่ระบบ')
          } else {
            navigation.navigate('RegisterForm2',{phoneNumber:phoneNumber}) 
          }
        })
    } */


  }

 

  return (
    <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'space-between',alignItems:'center'}}  >
        <View >
          <Image source={require('../../image/firstPost.jpg')} style={{width:Dimensions.Width,height:Dimensions.Width/1.5}} resizeMode='stretch' />
          
        </View>
        <View style={{alignItems:'center'}} >
          <Text style={{fontSize:18,fontWeight:'bold'}} >สร้างบัญชี</Text>
          <Text>1/3</Text>
        </View>
        
        <View style={styles.card} >
        <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}}  >
            <TextInput
                placeholder='ชื่อ '
                value={storeOnwerName}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={30}
                onChangeText={setStoreOnwerName}
            />
        </View>
        <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}}  >
            <TextInput
                placeholder='นามสกุล'
                value={storeOnwerSurname}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={30}
                onChangeText={setStoreOnwerSurname}
            />
        </View>

        <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}} >
            <TextInput
                placeholder=' กรอกชื่อร้านค้า'
                value={storeName}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={60}
                onChangeText={setStoreName}
            />
        </View>

        <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}}>
            <TextInput
                placeholder='กรอกเบอร์โทรศพท์'
                value={String(phoneNumber)}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={10}
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
            />
        </View>
        <TouchableOpacity style={styles.touch} onPress={checkData} >
            <Text style={{fontSize:24,fontWeight:'bold',color:'white'}} >ต่อไป   </Text>
            <AntDesign name='arrowright' size={25} color="white" />
        </TouchableOpacity>

        </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
    touch : {
        width:Dimensions.Width/2,
        alignItems:'center',
        backgroundColor:Colors.primaryColor,
        height:80,
        borderRadius:8,
        justifyContent:'center'
    },

    text: {
    //fontFamily: 'Kufam-SemiBoldItalic', //now can't use font ,It's bug.
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    borderTopRightRadius:8,
    borderTopLeftRadius:8
  },
  touch : {
    width:Dimensions.Width/1.2,
    alignItems:'center',
    backgroundColor:Colors.primaryColor,
    height:50,
    borderRadius:30,
    justifyContent:'center',
    flexDirection:'row'
},

});