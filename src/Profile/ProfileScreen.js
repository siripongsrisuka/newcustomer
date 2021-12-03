import React, {useState, useEffect, useContext} from "react";
import { Text, StyleSheet, View, TextInput,TouchableOpacity,Button, Keyboard,  TouchableWithoutFeedback, ScrollView } from "react-native";
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import Colors from "../constants/Colors";
import db from "../../db/firestore";
// import {Context as CustomerProfileContext} from '../context/CustomerProfileContext'
import { AuthContext,CustomerProfileContext } from "../context";


const  ProfileScreen = () => {
    const {signOut} = useContext(AuthContext)
    const {state : {customerProfile},fetchUserProfile} = useContext(CustomerProfileContext)
    const [customerName, setCustomerName] = useState(customerProfile[0]?.customerName);
    const [tel, setTel] = useState(customerProfile[0]?.tel);
    const [address, setAddress] = useState(customerProfile[0]?.address);
    const [birthday, setBirthday] = useState(customerProfile[0]?.birthday);
    const [editable, setEditable] = useState(false);
    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback 
        onPress={() => Keyboard.dismiss()}> {children}
        </TouchableWithoutFeedback>
        );
    const customerUpdate = () => {
        db.collection('customer').doc(customerProfile[0]?.id).update({
            customerName:customerName,
            tel:tel,
            address:address,
            birthday:birthday,
        }).catch(err => console.log(err))
        setEditable(false)
        fetchUserProfile([{...customerProfile[0],customerName:customerName,tel:tel,address:address,birthday:birthday}])
    };

    return (
        
        <ScrollView contentContainerStyle={{flexGrow: 1,justifyContent:'space-between'}} keyboardShouldPersistTaps='handled'>
            <View>
                <View style={styles.TextInput} >
                    <Text style={{color:Colors.primaryColor,fontFamily: 'Prompt_500Medium'}} >ชื่อ-นามสกุล : </Text>
                    <TextInput
                        placeholder=' กรอกชื่อ นามสกุล'
                        value={customerName}
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={30}
                        onChangeText={setCustomerName}
                        style ={{flex:1,fontFamily: 'Prompt_400Regular'}}
                        editable={editable}
                    />
                        
                </View> 
                {/* <View style={styles.TextInput} >                
                    <Text style={{color:Colors.primaryColor,fontFamily: 'Prompt_500Medium'}}>วันเดือนปีเกิด : </Text>
                    <TextInput
                        placeholder=' เช่น 4 พฤษภาคม 2538'
                        value={birthday}
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={40}
                        onChangeText={setBirthday} 
                        style ={{flex:1,fontFamily: 'Prompt_400Regular'}}
                        editable={editable}
                    />               
                </View> */}
                {/* <View style={styles.TextInput} >                
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
                </View> */}
                {/* <View style={styles.TextInput} >                
                    <Text style={{color:Colors.primaryColor,fontFamily: 'Prompt_500Medium'}}>เบอร์โทรศพท์ : </Text>
                    <TextInput
                        placeholder='กรอกเบอร์โทรศพท์'
                        value={tel}
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={10}
                        onChangeText={setTel}
                        keyboardType='phone-pad'
                        style ={{flex:1,fontFamily: 'Prompt_400Regular'}}
                        editable={editable}
                    />
                </View> */}
                <View style={{...styles.TextInput,...{height:70}}} >                
                    <Text style={{color:Colors.primaryColor,fontFamily: 'Prompt_500Medium'}} >ที่อยู่ : </Text>
                    <TextInput
                        placeholder='เช่น ห้อง 201/10 คอนโดชอบชำ ถนนเพชรบุรี เขตถนนเพชรบุรี เขตราชเทวี กรุงเทพมหานคร 10140'
                        multiline={true}
                        value={address}
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={100}
                        onChangeText={setAddress}
                        style ={{flex:1,fontFamily: 'Prompt_400Regular'}}
                        editable={editable}
                    />
                </View>
           </View>
           
            <View style={{flexDirection:'row',width:'100%'}} >
                <TouchableOpacity onPress={()=>{signOut()}} style={{width:'50%',justifyContent:'center',alignItems:'center',backgroundColor:Colors.bottom,height:50}}>
                    <Text style={{fontSize:18,color:'white',fontFamily: 'Prompt_400Regular'}}>Log Out</Text>
                </TouchableOpacity>
                {editable
                    ?<TouchableOpacity onPress = {customerUpdate} style = {styles.button}>
                        <View style={{flexDirection:'row',alignItems:'center'}} >
                            <Ionicons name="person" size={24} color="white" />
                            <Text style={{fontSize:18,color:'white',fontFamily: 'Prompt_400Regular'}}>  ยืนยันข้อมูล</Text>
                        </View>
                    </TouchableOpacity>
                    :<TouchableOpacity onPress = {() => setEditable(true)} style = {styles.button}>
                        <View style={{flexDirection:'row',alignItems:'center'}} >
                            <FontAwesome5 name="user-edit" size={24} color="white" />
                            <Text style={{fontSize:18,color:'white',fontFamily: 'Prompt_400Regular'}} >  แก้ไขข้อมูล</Text>  
                        </View>
                    </TouchableOpacity>  
                }
            </View>
            
        </ScrollView> 
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
        width:'50%',
        alignSelf:'center',
        backgroundColor:Colors.primaryColor,
        height:50,
        justifyContent:'center',
    }
})

export default ProfileScreen;