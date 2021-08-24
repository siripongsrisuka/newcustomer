import React, {useState, useEffect, useContext} from "react";
import { Text, StyleSheet, View, TextInput,TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import Colors from "../constants/Colors";
import db, {getCustomerProfile } from "../../db/firestore";
import {Context as CustomerProfileContext} from '../context/CustomerProfileContext'


const  ProfileScreen = () => {
    const {state : {customerProfile}}= useContext(CustomerProfileContext)
    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [imageId, setImageId] = useState('');
    const [detail, setDetail] = useState('');
    const [tel, setTel] = useState('');
    const [address, setAddress] = useState('');
    const [tombon, setTombon] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [state, setState] = useState('');
    const [postcode, setPostcode] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [birthday, setBirthday] = useState('');
    const [editable, setEditable] = useState(false)

    useEffect(() => {
        setCustomerName(customerProfile[0].customerName);
        setEmail(customerProfile[0].email);
        setImageId(customerProfile[0].imageId);
        setDetail(customerProfile[0].detail);
        setTel(customerProfile[0].tel);
        setAddress(customerProfile[0].address);
        setTombon(customerProfile[0].tambon);
        setDistrict(customerProfile[0].district);
        setProvince(customerProfile[0].province);
        setState(customerProfile[0].state);
        setPostcode(customerProfile[0].postcode);
        setLatitude(customerProfile[0].latitude);
        setLongitude(customerProfile[0].longitude);
        setBirthday(customerProfile[0].birthday);
    },[]);

    const customerUpdate = () => {
        console.log(customerProfile[0].customerId)
        db.collection('customer').doc(customerProfile[0].customerId).update({
            customerName:customerName,
            email:email,
            imageId:imageId,
            detail:detail,
            tel:tel,
            address:address,
            tambon:tombon,
            district:district,
            province:province,
            state:state,
            postcode:postcode,
            latitude:latitude,
            longitude:longitude,
            birthday:birthday,
        }).catch(err => console.log(err))
        setEditable(false)
    }


    return (
        <View style = {{flex:1}} >
           
            <View style={styles.TextInput} >
                <Text style={{color:Colors.primaryColor}} >ชื่อ-นามสกุล : </Text>
                <TextInput
                    placeholder=' กรอกชื่อ นามสกุล'
                    value={customerName}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={30}
                    onChangeText={setCustomerName}
                    style ={{flex:1}}
                    editable={editable}
                />
            </View>
 
            <View style={styles.TextInput} >                
                <Text style={{color:Colors.primaryColor}}>วันเดือนปีเกิด : </Text>
                <TextInput
                    placeholder=' เช่น 4 พฤษภาคม 2538'
                    value={birthday}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={40}
                    onChangeText={setBirthday} 
                    style ={{flex:1}}
                    editable={editable}

                />
                
            </View>
            <View style={styles.TextInput} >                
                <Text style={{color:Colors.primaryColor}}>email : </Text>
                <TextInput
                    placeholder='กรอกอีเมลล์'
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={40}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    style ={{flex:1}}
                    editable={editable}

                />
            </View>
            <View style={styles.TextInput} >                
                <Text style={{color:Colors.primaryColor}}>เบอร์โทรศพท์ : </Text>
                <TextInput
                    placeholder='กรอกเบอร์โทรศพท์'
                    value={tel}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={10}
                    onChangeText={setTel}
                    keyboardType='phone-pad'
                    style ={{flex:1}}
                    editable={editable}


                />
            </View>
            <View style={{...styles.TextInput,...{height:70}}} >                
                <Text style={{color:Colors.primaryColor}} >ที่อยู่ : </Text>
                <TextInput
                    placeholder='เช่น ห้อง 201/10 คอนโดชอบชำ ถนนเพชรบุรี เขตถนนเพชรบุรี เขตราชเทวี กรุงเทพมหานคร 10140'
                    multiline={true}
                    value={address}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={100}
                    onChangeText={setAddress}
                    style ={{flex:1}}
                    editable={editable}
                />
                
                
            </View>

            
           
                {editable
                    ?<TouchableOpacity onPress = {customerUpdate} style = {styles.button}>
                        <View style={{flexDirection:'row',alignItems:'center'}} >
                            <Ionicons name="person" size={24} color="white" />
                            <Text style={{fontSize:18,color:'white'}}>   ยืนยันข้อมูล</Text>
                        </View>
                    </TouchableOpacity>
                    
                    :<TouchableOpacity onPress = {() => setEditable(true)} style = {styles.button}>
                        <View style={{flexDirection:'row',alignItems:'center'}} >
                            <FontAwesome5 name="user-edit" size={24} color="white" />
                            <Text style={{fontSize:18,color:'white'}} >   แก้ไขข้อมูลส่วนตัว</Text>  
                        </View>
                    </TouchableOpacity>
                    
                }
           
        </View>
        
    )
}

const styles = StyleSheet.create({
    TextInput: {
        width:'90%',
        borderBottomWidth:1,
        height:50,
        justifyContent:'flex-start',
        borderColor:'#ebe6e6',
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center'
    },
    button:{
        backgroundColor:'red',
        flexDirection:'row',
        width:'90%',
        alignSelf:'center',
        backgroundColor:Colors.primaryColor,
        borderRadius:8,
        height:50,
        justifyContent:'center',
        marginTop:10, 
    }
})

export default ProfileScreen;