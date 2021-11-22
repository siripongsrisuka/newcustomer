import React, {useContext,useState} from "react";
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, Button, ImageBackground } from "react-native";
import Dimensions from '../constants/Dimensions'
import {Context as BrandMemberContext} from '../context/BrandMemberContext'
import {CustomerProfileContext } from "../context";
import db from "../../db/firestore";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const  BrandPointDetails = ({navigation}) => {
    const {state : {brandMember,brandProfile},getBrandMember}= useContext(BrandMemberContext);
    const {state : {customerProfile}} = useContext(CustomerProfileContext)
    const [registerVisible, setRegisterVisible] = useState(false)
    const [brandName,setBrandName] = useState('')
    const [registerImage, setRegisterImage] = useState('')
    const [couponQty, setCouponQty] = useState('')
    const [couponName, setCouponName] = useState('')
    const [point, setPoint] = useState('')
    const [pointName, setPointName] = useState('')
    const [brandMemberData, setBrandMemberData] = useState('')
    const [couponRegis, setCouponRegis] = useState("")

    const preRegister = (data) => {
        let filterBrandProfile = brandProfile.filter((a) => {return(a.brandId == data.brandId)})
        setBrandName(filterBrandProfile[0].brandName)
        setBrandMemberData(data)
        

        if(filterBrandProfile[0].couponRegister.length > 0){
            let couponRegister = filterBrandProfile[0].couponRegister[0]
            setRegisterImage(couponRegister.imageId)
            setCouponQty(couponRegister.qty)
            setCouponName(couponRegister.productName)
            setCouponRegis(couponRegister)
        } 
        if(filterBrandProfile[0].pointRegister.length > 0){
            let pointRegister = filterBrandProfile[0].pointRegister[0]
            setPoint(pointRegister.point)
            setPointName(pointRegister.pointName)
        } 
        setRegisterVisible(true)
    }
    const postRegister = () => {
        setRegisterVisible(false)
        
        brandMemberData.status = "member"
        let checkCoupon = brandMemberData.coupon.filter((b) =>{return(b.sku == couponRegis.sku)})
        if(couponRegis !== ''){
            if(checkCoupon.length > 0){
                checkCoupon[0].qty = Number(checkCoupon[0].qty) + Number(couponRegis.qty)
            } else {
                brandMemberData.coupon.push(couponRegis)
            }
        }
        
        brandMemberData.remainPoint = Number(brandMemberData.remainPoint) + Number(point)
        brandMember.map((item) => {
            return item.brandId == brandMemberData.brandId
                ? brandMemberData
                : item });
        getBrandMember(brandMember)
        db.collection("brandMember").doc(brandMemberData.doc).update({
            status : "member",
            coupon : brandMemberData.coupon,
            remainPoint : brandMemberData.remainPoint,
            address:customerProfile[0]?.address,
            brandName:'',
            gender:customerProfile[0]?.gender,
            userBirthDay:customerProfile[0]?.birthday,
            userName:customerProfile[0]?.customerName,
            userTel:customerProfile[0]?.tel,
        })
        navigation.navigate('BrandPointDetails',{brandId:brandMemberData.brandId})
        setRegisterImage('')
        setCouponQty('')
        setCouponName('')
        setPoint('')
        setPointName('')
        setCouponRegis('')
    }

        
    return (
        <View style = {styles.container} >
            <View style = {{flexDirection:'row',justifyContent:'space-between',width:'100%',height:40}} >
                <View style = {{flex:1,borderRightWidth:1,justifyContent:'center',alignItems:'center',flexDirection:'row',borderColor:'#b5b5b5'}} >
                    <Text style={Fonts.md}>แบรนด์ที่คุณมีส่วนร่วม : </Text>
                    <Text style={{...Fonts.md,...{color:Colors.primaryColor}}}>{brandMember.length}</Text>
                </View>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={brandMember}
                keyExtractor={(item) => item.brandId}
                renderItem={({ item }) => {
                    return (
                        <View style= {styles.card} >
                            {item.status == 'unknow' && (
                                <TouchableOpacity  onPress= {() => {preRegister(item)} } >
                                    <View style={styles.register} >
                                        <Text style={Fonts.lgwb} >สมัครสมาชิก</Text>
                                        <Text style={Fonts.lgwb} >เพื่อรับสิทธิประโยชน์</Text>
                                    </View>
                                    <Image style = {{...styles.image,...{opacity:0.5}}} source={{uri: item.brandAdsImage,}} />
                                </TouchableOpacity>
                            )}
                            {item.status !== 'unknow' && (
                                <View style = {styles.absulute} >
                                    <Text style={Fonts.mdw} >คุณมี {item.remainPoint} แต้ม</Text>
                                </View>
                            )}
                            {item.status !== 'unknow' && (
                                <TouchableOpacity onPress= {() => {navigation.navigate("BrandPointDetails",{brandId:item.brandId})}} style={{borderRadius:30}} >
                                    <Image style = {styles.image}  source={{uri: item.brandAdsImage,}} />
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
                                    onPress={() => {
                                        setRegisterVisible(false)
                                        setRegisterImage('')
                                        setCouponQty('')
                                        setCouponName('')
                                        setPoint('')
                                        setPointName('')
                                    }}
                                >
                                    <TouchableWithoutFeedback>                    
                                        <View style={styles.showRegister}>
                                            {couponName !== '' && (
                                                <View style={{backgroundColor:Colors.primaryColor,width:'100%',alignItems:'center',borderTopLeftRadius:20,borderTopRightRadius:20}} >
                                                    <Text style={{...Fonts.xlwb,fontSize:60}}>รับฟรี</Text>
                                                </View>
                                            )}
                                            {couponName !== '' && (
                                                <View style={{padding:10,alignSelf:'center'}} >
                                                    <Text style={Fonts.lg} >{couponName}</Text>
                                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                                        <Image style={{width:Dimensions.Width/2.5,height:Dimensions.Width/2.5}} source = {{uri : registerImage}} />
                                                        <Text style={{...Fonts.xlwb,color:Colors.primaryColor}} >X {couponQty} </Text>
                                                    </View>
                                                </View>
                                            )}
                                            {point !== '' && (
                                                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                                                    <Text style={Fonts.lgb}>  {pointName}</Text>
                                                    <Text style={{...Fonts.xlwb,color:Colors.primaryColor}}> x {point}</Text>
                                                </View>
                                            )}
                                            {couponName !== '' && (
                                                <TouchableOpacity 
                                                    style={{padding:10,margin:10,backgroundColor:Colors.secondaryColor,borderRadius:15}} 
                                                    onPress = {postRegister}
                                                >
                                                    <Text style={Fonts.mdw} >สมัครและรับรางวัลของคุณ</Text>
                                                </TouchableOpacity>
                                            )}
                                            {couponName == '' && (
                                                <TouchableOpacity 
                                                style={{padding:10,margin:10,backgroundColor:Colors.secondaryColor,borderRadius:15}} 
                                                onPress = {postRegister}
                                            >
                                                <Text style={Fonts.mdw} >สมัครสมาชิก</Text>
                                            </TouchableOpacity>
                                            )}
                                            <View style={{padding:10}} >
                                                <Text style={Fonts.sm}>*{brandName} จะได้รับข้อมูลของคุณที่สมัครไว้กับ shopcham</Text>
                                            </View> 
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
    card: {
        width:Dimensions.Width-20,
        height:Dimensions.Width-20,
        margin:5,
        backgroundColor:'white',
        borderRadius:30,
        shadowColor:'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height:2},
          shadowRadius:10,
          elevation:3,
          justifyContent:'center'
    },
    image : {
        width:Dimensions.Width-20,
        height:Dimensions.Width-20,
        borderRadius:30,
    },
    absulute: {
        height:50, 
        width:200,
        backgroundColor:Colors.absolute,
        justifyContent:'center',
        alignItems:'center',
        opacity:0.8,
        position:'absolute',
        left:10,
        top:5,
        borderRadius:30,
        zIndex:10
    },
    register:{
        width:'99%',
        backgroundColor:'red',
        alignSelf:'center',
        position:'absolute',
        marginTop:Dimensions.Height/5,
        zIndex:999,
        alignItems:'center'
    },
    showRegister: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
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
