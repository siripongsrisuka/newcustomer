import React, {useContext, useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  TextInput
} from 'react-native';

import {Context as AuthContext} from '../context/AuthContext';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import db from '../../db/firestore'
import Province from '../Data/Province';
import Amphure from "../Data/Amphure";
import tombon2 from '../Data/Tombon2'
import DropDownPicker from 'react-native-dropdown-picker';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import { FontAwesome5, Ionicons ,AntDesign} from '@expo/vector-icons'; 


const RegisterForm2 = ({navigation,route}) => {
  const {phoneLogin2} = useContext(AuthContext);
  const [address, setAddress] = useState('');
  const {phoneNumber} = route.params

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

  // Province Setting
  let ProvinceDropDown = []
  Province.forEach(data => {
        let newArray = {
            label: data.name_th,
            value: data.id
        }
        ProvinceDropDown.push(newArray)
    });
    const [openProvince, setOpenProvince] = useState(false);
    const [valueProvince, setValueProvince] = useState(null);
    const [itemProvince, setItemProvince] = useState(ProvinceDropDown);

    //Amohure Setting
    let AmphureDropDown = []
    useEffect(() => {
        const test = () => {
            let AmphureFilter = Amphure.filter((item) => {
                return item.province_id == valueProvince
            })
          
            AmphureFilter.forEach(data => {
                let newArray = {
                    label: data.name_th,
                    value: data.name_th
                }
                AmphureDropDown.push(newArray)
            })
            setItemAmphure(AmphureDropDown)
        }
        test()
    },[valueProvince])    
    
    const [openAmphure, setOpenAmphure] = useState(false);
    const [valueAmphure, setValueAmphure] = useState(null);
    const [itemAmphure, setItemAmphure] = useState([]); 

//Setting Tombon

    let TombinDropDown = []
    const [openTombon, setOpenTombob] = useState(false);
    const [valueTombon, setValueTombon] = useState('');
    const [itemTombon, setItemTombon] = useState([]);

    useEffect(() => {
        const test = () => {
            let TombonFilter = tombon2.filter((item) => {
                return item.amphoe == valueAmphure
            })
            
            TombonFilter.forEach(data => {
                let newArray = {
                    label: data.district,
                    value: [data.district,data.zipcode]
                }
                TombinDropDown.push(newArray)
            })
            setItemTombon(TombinDropDown)    
        }
        test()
    },[valueAmphure,valueProvince])   

    DropDownPicker.setListMode("MODAL");

  return (
    <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'space-between',alignItems:'center'}}  >
        <Image 
            style={{width:Dimensions.Width/1.5,height:Dimensions.Width/1.5,margin:10}}
            source={{uri:"https://ขนส่งราคาถูก.com/wp-content/uploads/2019/08/%E0%B8%9B%E0%B8%81%E0%B8%A3%E0%B8%96%E0%B8%82%E0%B8%99%E0%B8%AA%E0%B9%88%E0%B8%87-1.jpg"}} 
        />

        <View style={styles.card} >
            <Text style={{fontSize:18}} >ตั้งค่าที่อยู่สำหรับจัดส่งสินค้า</Text>
            <View style={{height:100,width:Dimensions.Width/1.2,margin:10,borderBottomWidth:1,borderColor:Colors.InputColor}} >
                <TextInput
                    placeholder='กรอกที่ตั้งร้านค้า เช่น ห้อง 201/10 คอนโดชอบชำ ถนนเพชรบุรี เขตถนนเพชรบุรี เขตราชเทวี กรุงเทพมหานคร 10140'
                    multiline={true}
                    value={address}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={200}
                    onChangeText={setAddress}
                    style ={{flex:1}}
                /> 
            </View>
            <View style={{width:'100%',margin:5}} >
                <DropDownPicker
                    searchable={true}
                    searchPlaceholder="ค้นหาจังหวัด..."
                    open={openProvince}
                    value={valueProvince}
                    items={itemProvince}
                    setOpen={setOpenProvince}
                    setValue={setValueProvince}
                    setItems={setItemProvince}
                    placeholder="กรุณาเลือกจังหวัด"
                    modalProps={{
                        animationType: "fade"
                    }}
                />
            </View>

            <View style={{width:'100%',margin:5}} >
                <DropDownPicker
                    searchable={true}
                    searchPlaceholder="ค้นหาอำเภอ..."
                    open={openAmphure}
                    value={valueAmphure}
                    items={itemAmphure}
                    setOpen={setOpenAmphure}
                    setValue={setValueAmphure}
                    setItems={setItemAmphure}
                    placeholder="กรุณาเลือกอำเภอ"
                    modalProps={{
                        animationType: "fade"
                        }}
                />
            </View>

            <View style={{width:'100%',margin:5}} >
                <DropDownPicker
                    searchable={true}
                    searchPlaceholder="ค้นหาตำบล..."
                    open={openTombon}
                    value={valueTombon}
                    items={itemTombon}
                    setOpen={setOpenTombob}
                    setValue={setValueTombon}
                    setItems={setItemTombon}
                    placeholder="กรุณาเลือกตำบล"
                    modalProps={{
                        animationType: "fade"
                    }}
                />
            </View>
            {valueTombon[1] !== undefined && (<Text>รหัสไปรษณีย์ : {valueTombon[1]}</Text>)}
            
            <TouchableOpacity style={styles.touch} onPress={checkData}  >
                <Text style={{fontSize:24,fontWeight:'bold',color:'white'}} >ต่อไป   </Text>
                <AntDesign name='arrowright' size={25} color="white" />
            </TouchableOpacity>
        </View>
    </View>
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