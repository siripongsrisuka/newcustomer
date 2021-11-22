import React, {useContext, useState} from "react";
import { Text, StyleSheet, View, Image,TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import Dimensions from '../constants/Dimensions';
import {Context as BrandMemberContext} from '../context/BrandMemberContext';
import Colors from '../constants/Colors'
import db from "../../db/firestore";
import Fonts from "../constants/Fonts";
import {stringDtNumOnly} from '../Utility/dateTime'

const  BrandPointDetails = ({route}) => {
    const {brandId} = route.params
    const {state : {brandMember,brandProfile},getBrandMember}= useContext(BrandMemberContext);
    let filterBrandReward = brandProfile.filter((brand)=> brand.brandId == brandId)
    let brandReward = filterBrandReward[0].reward
    const [showReward, setShowReward] = useState(false);
    const [rewardData, setRewardData] = useState({})

    let filterBrandMember = brandMember.filter((brand)=> brand.brandId == brandId)
    
    const RedeemPoint = () => {
        if(rewardData.pointConsume >filterBrandMember[0]?.remainPoint){
            alert('สะสมแต้มเพิ่มอีกหน่อย แล้วมารับรางวัลไปได้เลย')
        } else {
            filterBrandMember[0].remainPoint = Number(filterBrandMember[0]?.remainPoint) - Number(rewardData.pointConsume)
            filterBrandMember[0].reward.push({
                rewardId:filterBrandReward[0].brandId + stringDtNumOnly(),
                rewardName:rewardData.rewardName,
                rewardDetail:rewardData.rewardDetail,
                rewardImageId:rewardData.imageId,
                qty:1,
                status:'request',
                dateTime:new Date()
            })
            getBrandMember(brandMember)
            // db.collection("brandMember").doc(filterBrandMember[0].doc).update({
            //     remainPoint : filterBrandMember[0].remainPoint,
            //     reward :filterBrandMember[0].reward
            // })
            alert('แลกรางวัลสำเร็จ')
        }
        setShowReward(false)
    };


    return (
        <View style = {{justifyContent:'center',alignItems:'center',backgroundColor:'white',flex:1}} >
            <View style ={{flexDirection:'row',margin:10}} >
                <Image source={{uri: filterBrandReward[0].imageId}} style={{height:140,width:140,borderRadius:15}}  />
                <View style = {{padding:5,alignSelf:'center',flex:1}} >
                    <View style={{marginLeft:5}} >
                        <Text style={Fonts.lgb} >{filterBrandReward[0].brandName}</Text>
                    </View>
                    <View style={{marginLeft:5}}><Text style={Fonts.sm}>{filterBrandReward[0].address}</Text></View>
                    
                    <View style={{flexDirection:'row',padding:5}} >
                        <Text style={Fonts.mdb} >แต้มสะสม : </Text>
                        <Text style={{...Fonts.mdb,...{color:Colors.primaryColor}}}>{filterBrandMember[0]?.remainPoint}</Text>
                    </View>
                </View>
            </View>
            
            <View style={{ width:'90%',borderBottomWidth:1,alignItems:'center',height:30,justifyContent:'center',borderColor:'#b5b5b5'}}>
                <Text style={Fonts.lgb} >ของรางวัลทั้งหมด</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={brandReward}
                keyExtractor={(item) => item.rewardId}
                renderItem={({ item }) => {
                    return (
                        <View  >
                            <TouchableOpacity onPress = {() => {setShowReward(true),setRewardData(item)}} style={styles.card} >
                                <Image source={{uri: item.imageId}} style={{height:Dimensions.Width-20,width:Dimensions.Width-20,borderRadius:30}}  />
                                <View style = {styles.absulute} >
                                    <Text style={Fonts.smw}>ใช้ {item.pointConsume} คะแนน</Text>
                                </View> 
                            </TouchableOpacity>

                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={showReward}
                                onRequestClose={() => {
                                    setShowReward(false);
                                }}
                            >
                                <TouchableOpacity 
                                    style={{flex:1,backgroundColor:'rgba(0,0,0,0.2)',justifyContent:'center',alignItems:'center'}} 
                                    activeOpacity={1} 
                                    onPress={() => {setShowReward(false)}}
                                >
                                    <TouchableWithoutFeedback>                    
                                        <View style={styles.showReward}>
                                                <Image source={{uri: rewardData.imageId}}  style={{height:Dimensions.Width/1.2,width:'100%',borderTopLeftRadius:30,borderTopRightRadius:30}} />
                                                <View style={{flexDirection:'row',height:50}} >
                                                    <TouchableOpacity 
                                                        style={{flex:1,alignItems:'center',backgroundColor:Colors.BackgroundColor,justifyContent:'center',borderBottomLeftRadius:30}} 
                                                        onPress={() => {setShowReward(false)}}
                                                        >
                                                        <Text style={{fontSize:18,color:'white'}} >ย้อนกลับ</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity 
                                                        style={{flex:1,alignItems:'center',backgroundColor:Colors.primaryColor,justifyContent:'center',borderBottomRightRadius:30}} 
                                                        onPress={RedeemPoint}
                                                        >
                                                        <Text style={{fontSize:18,color:'white'}} >แลกรางวัล</Text>
                                                    </TouchableOpacity>  
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
    card: {
        width:Dimensions.Width-20,
        height: Dimensions.Width-20,
        margin:5,
        backgroundColor:'white',
        borderRadius:30,
        shadowColor:'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:10,
        elevation:3,
    },
    redeem: {
        backgroundColor:Colors.gold2,
        alignItems:'center',
        width:'40%',
        alignSelf:'center',
        borderRadius:30,
        height:40,
        justifyContent:'center',
        marginTop:10,
    },
    showReward: {
        margin: 20,
        backgroundColor: "white",
        borderRadius:30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:Dimensions.Width/1.2,
        },
    modalText: {
        marginBottom: 15,
        fontSize:18,
    },
    absulute: {
        height:40, 
        width:100,
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
})


export default BrandPointDetails;