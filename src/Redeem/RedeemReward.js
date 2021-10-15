import React, {useEffect, useState, useContext} from "react";
import { 
  Text, 
  StyleSheet, 
  View,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import Colors from '../constants/Colors'
import {Context as BrandMemberContext} from '../context/BrandMemberContext'
import {Context as ShopMemberContext} from '../context/ShopMemberContext'
import Dimensions from "../constants/Dimensions";
import db from "../../db/firestore";
import Fonts from "../constants/Fonts";


const  redeemReward = ({route}) => {
    const {state : {brandMember}}= useContext(BrandMemberContext);
    const {state : {shopMember},getShopMember}= useContext(ShopMemberContext);
    const [data, setData] = useState({});
    const [modalVisible, setModalVisible] = useState(false)
    const [storeVisible, setStoreVisible] = useState(true)
    const [RewardType, setRewardType] = useState('store')
  let shopReward = []
  shopMember.forEach((item) => {
    item.reward.forEach((r) => {
      r.shopName = item.shopName
      shopReward.push(r)
    })
  })
  let brandReward = []
  brandMember.forEach((item) => {
    item.reward.forEach((b) => {
      b.brandName = item.brandName
      brandReward.push(b)
    })
  })
  const useShopReward = () => {
    let aShopMember = shopMember.filter((item) => {return(item.shopName == data.shopName)})
    let aShopReward = aShopMember[0].reward.filter((a) => {return(a.rewardId !== data.rewardId)})
    aShopMember[0].reward = aShopReward
    getShopMember(shopMember)
    setModalVisible(false)
    db.collection('shopMember').doc(aShopMember[0].doc).update({
      reward:aShopMember[0].reward
    })
  }
   
    return(
        <View style={{flex:1,backgroundColor:'white'}} >
          <View style={{flexDirection:'row',height:40}} >
            {(RewardType == 'store')
              ?<TouchableOpacity style={styles.border} >
                  <View style={styles.choose} >
                    <Text style={Fonts.md}>รางวัลจากร้านค้า</Text>
                  </View>
              </TouchableOpacity>
              :<TouchableOpacity 
                  style={styles.border}
                  onPress={() => {setRewardType('store'),setStoreVisible(true)}}
                > 
                  <Text style={Fonts.md}>รางวัลจากร้านค้า</Text>
                </TouchableOpacity> 
            }
            {(RewardType == 'brand')
              ?<TouchableOpacity  style={styles.border} >
                <View style={styles.choose} >
                    <Text style={Fonts.md} >รางวัลจากแบรนด์</Text>
                </View>
              </TouchableOpacity>
              :<TouchableOpacity 
                  style={styles.border}
                  onPress={() => {setRewardType('brand'),setStoreVisible(false)}}
              >
                <View style={styles.notChoose}>
                  <Text style={Fonts.md} >รางวัลจากแบรนด์</Text>
                </View>
              </TouchableOpacity> 
            }
          </View>
          {storeVisible
          ?<View style={{flex:1,alignItems:'center'}} >
            <FlatList
                data={shopReward}
                keyExtractor={(item) => item.rewardId}
                numColumns={2}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity style={styles.brandCoupon} onPress={() => {setModalVisible(true),setData(item)}}  >
                      <Text style={Fonts.lg} >{item.shopName}</Text>
                        <Image 
                          source={{uri:item.imageId}} 
                          style={{width:'100%',height:Dimensions.Width/4}}
                          resizeMode='stretch'
                        />
                      <Text style={{fontSize:14,color:Colors.primaryColor,fontFamily: 'Prompt_400Regular'}} >คลิกเพื่อใช้รางวัล</Text>
                    </TouchableOpacity>
                  )
                }}
              />
            {data !== {} && (
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                  <TouchableOpacity 
                    style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}} 
                    activeOpacity={1} 
                    onPress={() => {setModalVisible(false)}}
                  >
  
                      <TouchableWithoutFeedback>
                          <View style={{backgroundColor:'white',width:Dimensions.Width/1.2,borderRadius:8}}>
                              <View style={{alignItems:'center',paddingTop:10}} >
                                <Text style={Fonts.lg} >{data.shopName}</Text>
                                <Image resizeMode='center' source={{uri : data.imageId}} style={{height:Dimensions.Width/2,width:Dimensions.Width/1.5}}/>
                                
                              </View>
                              <TouchableOpacity style = {{...styles.redeem,...{backgroundColor:Colors.gold,alignItems:'center'}}} onPress={useShopReward}>
                                <Text style={Fonts.lg}>ร้านค้ากดยืนยันการแลกรางวัล</Text>
                                <Text style={{color:'red',fontFamily: 'Prompt_400Regular'}} >**หากกดใช้แล้วจะไม่สามารถยกเลิกได้</Text>
                              </TouchableOpacity>
                          </View>
                         
                      </TouchableWithoutFeedback>
                  </TouchableOpacity> 
              </Modal>
            )}
          </View>
          :<FlatList
            data={brandReward}
            keyExtractor={(item) => item.rewardId}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.choose} onPress={() => {setModalVisible(true),setData(item)}}  >
                  <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',}} >
                    <Image 
                      source={{uri:item.imageId}} 
                      style={{width:200,height:100}}
                      resizeMode='stretch'
                    />
                    <Text style={{fontSize:18,fontWeight:'bold'}} >{item.shopName}</Text>
                    
                  </View>
                  <Text style={{fontSize:18,color:Colors.primaryColor}} >คลิกเพื่อใช้รางวัล</Text>
                </TouchableOpacity>
              )
            }}
          />
          }
        </View>
    )
}

const styles = StyleSheet.create({
    brandCoupon:{
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      elevation: 3,
      alignItems:'center',
      margin:5,
      width:Dimensions.Width/2.2,
      // height:Dimensions.Width/2.2,
    },
    coupon : {
      flex:1.5,
      borderRightWidth:1,
      borderColor:Colors.InputColor,
      height:'90%',
      paddingLeft:5,
      justifyContent:'space-between'
    },
    choose: {
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderRadius:50,
      borderWidth:1,
      borderColor:Colors.primaryColor,
      height:35,
      width:'100%',
    },
    border : {
      borderLeftWidth:1,
      paddingRight:8,
      borderColor:Colors.InputColor,
      paddingLeft:8,
      justifyContent:'center',
      height:40,
      width:'50%',
      alignItems:'center',
    },
   
  })

export default redeemReward;