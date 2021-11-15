import React, {useContext, useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';

import {Context as AuthContext} from '../context/AuthContext';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import db from '../../db/firestore'
import { FontAwesome5, Ionicons ,AntDesign} from '@expo/vector-icons'; 


const RegisterForm2 = ({navigation,route}) => {
  const {phoneLogin2} = useContext(AuthContext);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState()

  const checkData = () => {
    if(address == ''){
        alert('กรุณาใส่ที่อยู่ร้านค้า')
    } else if(valueProvince == null){
        alert('กรุณาเลือกจังหวัด')
    } else if(valueAmphure == null){
        alert('กรุณาเลือกอำเภอ')
    } else if(valueTombon == ''){
        alert('กรุณาเลือกตำบล')
    } else {
        phoneLogin2(phoneNumber)
        navigation.navigate('FirebaseOtpVerifyScreen')
    }
    
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1,alignItems:'center'}} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator ={false}>
        <Image 
            style={{width:Dimensions.Width,height:Dimensions.Width}} resizeMode='stretch'
            source={{uri:"https://ขนส่งราคาถูก.com/wp-content/uploads/2019/08/%E0%B8%9B%E0%B8%81%E0%B8%A3%E0%B8%96%E0%B8%82%E0%B8%99%E0%B8%AA%E0%B9%88%E0%B8%87-1.jpg"}} 
        />
        <View style={{alignItems:'center'}} >
          <Text style={{fontSize:18,fontWeight:'bold'}} >สร้างบัญชี</Text>
          <Text>2/2</Text>
        </View>
        <View style={styles.card} >
            <Text style={{fontSize:18}} >ตั้งค่าที่อยู่สำหรับจัดส่งของรางวัล</Text>
            <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}}  >
            <TextInput
                placeholder='ที่อยู่*'
                value={address}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={30}
                onChangeText={setAddress}
            />
            </View>
            <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}}  >
                <TextInput
                    placeholder='email'
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={30}
                    onChangeText={setEmail}
                />
            </View>
            <View style={{height:50}}>
                <Text>ข้อตกลง/เงื่อนไขในการใช้บริการ</Text>
            </View>
            <TouchableOpacity style={styles.touch} onPress={checkData}  >
                <Text style={{fontSize:24,fontWeight:'bold',color:'white'}} >ต่อไป   </Text>
                <AntDesign name='arrowright' size={25} color="white" />
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default RegisterForm2;

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
    touch : {
        width:Dimensions.Width/1.2,
        alignItems:'center',
        backgroundColor:Colors.primaryColor,
        height:50,
        borderRadius:30,
        justifyContent:'center',
        flexDirection:'row',
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

});