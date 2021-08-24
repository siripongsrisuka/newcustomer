import React, {useEffect,useContext,useState} from "react";
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, Button } from "react-native";
import Dimensions from '../constants/Dimensions'
import {Context as BrandPointContext} from '../context/BrandPointContext';
import {Context as BrandMemberContext} from '../context/BrandMemberContext'

import Colors from "../constants/Colors";

const  BrandPointDetails = ({navigation}) => {
    const {state : {brandMember,brandProfile}}= useContext(BrandMemberContext);
    const [registerVisible, setRegisterVisible] = useState(false)
    const [brandName,setBrandName] = useState('')
    const [registerImage, setRegisterImage] = useState('')
    const [couponQty, setCouponQty] = useState('')
    const [couponName, setCouponName] = useState('')

    const register = (brandId) => {
        let copyBrandProfile = brandProfile.slice()
        let filterBrandProfile = copyBrandProfile.filter((item) => {return(item.brandId == brandId)})
        setBrandName(filterBrandProfile[0].brandName)
        
        let registerCoupon = filterBrandProfile[0].registerCoupon
        setRegisterImage(registerCoupon.imageId)
        setCouponQty(registerCoupon.qty)
        setCouponName(registerCoupon.productName)
        setRegisterVisible(true)
    }

    return (
        <View style = {styles.container} >
            <View style = {{flexDirection:'row',justifyContent:'space-between',width:'100%',height:50}} >
                <View style = {{flex:1,borderRightWidth:1,justifyContent:'center',alignItems:'center',flexDirection:'row',borderColor:'#b5b5b5'}} >
                    <Text style={{fontSize:16}}>แบรนด์ที่คุณมีส่วนร่วม : </Text>
                    <Text style={{fontSize:30,color:Colors.primaryColor}}>{brandMember.length}</Text>
                </View>

            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={brandMember}
                keyExtractor={(item) => item.brandId}
                renderItem={({ item }) => {
                    return (
                       
                        <View style= {styles.card} >
                            
                            {item.status !== 'unKnow' && (
                                    <TouchableOpacity onPress= {()=> navigation.navigate('BrandPointDetails',{brandId:item.brandId})}  > 
                                    <View style = {styles.absulute} >
                                        <Text style = {{fontSize:20,color:'white'}} >คุณมี {item.remainPoint} แต้ม</Text>
                                    </View>
                                    {item.status !== 'unKnow' && (
                                        <Image style = {styles.image} source={{uri: item.brandAdsImage,}} />
                                    )}
                                    
                                    
                                </TouchableOpacity>
                                )}

                            
                            {item.status == 'unKnow' && (
                                    <TouchableOpacity onPress= {()=> {register(item.brandId)}}  > 
                                    <View style = {styles.absulute} >
                                        <Text style = {{fontSize:20,color:'white'}} >คุณมี {item.remainPoint} แต้ม</Text>
                                    </View>
                                    {item.status == 'unKnow' && (
                                        <View>
                                            <Image style = {{width:"100%",height:"100%",resizeMode:'stretch',opacity:0.5}} source={{uri: item.brandAdsImage,}} />
                                            <View style={styles.register} >
                                                <Text>สมัครสมาชิก</Text>
                                            </View>
                                        </View>
                                    )}
                                    {item.status !== 'unKnow' && (
                                        <Image style = {styles.image} source={{uri: item.brandAdsImage,}} />
                                    )}
                                    
                                    
                                </TouchableOpacity>
                                )}
                            <Modal
                animationType="fade"
                transparent={true}
                visible={registerVisible}
                onRequestClose={() => {
                    setRegisterVisible(false);
                }}
            >
                <TouchableOpacity 
                    style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center'}} 
                    activeOpacity={1} 
                    onPress={() => {setRegisterVisible(false)}}
                >
                    <TouchableWithoutFeedback>                    
                        <View style={styles.showRegister}>
                                <View style={{padding:5,alignSelf:'center'}} >
                                    <Image style={{width:100,height:100}} source = {{uri : registerImage}} />
                                    <Text style={styles.modalText}>รับฟรี {couponName} X {couponQty} </Text>
                                    <Text style={styles.modalText}>*แบรนด์ {brandName} จะได้รับชื่อนามสกุล อายุและเพศของคุณ</Text>
                                </View>
                                <Button title='ยืนยัน' onPress = {()=> {setRegisterVisible(false),navigation.navigate('BrandPointDetails',{brandId:item.brandId})}} />
                        </View>           
                    </TouchableWithoutFeedback>
                </TouchableOpacity> 
            </Modal> 
                        </View>
                    )
                }}
            />
            
            

       

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white'
    },
    text: {
        fontSize:30,
        fontWeight:'bold'
    },
    card: {
        width:Dimensions.Width-20,
        height:Dimensions.Height/2.5,
        margin:5,
        backgroundColor:'white',
        borderRadius:8,
        shadowColor:'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height:2},
          shadowRadius:10,
          elevation:3,
          justifyContent:'center'
    },
    image : {
        width:"100%",
        height:"100%",
        resizeMode:'stretch',
    },
    absulute: {
        height:50, 
        width:200,
        backgroundColor:'#4c4e52',
        justifyContent:'center',
        alignItems:'center',
        opacity:0.5,
        position:'absolute',
        zIndex:999,
        left:10,
        top:5,
        borderRadius:8,
    },
    register:{
        width:'99%',
        backgroundColor:'red',
        alignSelf:'center',
        position:'absolute',
        marginTop:Dimensions.Height/5
    },
    showRegister: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        },
})

export default BrandPointDetails;