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
  const {state: {registerData},updateRegisterData } = useContext(AuthContext);
  const [customerName,setCustomerName] = useState('');
  const [birthDay,setBirthDay] = useState('');
  const [gender, setGender] = useState('')

  const checkData = () => {
    if(customerName == ''){
      alert('กรุณาใส่ชื่อ')
    } else if(birthDay == ''){
      alert('กรุณาวันเดือนปีเกิด')
    } else if(gender == ''){
      alert('กรุณาใส่เพศ')
    } else {
      registerData.customerName = customerName
      registerData.birthDay = birthDay
      registerData.gender = gender
      updateRegisterData(registerData)
      navigation.navigate('RegisterForm2') 
    }
  }


 

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1,alignItems:'center'}} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator ={false}>
        <View >
          <Image source={require('../../image/firstPost.jpg')} style={{width:Dimensions.Width,height:Dimensions.Width}} resizeMode='stretch' />
          
        </View>
        <View style={{alignItems:'center'}} >
          <Text style={{fontSize:18,fontWeight:'bold'}} >สร้างบัญชี</Text>
          <Text>1/2</Text>
        </View>
        
        <View style={styles.card} >
        <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}}  >
            <TextInput
                placeholder='ชื่อ '
                value={customerName}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={30}
                onChangeText={setCustomerName}
            />
        </View>
        <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}}  >
            <TextInput
                placeholder='วันเดือนปีเกิด เช่น 4 พฤษภาคม 1992'
                value={birthDay}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={30}
                onChangeText={setBirthDay}
            />
        </View>

        <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}} >
            <TextInput
                placeholder='เพศ'
                value={gender}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={60}
                onChangeText={setGender}
            />
        </View>
        <TouchableOpacity style={styles.touch} onPress={checkData} >
            <Text style={{fontSize:24,fontWeight:'bold',color:'white'}} >ต่อไป   </Text>
            <AntDesign name='arrowright' size={25} color="white" />
        </TouchableOpacity>

        </View>
    </ScrollView>
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