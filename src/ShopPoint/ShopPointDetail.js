import React, {useState,useContext} from "react";
import { Text, StyleSheet, View,TouchableOpacity, TouchableWithoutFeedback, Image, Modal, ScrollView, FlatList,ImageBackground } from "react-native";
import Colors from "../constants/Colors";
import Dimensions from "../constants/Dimensions";
import {Context as ShopMemberContext} from '../context/ShopMemberContext'

const  ShopPointDetail = ({route}) => {
    const { shopId } = route.params;
    const {state : {shopMember,shopProfile},getShopProfile}= useContext(ShopMemberContext)
    const [imageVisible, setImageVisible] = useState(false);
    const [redeemVisible, setRedeemVisible] = useState(false);
    const [image, setImage] = useState();
    let aShop = shopProfile.filter((item) => {return(item.shopId == shopId )})
    let reward = aShop[0].reward
    console.log(reward)
    let aShopMember = shopMember.filter((item) => {return(item.shopId == shopId )})
    console.log(aShopMember)

    return (
        <View style={{backgroundColor:'white',flex:1,justifyContent:'center'}} >
         {/* part 1 รายละเอียดร้านค้า*/}
          <ImageBackground source={{uri : aShop[0].imageId}} style={{width:Dimensions.Width,height:Dimensions.Width/1.5,justifyContent:'flex-end'}}>
              <View style={{backgroundColor:'white',width:Dimensions.Width,opacity:0.8,padding:5,borderTopRightRadius:10,borderTopLeftRadius:10}} >
                <View style={{alignSelf:'center'}} >
                    <Text style={{fontSize:20,fontWeight:'bold'}}>{aShop[0].shopName}</Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <Text style={{fontSize:16,fontWeight:'bold'}}>ที่อยู่ : </Text>
                    <Text style={{fontSize:16}} numberOfLines={2}>{aShop[0].address}</Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <Text style={{fontSize:16,fontWeight:'bold'}}>เบอร์ติดต่อ : </Text>
                    <Text style={{fontSize:16}} numberOfLines={2}>{aShop[0].tel}</Text>
                </View>
                <View style={{flexDirection:'row'}} >
                    <Text style={{fontSize:16,fontWeight:'bold'}}>แต้มสะสม : </Text>
                    <Text style={{fontSize:16}} numberOfLines={2}>{aShopMember[0].remainPoint}</Text>
                </View>
              </View>
          </ImageBackground>
    

          <ScrollView>      
    {/* part 2 เส้นแบ่งแลกของรางวัล*/}
            <View style={{alignSelf:'center',marginTop:10}} >
                <Text numberOfLines={2} style={{fontSize:18,fontWeight:'bold'}}>แลกของรางวัล</Text>
            </View>

    {/* part 3 รายละเอียดของรางวัล*/}
            
            <FlatList
              showsVerticalScrollIndicator={false}
              data={reward}
              keyExtractor={(item) => item.rewardId}
              renderItem={({ item }) => {
              return (
                <View style={styles.reward} >
                  <Text style = {{alignSelf:'center',fontSize:24,fontWeight:'bold',color:'black'}} >{item.rewardName}</Text>
                  
                  <View style = {{flexDirection:'row',alignSelf:'center'}} >
                      
                      <View style={{marginLeft:10,justifyContent:'center'}} >
                         
                      
                          <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{item.pointConsume} คะแนน = </Text>
                      </View>
                      <View>
                          <TouchableOpacity onPress = {() => {setImage(item.imageId),setImageVisible(true)}} >
                              <Image source={{uri : item.imageId}} style={{height:Dimensions.Width/3,width:Dimensions.Width/3}}/>
                          </TouchableOpacity>
                      </View>
                  </View>
                  <View style={{flexDirection:'row',padding:8}} >
                    <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>รายละเอียด : </Text>
                    <Text style={{fontSize:16}} numberOfLines={2}>{item.detail}</Text>
                </View>
                  
                  <TouchableOpacity onPress = {() => {setRedeemVisible(true)}} >
                      <View style = {styles.redeem}>
                          <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>แลกรางวัล</Text>
                      </View>
                  </TouchableOpacity>      
              </View>
              )}}
            />

    {/* part 4 modal ของรางวัล เพื่อยืนยันการแลก*/}
            <Modal
              animationType="fade"
              transparent={true}
              visible={imageVisible}
              onRequestClose={() => {
                setImageVisible(!imageVisible);
              }}
            >
                <TouchableOpacity 
                  style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}} 
                  activeOpacity={1} 
                  onPress={() => {setImageVisible(false)}}
                >

                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <View  >
                                <Image source={{uri : image}} style={{height:Dimensions.Width/1.5,width:Dimensions.Width/1.5}}/>
                            </View>
                        </View>
                       
                    </TouchableWithoutFeedback>
                </TouchableOpacity> 
            </Modal>

    {/* part 5 Modal ยืนยันแลกของรางวัล*/}
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
                            <View>
                              <Text>ชื่อสินค้า</Text>
                              <Text>ที่อยู่ในการจัดส่ง</Text>
                              <Text>ระยะเวลาในการจัดส่ง</Text>
                              
                            </View>
                            <TouchableOpacity onPress ={()=> {setRedeemVisible(false)}} >
                            <Text>ยืนยัน</Text>
                            </TouchableOpacity>
                        </View>
                       
                    </TouchableWithoutFeedback>
                </TouchableOpacity> 
            </Modal>
          </ScrollView>
          
        </View>
    );
};

const styles = StyleSheet.create({
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
    modalView: {
      width:'80%',
      marginTop:50,
      alignSelf:'center',
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
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
      // width:'95%',
      margin:10,
      backgroundColor:'white',
      backgroundColor:'white',
      padding:10,
      borderRadius:8,
      shadowColor:'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:10,
        elevation:3
    }
})

export default ShopPointDetail;