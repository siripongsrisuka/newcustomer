import React, {useState,useContext, useEffect} from "react";
import { Text, StyleSheet, View,TouchableOpacity, TouchableWithoutFeedback, Image, Modal, ScrollView, FlatList,ImageBackground } from "react-native";
import Colors from "../constants/Colors";
import Dimensions from "../constants/Dimensions";
import {Context as ShopMemberContext} from '../context/ShopMemberContext'
import {Context as ShopCouponContext} from '../context/ShopCouponContext'
import db from "../../db/firestore";
import Fonts from "../constants/Fonts";
import Catalog from "../../component/Catalog";

const  ShopPointDetail = ({route}) => {
    const { shopId } = route.params;
    const {state : {shopMember,shopProfile,shopProduct,productCobrand},getShopMember}= useContext(ShopMemberContext)
    const {state : rewardData}= useContext(ShopCouponContext)
    const [redeemVisible, setRedeemVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(true);
    const [showType, setShowType] = useState('product')
    const [promotionType, setPromotionType] = useState('Buy 1 Get 1')
    const [data, setData] = useState();
    const [thisShopProduct, setThisShopProduct] = useState([])
    let aShop = shopProfile.filter((item) => {return(item.shopId == shopId )})
    let reward = aShop[0].reward.filter((a) =>{return(a.status == 'valid')})
    let aShopMember = shopMember.filter((item) => {return(item.shopId == shopId )})

    useEffect(() =>{
      aShopProduct()
    },[])

    const aShopProduct = async() => {
      let res = shopProduct.filter((a) => {return(a.shopId == shopId)})
      let newData = []
      await res?.forEach((item) =>{
        let xx = productCobrand?.filter((a) => {return(a.sku == item.sku)})
        if(xx.length > 0){
          newData.push(xx[0])
        }
      })
      await setThisShopProduct(newData)
    }

    const confirmReward = () => {
      if(aShopMember[0].remainPoint < data.pointConsume){
        alert('สะสมแต้มเพิ่มอีกนิดนะ ')
      } else {
        aShopMember[0].remainPoint = aShopMember[0].remainPoint - data.pointConsume
        let newReward = {
          rewardId:String(new Date()),
          qty:1,
          status:'request',
          id:data.id
        }
        //update Context
        aShopMember[0].reward.push(newReward)
        //update Firebase
        db.collection("shopMember").doc(aShopMember[0].doc).update({
          reward: aShopMember[0].reward,
          remainPoint:aShopMember[0].remainPoint
        })
        getShopMember(shopMember)
      }
      setRedeemVisible(false) 
    }

    function getRewardData(id){
      let res = rewardData?.filter((a) => {return(a.id == id)})
      return res
    }
    function productPromotion(type){
      let res = thisShopProduct?.filter((a) =>{return(a.promotion[0]?.detail == type)})
      return res
    }

    return (
        <View style={{backgroundColor:'white',flex:1,alignItems:'center'}} >
          <View style={{justifyContent:'flex-end'}} >
            <Image source={{uri : aShop[0].imageId}} style={{width:Dimensions.Width,height:Dimensions.Width/1.5,justifyContent:'flex-end'}}/>
            <View style={styles.absolute} >
              <View style={{alignSelf:'center'}} >
                  <Text style={{fontSize:20,fontFamily: 'Prompt_600SemiBold'}}>{aShop[0].shopName}</Text>
              </View>
              <View style={{flexDirection:'row',width:'90%'}} >
                  <Text style={{fontSize:16,fontFamily: 'Prompt_500Medium'}}>ที่อยู่ : </Text>
                  <Text style={{fontSize:16,fontFamily: 'Prompt_400Regular'}} numberOfLines={1}>{aShop[0].address}</Text>
              </View>
              <View style={{flexDirection:'row'}} >
                  <Text style={{fontSize:16,fontFamily: 'Prompt_500Medium'}}>เบอร์ติดต่อ : </Text>
                  <Text style={{fontSize:16,fontFamily: 'Prompt_400Regular'}} numberOfLines={2}>{aShop[0].tel}</Text>
              </View>
              <View style={{flexDirection:'row'}} >
                  <Text style={{fontSize:16,fontFamily: 'Prompt_500Medium'}}>แต้มสะสม : </Text>
                  <Text style={{fontSize:16,fontFamily: 'Prompt_400Regular'}} numberOfLines={2}>{aShopMember[0].remainPoint}</Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection:'row',height:40}} >
            {(showType == 'product')
              ?<TouchableOpacity style={styles.border} >
                  <View style={styles.choose} >
                    <Text style={Fonts.md}>สินค้าลดราคาจุกๆ</Text>
                  </View>
              </TouchableOpacity>
              :<TouchableOpacity 
                  style={styles.border}
                  onPress={() => {setShowType('product'),setProductVisible(true)}}
                > 
                  <Text style={Fonts.md}>สินค้าลดราคาจุกๆ</Text>
                </TouchableOpacity> 
            }
            {(showType == 'reward')
              ?<TouchableOpacity  style={styles.border} >
                <View style={styles.choose} >
                    <Text style={Fonts.md} >ของขวัญตอบแทนลูกค้า</Text>
                </View>
              </TouchableOpacity>
              :<TouchableOpacity 
                  style={styles.border}
                  onPress={() => {setShowType('reward'),setProductVisible(false)}}
              >
                <View style={styles.notChoose}>
                  <Text style={Fonts.md} >ของขวัญตอบแทนลูกค้า</Text>
                </View>
              </TouchableOpacity> 
            }
          </View>
          {productVisible
          ?<View>
            <View style={{height:40}} >
              <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                {(promotionType == 'Buy 1 Get 1')
                  ?<TouchableOpacity style={styles.border2} >
                      <View style={styles.choose2} >
                        <Text style={Fonts.md}>1 แถม 1</Text>
                      </View>
                  </TouchableOpacity>
                  :<TouchableOpacity style={styles.border2} onPress={() => {setPromotionType('Buy 1 Get 1')}}> 
                      <Text style={Fonts.md}>1 แถม 1</Text>
                  </TouchableOpacity> 
                }
                {(promotionType == 'Price Off')
                  ?<TouchableOpacity  style={styles.border2} >
                    <View style={styles.choose2} >
                        <Text style={Fonts.md} >ลดราคา</Text>
                    </View>
                  </TouchableOpacity>
                  :<TouchableOpacity style={styles.border2} onPress={() => {setPromotionType('Price Off')}}>
                      <Text style={Fonts.md} >ลดราคา</Text>
                  </TouchableOpacity> 
                }
                {(promotionType == 'Buy 2 Cheaper')
                  ?<TouchableOpacity  style={styles.border2} >
                    <View style={styles.choose2} >
                      <Text style={Fonts.md} >2 ชิ้นถูกกว่า</Text>
                    </View>
                  </TouchableOpacity>
                  :<TouchableOpacity style={styles.border2} onPress={() => {setPromotionType('Buy 2 Cheaper')}}>
                      <Text style={Fonts.md} >2 ชิ้นถูกกว่า</Text>
                  </TouchableOpacity>
                }
                {(promotionType == 'Buy 2 Get 1')
                  ?<TouchableOpacity  style={styles.border2}>
                    <View style={styles.choose2} >
                      <Text style={Fonts.md} >2 แถม 1</Text>
                    </View>
                  </TouchableOpacity >
                  :<TouchableOpacity style={styles.border2} onPress={() => {setPromotionType('Buy 2 Get 1')}}>
                      <Text style={Fonts.md} >2 แถม 1</Text>
                  </TouchableOpacity >
                }
              </ScrollView>
            </View>
            {promotionType == 'Price Off' && (<Catalog data={productPromotion('Price Off')} press ={() =>{}}/>)}
            {promotionType == 'Buy 1 Get 1' && (<Catalog data={productPromotion('Buy 1 Get 1')} detail='2 ชิ้น ปกติ' multiply={2} press ={() =>{}} />)}
            {promotionType == 'Buy 2 Cheaper' && (<Catalog data={productPromotion('Buy 2 Cheaper')} detail='2 ชิ้น ปกติ' multiply={2} press ={() =>{}} />)}
            {promotionType == 'Buy 2 Get 1' && (<Catalog data={productPromotion('Buy 2 Get 1')} detail='3 ชิ้น ปกติ' multiply={3} press ={() =>{}} />)}
          </View>
        : <View>
            <View style={{alignSelf:'center',marginTop:10}} >
                  <Text numberOfLines={2} style={{fontSize:18,fontFamily: 'Prompt_500Medium'}}>มาแลกรางวัลจาก {aShop[0].shopName} กันเถอะ!!</Text>
            </View>
            <View style={{alignItems:'center',marginBottom:350}} >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={reward}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                return (
                  <View style={styles.reward} >
                    <View style = {{alignSelf:'center',width:'100%'}} >
                        <View style={{width:'100%',borderTopRightRadius:8,borderTopLeftRadius:8}}  >
                            <Image resizeMode='center' source={{uri : getRewardData(item.id)[0]?.imageId}} style={{height:Dimensions.Width/4,width:Dimensions.Width/2.2}}/>
                        </View>
                        <View style={{marginLeft:5,justifyContent:'center',alignItems:'center'}} >
                            <Text style={Fonts.lg}>{item.pointConsume} แต้ม</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress = {() => {setRedeemVisible(true),setData(item)}} >
                        <View style={{borderTopWidth:1,padding:5,borderColor:Colors.InputColor,width:'90%',alignSelf:'center'}} >
                        <View style = {{...styles.redeem,...{borderRadius:30}}}>
                            <Text style={{fontSize:18,fontFamily: 'Prompt_500Medium',color:'white'}}>แลกรางวัล</Text>
                        </View>
                        </View>
                    </TouchableOpacity>  
                </View>
                )}}
              />
            </View>
          </View>
        }
          
          <Modal
            animationType="fade"
            transparent={true}
            visible={redeemVisible}
            onRequestClose={() => {
              setRedeemVisible(!redeemVisible);
            }}
          >
              <TouchableOpacity 
                style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}} 
                activeOpacity={1} 
                onPress={() => {setRedeemVisible(false)}}
              >
                  <TouchableWithoutFeedback>
                      <View style={styles.modalView}>
                          <View style={{alignItems:'center'}} >
                            <Text style={{fontSize:20,fontFamily: 'Prompt_500Medium'}} >ยืนยันแลกของรางวัล?</Text>
                            <Image resizeMode='center' source={{uri :getRewardData(data?.id)[0]?.imageId}} style={{height:Dimensions.Width/2,width:Dimensions.Width/1.5}}/>
                          </View>
                          <TouchableOpacity onPress ={confirmReward} style = {{...styles.redeem,...{backgroundColor:Colors.gold,borderBottomLeftRadius:30,borderBottomRightRadius:30,height:50}}} >
                          <Text style={{fontSize:20,fontFamily: 'Prompt_400Regular',color:'white'}}>ตกลง</Text>
                          </TouchableOpacity>
                      </View>
                  </TouchableWithoutFeedback>
              </TouchableOpacity> 
          </Modal> 
        </View>
    );
};

const styles = StyleSheet.create({
    redeem: {
        backgroundColor:"#ff6900",
        alignItems:'center',
        width:'100%',
        alignSelf:'center',
        height:30,
        justifyContent:'center',
    },
    modalView: {
      width:'80%',
      marginTop:50,
      alignSelf:'center',
      backgroundColor: "white",
      borderRadius: 30,
      paddingTop: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      fontSize:18,
    },
    reward : {
      width:Dimensions.Width/2.1,
      margin:5,
      backgroundColor:'white',
      borderRadius:8,
      shadowColor:'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:10,
      elevation:3,

    },
    absolute:{
      backgroundColor:'white',
      width:Dimensions.Width,
      opacity:0.8,padding:5,
      borderTopRightRadius:10,
      borderTopLeftRadius:10,
      position:'absolute',
      // marginTop:20
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
    choose2: {
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
      borderColor:'#ff6900',
      height:35,
      width:100,
    },
    border2 : {
      borderLeftWidth:1,
      paddingRight:8,
      borderColor:Colors.InputColor,
      paddingLeft:8,
      justifyContent:'center',
      height:40,
      width:110,
      alignItems:'center',
    },
    
})

export default ShopPointDetail;