import React, {useEffect, useState, useContext, useCallback} from "react";

import { 
  Text, 
  StyleSheet, 
  View,
  ScrollView, 
  Modal, 
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback ,
  FlatList,
  Linking
} from "react-native";
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors'
import db from "../../db/firestore";
import {Context as BrandMemberContext} from '../context/BrandMemberContext';
import {Context as CustomerProfileContext} from '../context/CustomerProfileContext'
import {Context as ShopMemberContext} from '../context/ShopMemberContext'
import {Context as ShopCouponContext} from '../context/ShopCouponContext'

import {PacmanIndicator,} from 'react-native-indicators';
import QRCode from 'react-native-qrcode-svg';
import { BrandMemberHook } from "../Hooks";
import { CustomerHook } from "../Hooks";
import { ShopMemberHook } from "../Hooks";
import Fonts from "../constants/Fonts";
import Carousel from "../../component/Carousel";
import Catalog from "../../component/Catalog";
import { Feather, FontAwesome5 } from '@expo/vector-icons'; 

const  RedeemScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [couponVisible, setCouponVisible] = useState(false);
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [productVisible, setProductVisible] = useState(false);
    const {state : {customerProfile}}= useContext(CustomerProfileContext);
    const {state : {shopProduct,priceOff,buy1Get1,buy2Cheaper,buy2Free1}}= useContext(ShopMemberContext)
    const {fetchShopCoupon}= useContext(ShopCouponContext)
    const [fetchCustomerProfile]= CustomerHook();
    const [fetchBrandMember]= BrandMemberHook();
    const [fetchShopMember]= ShopMemberHook();
    const [image, setImage] = useState('')
    const [filterShop, setFilterShop] = useState([])
    const [productName, setProductName] = useState('')
    const [promotionType, setPromotionType] = useState('Buy 1 Get 1')
    const [carousel, setCarousel] = useState()
    const [modalAds, setModalAds] = useState(false)
    const [ads, setAds] = useState()
    
    const loadStock = async() => {
      await fetchCustomerProfile() 
      await fetchBrandMember()
      await fetchShopMember()
      await db.collection('AdminSetting').doc('customerCarousel').get().then(function(snapshot){
          let xx = snapshot.data()
          setCarousel(xx.picture)
        })
      await db.collection('AdminSetting').doc('customerAdsModal').get().then(function(snapshot){
        let xx = snapshot.data()
        setAds(xx.picture[Math.floor(Math.random() * xx.picture.length)])
        console.log(xx.picture[Math.floor(Math.random() * xx.picture.length)]);
        console.log(xx.picture.length)
      })
      await setModalVisible(false)
      await setModalAds(true)
      await fetchShopCoupon()
    }
    
    useEffect(() => {
          loadStock()
          console.log('i fire once')
    },[])

    useEffect(()=>{
      const arrAdvertise = ['A','B','C'];
      console.log(arrAdvertise[Math.floor(Math.random() * arrAdvertise.length)]);
    },[])


    const useCoupon = () => {
      let token = customerProfile[0].id+new Date()
      db.collection('customer').doc(customerProfile[0].id).update({token:token})
      setToken(token);
      setCouponVisible(true);
      setName(customerProfile[0].customerName);
      console.log(customerProfile)
    }

    const showProduct = (item) => {
        let filterShopProduct = shopProduct.filter((a) => {return(a.sku == item.sku)})
        setFilterShop(filterShopProduct)
        setImage(item.imageId)
        setProductVisible(true)
        setProductName(item.name)
    }

    return (
      <View style={{flex:1,alignItems:'center',backgroundColor:'white'}} >
        {carousel !== undefined && <Carousel data ={carousel} />}
        <View style={styles.bar} >
            <TouchableOpacity 
              style={{width:'50%',alignItems:'center',justifyContent:'center',borderRightWidth:1,borderColor:Colors.InputColor,height:'50%'}} 
              onPress={() =>{navigation.navigate("redeemCoupon")}}
            >
              <Image source={require('../../image/coupon.png')} style={{width:30,height:30}} />
              <Text style={Fonts.md}>คูปองของฉัน</Text>
            </TouchableOpacity >
            <TouchableOpacity 
              style={{width:'50%',alignItems:'center',justifyContent:'center'}}
              onPress={() =>{navigation.navigate("redeemReward")}}
            >
              <Text style={Fonts.md}>รางวัลของฉัน</Text>
            </TouchableOpacity>
          </View>

        <View style={{height:40,marginTop:50}} >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              {(promotionType == 'Buy 1 Get 1')
                ?<TouchableOpacity style={styles.border} >
                    <View style={styles.choose} >
                      <Text style={Fonts.md}>1 แถม 1</Text>
                    </View>
                </TouchableOpacity>
                :<TouchableOpacity style={styles.border} onPress={() => {setPromotionType('Buy 1 Get 1')}}> 
                    <Text style={Fonts.md}>1 แถม 1</Text>
                </TouchableOpacity> 
              }
              {(promotionType == 'Price Off')
                ?<TouchableOpacity  style={styles.border} >
                  <View style={styles.choose} >
                      <Text style={Fonts.md} >ลดราคา</Text>
                  </View>
                </TouchableOpacity>
                :<TouchableOpacity style={styles.border} onPress={() => {setPromotionType('Price Off')}}>
                    <Text style={Fonts.md} >ลดราคา</Text>
                </TouchableOpacity> 
              }
              {(promotionType == 'Buy 2 Cheaper')
                ?<TouchableOpacity  style={styles.border} >
                  <View style={styles.choose} >
                    <Text style={Fonts.md} >2 ชิ้นถูกกว่า</Text>
                  </View>
                </TouchableOpacity>
                :<TouchableOpacity style={styles.border} onPress={() => {setPromotionType('Buy 2 Cheaper')}}>
                    <Text style={Fonts.md} >2 ชิ้นถูกกว่า</Text>
                </TouchableOpacity>
              }
              {(promotionType == 'Buy 2 Get 1')
                ?<TouchableOpacity  style={styles.border}>
                  <View style={styles.choose} >
                    <Text style={Fonts.md} >2 แถม 1</Text>
                  </View>
                </TouchableOpacity >
                :<TouchableOpacity style={styles.border} onPress={() => {setPromotionType('Buy 2 Get 1')}}>
                    <Text style={Fonts.md} >2 แถม 1</Text>
                </TouchableOpacity >
              }
          </ScrollView>
        </View>
        
        {promotionType == 'Price Off' && (<Catalog data={priceOff} press ={showProduct}/>)}
        {promotionType == 'Buy 1 Get 1' && (<Catalog data={buy1Get1} detail='2 ชิ้น ปกติ' multiply={2} press ={showProduct} />)}
        {promotionType == 'Buy 2 Cheaper' && (<Catalog data={buy2Cheaper} detail='2 ชิ้น ปกติ' multiply={2} press ={showProduct} />)}
        {promotionType == 'Buy 2 Get 1' && (<Catalog data={buy2Free1} detail='3 ชิ้น ปกติ' multiply={3} press ={showProduct} />)}

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
                    <View style={{ margin: 20, backgroundColor: "white",alignSelf:'center',padding:20,alignItems:'center',borderRadius:30}}>
                        <Text style={Fonts.md}>กรุณาแสดง Qrcode ต่อร้านค้า</Text>
                        <QRCode
                            value={token}
                            logo={require('../../image/241742403_188453900052739_8567756178149387658_n.jpg')}
                            logoSize={Dimensions.Width/7}
                            size={Dimensions.Width/1.5}
                        />
                        <Text style={Fonts.lg} >คุณ {name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>

        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.modalView}>
              <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}} >      
                <Image source = {require('../../image/241742403_188453900052739_8567756178149387658_n.jpg')} style={{width:Dimensions.Width/1.5, height:Dimensions.Width/1.5}}/>            
                <View style = {{height:80,width:Dimensions.Width}} >
                    <PacmanIndicator color= {Colors.primaryColor} size = {60} />
                </View>
              </View>
            </View>
        </Modal>
    
        <TouchableOpacity style={styles.coupon} onPress ={useCoupon}  >
            <Text style={Fonts.mdw}>ใช้</Text>
            <Text style={Fonts.mdw} >คูปอง</Text>
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
                        <View style={styles.product}>
                            <View style={{flexDirection:'row',width:'100%'}} >
                                <View style={{flex:1}} >
                                    <Image source={{uri:image}} style={{height:Dimensions.Width/2.5,width:Dimensions.Width/2.5}}/>
                                </View>
                                <View style={{flex:1,paddingTop:10}}>
                                  <Text style={Fonts.lg} >{productName}</Text>
                                </View>
                            </View>
                            <Text style={Fonts.lg} >ค้นพบ : {filterShop.length} ร้านค้าใกล้คุณ</Text>
                            <FlatList
                              data={filterShop}
                              keyExtractor={(item) => item.shopId}
                              scrollEnabled
                              renderItem={({ item }) => {
                              return (
                                <View style={{flexDirection:'row',padding:5,width:Dimensions.Width/1.2}}  >
                                  <View >
                                      <Image source={{uri:item.shopImageId}} style={{width:100,height:100,borderRadius:15}} />
                                  </View>
                                  <View style={{paddingLeft:5,width:'50%'}} >
                                      <Text style={{...Fonts.lg,...{color:Colors.primaryColor}}} >มีสินค้า {item.instock} ชิ้น</Text>
                                      <Text style={Fonts.md} >{item.shopName}</Text>
                                      <View style={{flexDirection:'row',alignItems:'center'}} >
                                          <Text style={Fonts.sm}>โทร : </Text>
                                          <Text>{item.shopTel}</Text>
                                          <TouchableOpacity onPress={() =>{Linking.openURL(`tel:${item.shopTel}`)}} >
                                            <Feather name="phone-call" size={24} color="black" />
                                          </TouchableOpacity>
                                          
                                      </View>
                                      <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() =>{Linking.openURL("https://lin.ee/X5atVYI")}}>
                                        <Text>สั่งผ่านไลน์---</Text>
                                        <FontAwesome5 name="line" size={30} color="#56c759" />
                                      </TouchableOpacity>
                                      
                                  </View>    
                                </View>
                              )}}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity> 
            </Modal>
            {ads && 
              <Modal
              animationType="fade"
              transparent={true}
              visible={modalAds}
              onRequestClose={() => {
                setModalAds(false);
              }}
            >
              <View style={{...styles.centeredView,...{backgroundColor:'rgba(0,0,0,0.5)',opacity:0.9,marginTop:0}}}>
                <TouchableOpacity style={{backgroundColor:'white',borderRadius:15}} onPress={() => {setModalAds(false)}} >
                  <Image source={{uri:ads?.uri}} style={{width:(Dimensions.Width/1.1)*0.96,height:(Dimensions.Width/1.1)*1.2,borderRadius:15}} />
                </TouchableOpacity>
              </View>
            </Modal> 
            }        
      </View> 
    );  
}

const styles = StyleSheet.create({
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
    product:{
      backgroundColor: "white",
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
      borderRadius:15,
      padding:10
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
    borderColor:'#ff6900',
    height:35,
    width:100,
  },
  border : {
    borderLeftWidth:1,
    paddingRight:8,
    borderColor:Colors.InputColor,
    paddingLeft:8,
    justifyContent:'center',
    height:40,
    width:110,
    alignItems:'center',
  },
  bar : {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor:'white',
    width:'90%',
    borderRadius:8,
    alignSelf:'center',
    position:'absolute',
    height:60,
    marginTop:180,
    zIndex:999,
    flexDirection:'row',
    alignItems:'center',
    
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  });
export default RedeemScreen;