import React, {useEffect, useState, useContext} from "react";
import { 
  Text, 
  StyleSheet, 
  View,
  ScrollView, 
  Modal, 
  Pressable, 
  Image,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback ,
  FlatList,
} from "react-native";
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors'
import axios from 'axios';
import db,{getCustomerProfile,getBrandMember} from "../../db/firestore";
import {Context as BrandPointContext} from '../context/BrandPointContext';
import {Context as BrandMemberContext} from '../context/BrandMemberContext';
import {Context as CustomerProfileContext} from '../context/CustomerProfileContext'
import {Context as ShopMemberContext} from '../context/ShopMemberContext'

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
  import QRCode from 'react-native-qrcode-svg';
  import { MaterialIcons } from '@expo/vector-icons'; 
  import { BrandMemberHook } from "../Hooks";
  import { CustomerHook } from "../Hooks";
  import { ShopMemberHook } from "../Hooks";


const  RedeemScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [couponVisible, setCouponVisible] = useState(false);
    const [docId, setDocId] = useState('');
    const [name, setName] = useState('');
    const [productVisible, setProductVisible] = useState(false);
    const {getBrandData}= useContext(BrandPointContext);
    const {state : {brandMember}}= useContext(BrandMemberContext);
    const {state : {customerProfile}}= useContext(CustomerProfileContext);
    const {state : {shopProduct,priceOff,buy1Get1,buy2Cheaper,buy2Free1,shopMember}}= useContext(ShopMemberContext)
    const [fetchCustomerProfile]= CustomerHook();
    const [fetchBrandMember]= BrandMemberHook();
    const [fetchShopMember]= ShopMemberHook();
    const [image, setImage] = useState('')
    const [filterShop, setFilterShop] = useState([])
    const [productName, setProductName] = useState('')
    
   


    useEffect(()=>{
        const loadStock = async() => { 
          await getBrandData()
          await fetchBrandMember()
          await fetchCustomerProfile()
          await fetchShopMember()
          await setTimeout(() => {
            setModalVisible(false)  
          },1000)
          // db.collection("brandMember").add({
          //     brandId: 'Nestle',
          //     brandName:'Nestle',
          //     userId:'GkZhwokCkUgdKrmqhxRw',
          //     userName:'',
          //     userSexual:'',
          //     userTel:'',
          //     userBirthDay:'',
          //     usedPoint:100,
          //     remainPoint:1000,
          //     status:'member',
          //     reward: [
          //         {
          //             rewardId:'1',
          //             qty:70,
          //             status:'request/operation/sending/successful'
          //         }
          //     ],
          //     coupon: [
    
          //     ],
          //     address:'',
          //     tambon:'',
          //     district:'',
          //     province:'',
          //     state:'',
          //     postcode:'',
          //     startDate:'timestamp'

          // })
          
        }
        loadStock();
    },[])

    const useCoupon = () => {
      setDocId(customerProfile[0].token);
      setCouponVisible(true);
      setName(customerProfile[0].customerName);
    }

    const showProduct = (item) => {
      console.log(item)
        let copyShopProduct = shopProduct.slice()
        let filterShopProduct = copyShopProduct.filter((a) => {return(a.sku == item.sku)})
        setFilterShop(filterShopProduct)
        setImage(item.imageId)
        setProductVisible(true)
        setProductName(item.name)
    }

    return (
      <View style={{flex:1,alignItems:'center'}} >
        <View style={{height:100,backgroundColor:'white',width:"100%"}} >
          <Text>สถิติของคุณ</Text>
          <Text>จำนวนการเข้าร้านชำ/สัปดาห์ :</Text>
          <Text>การกระจายรายได้ที่เกิดจากคุณ/สัปดาห์ :</Text>
        </View>
        <ScrollView  >
            <View style={styles.card} >
           
            <View style={{backgroundColor:'red',height:50,alignItems:'center',justifyContent:'center'}} >
                  <Text style={{fontSize:30,fontWeight:'bold',color:'white'}} >ลดราคา</Text>
              </View>
            <FlatList
              data={priceOff}
              keyExtractor={(item) => item.sku}
              renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress ={() => showProduct(item)} style={{width:'50%',alignItems:'center',padding:5}} >
                  <Text style={{fontSize:20}} >{item.name}</Text>
                  <Image source={{uri:item.imageId}} style={{width:Dimensions.Width/2.5,height:Dimensions.Width/2.5}} />
                  {/* <Text>{item.name}</Text> */}
                  <Text style={{textDecorationLine:'line-through'}} >{item.price} บาท</Text>
                  <Text style={{fontSize:30,fontWeight:'bold',color:'red'}}>{item.price - item.promotion[0].discount} บาท</Text>
                </TouchableOpacity>
              )}}
            />
            </View>
            
            <View style={styles.card} >
           
            <View style={{backgroundColor:'red',height:50,alignItems:'center',justifyContent:'center'}} >
                  <Text style={{fontSize:30,fontWeight:'bold',color:'white'}} >ซื้อ 1 แถม 1</Text>
              </View>
            <FlatList
              data={buy1Get1}
              keyExtractor={(item) => item.sku}
              renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress ={() => showProduct(item)} style={{width:'50%',alignItems:'center',padding:10}} >
                  <Text style={{fontSize:20}}>{item.name}</Text>
                  <Image source={{uri:item.imageId}} style={{width:Dimensions.Width/2.5,height:Dimensions.Width/2.5}} />
                  {/* <Text>{item.name}</Text> */}
                  <View style={{flexDirection:'row'}} >
                    <Text>2 ชิ้นปกติ </Text>
                    <Text style={{textDecorationLine:'line-through'}}>{2*item.price} </Text>
                    <Text>บาท</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'flex-end'}} >
                    <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>2 ชิ้น </Text>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'red'}}>{item.price} </Text>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'red'}}>บาท</Text>
                  </View >
                </TouchableOpacity>
              )}}
            />
            </View>
            
            <View style={styles.card} >
            
            <View style={{backgroundColor:'red',height:50,alignItems:'center',justifyContent:'center'}} >
                  <Text style={{fontSize:30,fontWeight:'bold',color:'white'}} >ซื้อ 2 ชิ้นถูกกว่า</Text>
              </View>
            <FlatList
              data={buy2Cheaper}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              keyExtractor={(item) => item.sku}
              renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress ={() => showProduct(item)} style={{width:'50%',alignItems:'center',padding:5}} >
                  <Text style={{fontSize:20}}>{item.name}</Text>
                  <Image source={{uri:item.imageId}} style={{width:Dimensions.Width/2.5,height:Dimensions.Width/2.5}} />
                  {/* <Text>{item.name}</Text> */}
                 
                  <View style={{flexDirection:'row'}} >
                    <Text>2 ชิ้นปกติ </Text>
                    <Text style={{textDecorationLine:'line-through'}}>{2*item.price} </Text>
                    <Text>บาท</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'flex-end'}} >
                    <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>2 ชิ้น </Text>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'red'}}>{(2*item.price)  - item.promotion[0].discount} </Text>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'red'}}>บาท</Text>
                  </View >
                </TouchableOpacity>
              )}}
            />
            </View>
            
            <View style={{...styles.card,...{marginBottom:10}}} >
              <View style={{backgroundColor:'red',height:50,alignItems:'center',justifyContent:'center'}} >
                  <Text style={{fontSize:30,fontWeight:'bold',color:'white'}} >ซื้อ 2 แถม 1</Text>
              </View>
            
            <FlatList
              data={buy2Free1}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.sku}
              renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress ={() => showProduct(item)} style={{width:'50%',alignItems:'center',padding:10}} >
                  <Text style={{fontSize:20}}>{item.name}</Text>
                  <Image source={{uri:item.imageId}} style={{width:Dimensions.Width/2.5,height:Dimensions.Width/2.5}} />
                  {/* <Text>{item.name}</Text> */}
                  <View style={{flexDirection:'row'}} >
                    <Text>3 ชิ้นปกติ </Text>
                    <Text style={{textDecorationLine:'line-through'}}>{3*item.price} </Text>
                    <Text>บาท</Text>
                  </View>
                  <View style={{flexDirection:'row',alignItems:'flex-end'}} >
                    <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>3 ชิ้น </Text>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'red'}}>{(3*item.price)  - item.promotion[0].discount} </Text>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'red'}}>บาท</Text>
                  </View >
                </TouchableOpacity>
              )}}
            />
            </View>
            
            

            <Modal
                animationType="fade"
                transparent={true}
                visible={couponVisible}
                onRequestClose={() => {
                  setCouponVisible(false);
                }}
            >
                <TouchableOpacity 
                    style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center'}} 
                    activeOpacity={1} 
                    onPress={() => {setCouponVisible(false)}}
                >
                    <TouchableWithoutFeedback>
                        <View style={{ margin: 20, backgroundColor: "white",alignSelf:'center',padding:20,alignItems:'center'}}>
                            <Text style={{fontSize:22}}>กรุณาแสดง Qrcode ต่อร้านชำ</Text>
                            <QRCode
                                value={docId}
                                logo={require('../../image/Shopcham_FINAL_CF-05.png')}
                                logoSize={Dimensions.Width/7}
                                size={Dimensions.Width/1.5}
                            />
                            <Text style={{fontSize:22}}>คุณ {name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
            

            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}} >      
                        <Image source = {require('../../image/Shopcham_FINAL_CF-03.png')} style={{width:Dimensions.Width/1.5, height:Dimensions.Width/1.5}}/>            
                        <View style = {{height:80,width:Dimensions.Width}} >
                            <PacmanIndicator color= {Colors.primaryColor} size = {60} />
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
            </View>
        </ScrollView>   
        <TouchableOpacity style={styles.coupon} onPress ={useCoupon}  >
                <Image source={require('../../image/coupon.png')} style={{width:30,height:30}} />
                <Text style={{fontSize:16,color:'white'}} >คูปอง</Text>
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={productVisible}
              onRequestClose={() => {
                setProductVisible(false);
              }}
            >
                <TouchableOpacity 
                  style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',alignItems:'center'}} 
                  activeOpacity={1} 
                  onPress={() => {setProductVisible(false)}}
                >

                    <TouchableWithoutFeedback>
                        <View style={{
                              backgroundColor: "white",
                              // padding: 1,
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
                              maxHeight:"80%",
                              borderRadius:8
                            }}>
                              <View style={{flexDirection:'row',width:'100%'}} >
                                  <View style={{flex:1}} >
                                      <Image source={{uri:image}} style={{height:Dimensions.Width/2.5,width:Dimensions.Width/2.5}}/>
                                  </View>
                                <View style={{flex:1,paddingTop:10}}>
                                  <Text style={{fontSize:18,fontWeight:'bold'}} >{productName}</Text>
                                </View>
                              </View>
                                
                               
                                <Text style={{fontSize:22}} >ค้นพบ : {filterShop.length} ร้านค้าใกล้คุณ</Text>
                                <FlatList
                                  data={filterShop}
                                  keyExtractor={(item) => item.shopId}
                                  renderItem={({ item }) => {
                                  return (
                                    <View style={{flexDirection:'row',padding:5,width:Dimensions.Width/1.2}}  >
                                      <View>
                                          <Image source={{uri:item.shopImageId}} style={{width:100,height:100}} />
                                      </View>
                                      
                                      <View style={{paddingLeft:5}} >
                                        <Text style={{fontSize:20,fontWeight:'bold',color:Colors.primaryColor}} >มีสินค้า {item.instock} ชิ้น</Text>
                                        <Text>{item.shopName}</Text>
                                        <Text>โทร : {item.shopTel}</Text>
                                        <Text>ที่อยู่</Text>
                                      </View>
                                      
                                    </View>
                                  )}}
                                />
                            
                           
                        </View>
                       
                    </TouchableWithoutFeedback>
                </TouchableOpacity> 
            </Modal>        
      </View>
        
    );  
}

const styles = StyleSheet.create({
    main: {
      flex:1,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      backgroundColor: "white",
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width:'100%',
      height:'100%'
    },
    coupon: {
      width:70,
      height:70,
      backgroundColor:Colors.primaryColor,
      position:'absolute',
      right:10,
      bottom:10,
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      zIndex:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      opacity:0.7
    },
    card: {
      width:Dimensions.Width-15,
      // height:Dimensions.Height/6,
      margin:5,
      padding:5,
      backgroundColor:'white',
      borderRadius:8,
      shadowColor:'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:10,
        elevation:3,
  },
  });
export default RedeemScreen;



          // db.collection("shopProduct").add({
          //     shopId:'nnyWrz1vXo3dZmZXp5RJ',
          //     address:'',
          //     tambon:'',
          //     district:'',
          //     province:'',
          //     state:'',
          //     postcode:'',
          //     brandId:'Kirei',
          //     price:35,
          //     cost:12,
          //     instock:100,
          //     type:'coBrand',
          //     toggleSwitch: true,
          //     sku:'Bz57FSpMGlLHAhrdtvez'
          // })