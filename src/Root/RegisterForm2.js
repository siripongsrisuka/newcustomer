import React, {useContext, useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  ImageBackground
} from 'react-native';
import Fonts from '../constants/Fonts';

import { AuthContext,CustomerLoginContext } from '../context';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import db from '../../db/firestore'
import {AntDesign} from '@expo/vector-icons'; 


const RegisterForm2 = ({navigation,route}) => {
  const {state: {registerData},updateRegisterData} = useContext(AuthContext);
  const {state:customerLogin} = useContext(CustomerLoginContext)
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState()
  const [phoneNumber,setPhoneNumber]= useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [approve, setApprove] = useState(false)
  const picture = () =>{
    let res = customerLogin.filter((a) =>{return(a.id == 'register2')})
    return res
  }
  const condition = () =>{
    let res = customerLogin.filter((a) =>{return(a.id == 'condition')})
    return res
  }

  const checkData = () => {
    if(address == ''){
        alert('กรุณาใส่ที่อยู่ร้านค้า')
    }  else if(approve == false){
        setModalVisible(true)
    }
    else {
        checkPhoneNumber()
    }   
  }

  const checkPhoneNumber = () => {
    if(phoneNumber == ''){
      alert('กรุณากรอกหมายเลขโทรศัพท์มือถือ')
      return 
    } else if(phoneNumber.length != 10){
      alert('กรุณากรอกหมายเลขโทรศัพท์มือถือให้พอดี 10 หลัก')
    } else if(phoneNumber.substring(0,1) != '0' ){
      alert('กรุณาให้เลขหลักแรกโทรศัพท์เป็น 0')
      return 
    } else {
        db.collection('customer').where("tel","==",phoneNumber).get().then((qsnapshot) => {
            if (qsnapshot.docs.length > 0) {
              alert('เบอร์นี้ ถูกใช้ลงทะเบียนแล้ว กรุณาเข้าสู่ระบบ')
            } else {
                registerData.address = address
                registerData.phoneNumber = phoneNumber
                updateRegisterData(registerData)
                navigation.navigate('FirebaseOtpVerifyScreen',{phone:phoneNumber})
            }
          })
    }
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1,alignItems:'center',backgroundColor:'white'}} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator ={false}>
       
        <ImageBackground style={{width:Dimensions.Width,height:Dimensions.Height}} source={{uri:picture()[0]?.uri}} >
          <View style={{flex:1,alignItems:'center',justifyContent:'flex-end'}} >
            <View style={styles.card} >
              <Text style={Fonts.md} >ตั้งค่าที่อยู่สำหรับจัดส่งของรางวัล</Text>
              <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}}  >
                <TextInput
                    placeholder='ที่อยู่*'
                    value={address}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={30}
                    onChangeText={setAddress}
                    style={{...Fonts.md}}
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
                    style={{...Fonts.md}}
                />
              </View>
                
              <View style={{height:50,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}}>
                <TextInput
                    placeholder='กรอกเบอร์โทรศพท์'
                    value={phoneNumber}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={10}
                    onChangeText={setPhoneNumber}
                    keyboardType='phone-pad'
                    style={{...Fonts.md}}
                />
              </View>
              
              
              <TouchableOpacity onPress={() =>{setModalVisible(true)}} >
                  <Text style={{...Fonts.md,...{textDecorationLine:'underline'}}}>ข้อตกลง/เงื่อนไขในการใช้บริการ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touch} onPress={checkData}  >
                  <Text style={{...Fonts.lgwb}} >ต่อไป   </Text>
                  <AntDesign name='arrowright' size={25} color="white" />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
              >
                <TouchableOpacity 
                    style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center'}} 
                    activeOpacity={1} 
                    onPress={() => {setModalVisible(false)}}
                >
                    <TouchableWithoutFeedback>
                      <View style={{height:'70%',margin:20}} >
                        <ScrollView contentContainerStyle={{backgroundColor: "white",alignSelf:'center',padding:20,alignItems:'center'}}>
                          <View onStartShouldSetResponder={()  => true}>
                            <Text style={Fonts.md}>{condition()[0]?.text}</Text>
                          </View>
                        </ScrollView>
                        <TouchableOpacity onPress={() =>{setModalVisible(false),setApprove(true)}} style={{backgroundColor:'#29bd04',height:40,justifyContent:'center',alignItems:'center'}} >
                          <Text style={Fonts.smw}>ยอมรับเงื่อนไข</Text>
                        </TouchableOpacity>
                      </View>   
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>
        </ImageBackground>
        
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
    modalView: {
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:'100%',
        height:'100%'
      },

});