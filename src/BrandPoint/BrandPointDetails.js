import React, {useContext, useState} from "react";
import { Text, StyleSheet, View, Image,TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView, FlatList } from "react-native";
import Dimensions from '../constants/Dimensions';
import {Context as BrandPointContext} from '../context/BrandPointContext';
import {Context as BrandMemberContext} from '../context/BrandMemberContext';
import Colors from '../constants/Colors'

const  BrandPointDetails = ({route}) => {
    const {brandId} = route.params
    const {state, decreasePoint}= useContext(BrandPointContext)
    const {state : {brandMember,brandProfile},getBrandMember}= useContext(BrandMemberContext);
    let copyBrandReward = brandProfile.slice()
    let filterBrandReward = copyBrandReward.filter((brand)=> brand.brandId == brandId)
    let brandReward = filterBrandReward[0].reward
    const [showReward, setShowReward] = useState(false);   

    const RedeemPoint = (pointConsume) => {
        if(pointConsume >brandMember[0].remainPoint){
            alert('แต้มของคุณไม่เพียงพอจะแลกของรางวัล')
        } else {
            brandMember.forEach((item) => {
                if(item.brandId == brandId ){
                    item.remainPoint = item.remainPoint - pointConsume
                }
            })
            getBrandMember(brandMember)
        }
    };

    return (
        <View style = {{justifyContent:'center',alignItems:'center',backgroundColor:'white',flex:1}} >
            <View style ={{flexDirection:'row',width:'100%'}} >
                <Image source={{uri: brandProfile[0].brandLogoId}} style={{height:140,width:140}}  />
                <View style = {{padding:5,alignSelf:'center',height:140,flex:1}} >
                    <View style={{flexDirection:'row',padding:5}} >
                        <Text style={{fontWeight:'bold'}} >ที่อยู่ : </Text>
                        <Text>{brandProfile[0].address}</Text>
                    </View>
                    <View style={{flexDirection:'row',padding:5}} >
                        <Text style={{fontWeight:'bold'}} >แต้มสะสม : </Text>
                        <Text>{brandMember[0].remainPoint}</Text>
                    </View>
                </View>
            </View>
            
            <View style={{ width:'90%',borderBottomWidth:1,alignItems:'center',height:30,justifyContent:'center',borderColor:'#b5b5b5'}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>ของรางวัลทั้งหมด</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={brandReward}
                keyExtractor={(item) => item.rewardId}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card} >
                            <Text style = {{alignSelf:'center',fontSize:20,fontWeight:'bold',color:'black'}} >{item.rewardName}</Text>
                            <View style = {{flexDirection:'row'}} >
                                <View>
                                    <TouchableOpacity onPress = {() => setShowReward(true)} >
                                        <Image source={{uri: item.imageId}} style={{height:140,width:140}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginLeft:10,justifyContent:'space-between'}} >
                                    <View>
                                        <Text style={{fontSize:20,fontWeight:'bold',color:Colors.primaryColor}}>จำนวนคงเหลือ </Text>
                                        <Text style={{fontSize:20,fontWeight:'bold',color:Colors.primaryColor}}>{item.remainQty} รางวัล</Text>
                                    </View>
                                    <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>ใช้ {item.pointConsume} คะแนน</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {RedeemPoint(item.pointConsume)}}>
                                <View style = {styles.redeem}>
                                    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>แลกรางวัล</Text>
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
                                    style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center'}} 
                                    activeOpacity={1} 
                                    onPress={() => {setShowReward(false)}}
                                >
                                    <TouchableWithoutFeedback>                    
                                        <View style={styles.showReward}>
                                                <Image source={{uri: item.imageId}}  style={{height:Dimensions.Width/1.5,width:Dimensions.Width/1.5}} />
                                                <View style={{padding:5}} >
                                                    <Text style={styles.modalText}>รายละเอียด : {item.detail}</Text>
                                                    <Text style={styles.modalText}>มูลค่า : {item.price} บาท</Text>
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
        margin:5,
        backgroundColor:'white',
        borderRadius:8,
        padding:10,
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
        borderRadius:8,
        height:40,
        justifyContent:'center',
        marginTop:10,
    },
    showReward: {
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
    modalText: {
    marginBottom: 15,
    fontSize:18,
    }
 
 

})


export default BrandPointDetails;