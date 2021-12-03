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
  Button,
  Modal
} from 'react-native';
import {AntDesign} from '@expo/vector-icons'; 
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import db from '../../db/firestore'
import { AuthContext,CustomerLoginContext } from '../context';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import DateTimePicker from '@react-native-community/datetimepicker';
import { stringDateTime2 } from '../Utility/dateTime';

const RegisterForm = ({navigation,route}) => {
  const {state: {registerData},updateRegisterData } = useContext(AuthContext);
  const {state:customerLogin} = useContext(CustomerLoginContext)
  const [customerName,setCustomerName] = useState('');
  const [gender, setGender] = useState('')
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const picture = () =>{
    let res = customerLogin.filter((a) =>{return(a.id == 'register')})
    return res
  }

  const checkData = () => {
    if(customerName == ''){
      alert('กรุณาใส่ชื่อ')
    } else if(date.getDate() == new Date().getDate()){
      alert('กรุณาวันเดือนปีเกิด')
    } else if(gender == ''){
      alert('กรุณาใส่เพศ')
    } else {
      registerData.customerName = customerName
      registerData.birthDay = date
      registerData.gender = gender
      updateRegisterData(registerData)
      navigation.navigate('RegisterForm2') 
    }
  }

  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };


  return (
    <ScrollView contentContainerStyle={{flexGrow: 1,alignItems:'center',backgroundColor:'white'}} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator ={false}>
        <View >
          <Image source={{uri:picture()[0]?.uri}} style={{width:Dimensions.Width,height:Dimensions.Width}} resizeMode='stretch' />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        
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
        <TouchableOpacity onPress={() =>{setShow(true)}} style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor,flexDirection:'row',alignItems:'center'}}  >
            <Text>วันเดือนปีเกิด : </Text>
            {date.getDate() !== new Date().getDate() && (
              <Text>{stringDateTime2(date)}</Text>
            )}
            
            {/* <TextInput
                placeholder='วันเดือนปีเกิด เช่น 4 พฤษภาคม 1992'
                value={birthDay}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={30}
                onChangeText={setBirthDay}
            /> */}
        </TouchableOpacity>

        <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor,flexDirection:'row',alignItems:'center'}} >
            <Text>เพศ :</Text>
            <RadioButtonGroup
              containerStyle={{ flexDirection:'row',padding:10,width:'50%',justifyContent:'space-between' }}
              selected={gender}
              onSelected={(value) => setGender(value)}
              radioBackground="#faa550"
            >
              <RadioButtonItem value="test2" label="ชาย" />
              <RadioButtonItem
                value="test"
                label='หญิง'
              />
            </RadioButtonGroup>
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