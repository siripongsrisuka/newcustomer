import React, {useEffect, useState, useContext} from "react";
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
} from "react-native";
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors'
import db,{getCustomerProfile,getBrandMember} from "../../db/firestore";
import {Context as BrandMemberContext} from '../context/BrandMemberContext';
import {Context as CustomerProfileContext} from '../context/CustomerProfileContext'
import {Context as ShopMemberContext} from '../context/ShopMemberContext'

import {PacmanIndicator,} from 'react-native-indicators';
import QRCode from 'react-native-qrcode-svg';
import { BrandMemberHook } from "../Hooks";
import { CustomerHook } from "../Hooks";
import { ShopMemberHook } from "../Hooks";
import { LinearGradient } from 'expo-linear-gradient';
import Fonts from "../constants/Fonts";
import Carousel from "../../component/Carousel";


const  RedeemScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [couponVisible, setCouponVisible] = useState(false);
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [productVisible, setProductVisible] = useState(false);
    const {state : {brandMember}}= useContext(BrandMemberContext);
    const {state : {customerProfile}}= useContext(CustomerProfileContext);
    const {state : {shopProduct,priceOff,buy1Get1,buy2Cheaper,buy2Free1,shopMember}}= useContext(ShopMemberContext)
    const [fetchCustomerProfile]= CustomerHook();
    const [fetchBrandMember]= BrandMemberHook();
    const [fetchShopMember]= ShopMemberHook();
    const [image, setImage] = useState('')
    const [filterShop, setFilterShop] = useState([])
    const [productName, setProductName] = useState('')
    const [promotionType, setPromotionType] = useState('Buy 1 get 1')
    
    useEffect(()=>{
        const loadStock = async() => {
          await fetchCustomerProfile() 
          await fetchBrandMember()
          await fetchShopMember()
          await setTimeout(() => {
            setModalVisible(false)  
          },100)
        }
        loadStock();
    },[])

    const useCoupon = () => {
      setToken(customerProfile[0].token);
      setCouponVisible(true);
      setName(customerProfile[0].customerName);
    }

    const showProduct = (item) => {
        let filterShopProduct = shopProduct.filter((a) => {return(a.sku == item.sku)})
        setFilterShop(filterShopProduct)
        setImage(item.imageId)
        setProductVisible(true)
        setProductName(item.name)
    }

    const rawdata = [
      {uri:"https://image.makewebeasy.net/makeweb/0/l3UtzXJ4K/DefaultData%2FAA4ED92E_8459_4E25_A5AA_07C67B349078.png?v=202012190947",id:1},
      {uri:'https://image.makewebeasy.net/makeweb/0/l3UtzXJ4K/DefaultData%2FDBD52E06_C48F_4EC8_B364_A53F9200B4FA.png?v=202012190947',id:2},
      {uri:'https://image.makewebeasy.net/makeweb/0/l3UtzXJ4K/DefaultData%2FD9A5AE20_BF26_407F_8763_7152BBDBC504.png?v=202012190947',id:3},
      {uri:'https://image.makewebeasy.net/makeweb/0/l3UtzXJ4K/DefaultData%2F29BA1F3F_F8B9_43DF_A3EA_33B7BE22D3FC.png?v=202012190947',id:4},
      {uri:'https://image.makewebeasy.net/makeweb/0/l3UtzXJ4K/DefaultData%2F6EF600DE_DB2E_4F04_BD98_6C1916B2F21F.png?v=202012190947',id:5}
    ]

    return (
      <View style={{flex:1,alignItems:'center',backgroundColor:'white'}} >
                <Carousel data ={rawdata} />

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
              {(promotionType == 'Buy 1 get 1')
                ?<TouchableOpacity style={styles.border} >
                    <View style={styles.choose} >
                      <Text style={Fonts.md}>1 แถม 1</Text>
                    </View>
                </TouchableOpacity>
                :<TouchableOpacity 
                    style={styles.border}
                    onPress={() => {setPromotionType('Buy 1 get 1')}}
                  > 
                    <Text style={Fonts.md}>1 แถม 1</Text>
                  </TouchableOpacity> 
              }
              {(promotionType == 'Price off')
                ?<TouchableOpacity  style={styles.border} >
                  <View style={styles.choose} >
                      <Text style={Fonts.md} >ลดราคา</Text>
                  </View>
                </TouchableOpacity>
                :<TouchableOpacity 
                    style={styles.border}
                    onPress={() => {setPromotionType('Price off')}}
                >
                  <View style={styles.notChoose}>
                    <Text style={Fonts.md} >ลดราคา</Text>
                  </View>
                </TouchableOpacity> 
              }
              {(promotionType == 'Buy 2 Cheaper')
                ?<TouchableOpacity  style={styles.border} >
                  <View style={styles.choose} >
                    <Text style={Fonts.md} >2 ชิ้นถูกกว่า</Text>
                  </View>
                </TouchableOpacity>
                :<TouchableOpacity 
                    style={styles.border}
                    onPress={() => {setPromotionType('Buy 2 Cheaper')}}
                >
                  <View style={styles.notChoose}>
                    <Text style={Fonts.md} >2 ชิ้นถูกกว่า</Text>
                  </View>
                </TouchableOpacity>
              }
              {(promotionType == 'Buy 2 get 1')
                ?<TouchableOpacity  style={styles.border}>
                  <View style={styles.choose} >
                    <Text style={Fonts.md} >2 แถม 1</Text>
                  </View>
                </TouchableOpacity >
                :<TouchableOpacity 
                  style={styles.border}
                  onPress={() => {setPromotionType('Buy 2 get 1')}}
                >
                  <View style={styles.notChoose}>
                    <Text style={Fonts.md} >2 แถม 1</Text>
                  </View>
                </TouchableOpacity >
              }
          </ScrollView>
        </View>
        
        
            
            {promotionType == 'Price off' && (
                <View style={{...styles.card,...{marginBottom:275}}} >
                    <LinearGradient
                        colors={['#e43a15', '#ff6a00']}
                        style={{height:50,alignItems:'center',justifyContent:'center',borderRadius:30}} 
                    >
                        <Text style={Fonts.xlwb} >ลดราคา</Text>
                    </LinearGradient>
                  <FlatList
                    data={priceOff}
                    keyExtractor={(item) => item.sku}
                    renderItem={({ item }) => {
                    return (
                      <TouchableOpacity onPress ={() => showProduct(item)} style={styles.newpromotion}  >
                        <LinearGradient
                          colors={['#ee0979', '#ff6a00']}
                          style={{width:"100%",borderTopRightRadius:20,borderTopLeftRadius:20,padding:7}}>
                          <Text numberOfLines={2} style={{fontSize:18,fontFamily: 'Prompt_400Regular',color:'white',textAlign:'center'}}>{item.name}</Text>
                        </LinearGradient>
                        <Image source={{uri:item.imageId}} style={{width:Dimensions.Width/2.5,height:Dimensions.Width/2.5}} />
                        {/* <Text>{item.name}</Text> */}
                        <View style={{flexDirection:'row',borderTopWidth:1,width:'90%',borderColor:Colors.InputColor,justifyContent:'center'}} >
                          <Text style={{textDecorationLine:'line-through',fontFamily: 'Prompt_400Regular'}} >{item.price} บาท</Text>
                        </View>
                        <Text style={{fontSize:28,color:'red',fontFamily: 'Prompt_500Medium'}}>{item.price - item.promotion[0].discount} บาท</Text>
                      </TouchableOpacity>
                    )}}
                  />
                </View>
            )}
            {promotionType == 'Buy 1 get 1' && (
                <View style={{...styles.card,...{marginBottom:275}}} >
                {/* <View style={{backgroundColor:Colors.primaryColor,height:50,alignItems:'center',justifyContent:'center',borderRadius:30}} >
                      <Text style={Fonts.xlwb} >ซื้อ 1 แถม 1</Text>
                  </View> */}
                  <LinearGradient
                      colors={['#e43a15', '#ff6a00']}
                      style={{height:50,alignItems:'center',justifyContent:'center',borderRadius:30}} 
                    >
                   <Text style={Fonts.xlwb} > 1 แถม 1</Text>
                  </LinearGradient>
                <FlatList
                  data={buy1Get1}
                  keyExtractor={(item) => item.sku}
                  renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress ={() => showProduct(item)} 
                    style={styles.newpromotion} >
                      <LinearGradient
                        colors={['#ee0979', '#ff6a00']}
                        style={{width:"100%",borderTopRightRadius:20,borderTopLeftRadius:20,padding:7}}>
                        <Text numberOfLines={2} style={{fontSize:18,fontFamily: 'Prompt_400Regular',color:'white',textAlign:'center'}}>{item.name}</Text>
                      </LinearGradient>
                      
                      <Image source={{uri:item.imageId}} style={{width:Dimensions.Width/2.5,height:Dimensions.Width/2.5}} />
                      <View style={{flexDirection:'row',borderTopWidth:1,width:'90%',borderColor:Colors.InputColor,justifyContent:'center'}} >
                        <Text style={Fonts.sm} >2 ชิ้นปกติ </Text>
                        <Text style={{textDecorationLine:'line-through',fontFamily: 'Prompt_400Regular'}}>{2*item.price} </Text>
                        <Text style={Fonts.sm} >บาท</Text>
                      </View>
                      <View style={{flexDirection:'row',alignItems:'flex-end'}} >
                        <Text style={{fontSize:28,color:'red',fontFamily: 'Prompt_500Medium'}}>{item.price} </Text>
                        <Text style={{fontSize:28,color:'red',fontFamily: 'Prompt_400Regular'}}>บาท</Text>
                      </View >
                    </TouchableOpacity>
                  )}}
                />
            </View>
            )}

            {promotionType == 'Buy 2 Cheaper' && (
              <View style={{...styles.card,...{marginBottom:275}}} >
                <LinearGradient
                      colors={['#e43a15', '#ff6a00']}
                      style={{height:50,alignItems:'center',justifyContent:'center',borderRadius:30}} 
                    >
                   <Text style={Fonts.xlwb} > 2 ชิ้นถูกกว่า</Text>
                  </LinearGradient>
                <FlatList
                  data={buy2Cheaper}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  keyExtractor={(item) => item.sku}
                  renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress ={() => showProduct(item)} style={styles.newpromotion}  >
                        <LinearGradient
                          colors={['#ee0979', '#ff6a00']}
                          style={{width:"100%",borderTopRightRadius:20,borderTopLeftRadius:20,padding:7}}>
                          <Text numberOfLines={1} style={{fontSize:18,fontFamily: 'Prompt_400Regular',color:'white',textAlign:'center'}}>{item.name}</Text>
                        </LinearGradient>
                      <Image source={{uri:item.imageId}} style={{width:Dimensions.Width/4,height:Dimensions.Width/4}} />
                      {/* <Text>{item.name}</Text> */}
                      <View style={{flexDirection:'row',borderTopWidth:1,width:'90%',borderColor:Colors.InputColor,justifyContent:'center'}} >
                        <Text style={Fonts.sm} >2 ชิ้นปกติ </Text>
                        <Text style={{textDecorationLine:'line-through',fontFamily: 'Prompt_400Regular'}}>{2*item.price} </Text>
                        <Text style={Fonts.sm} >บาท</Text>
                      </View>
                      <View style={{flexDirection:'row',alignItems:'flex-end'}} >
                        <Text style={{fontSize:28,color:'red',fontFamily: 'Prompt_500Medium'}}>{(2*item.price)  - item.promotion[0].discount}  </Text>
                        <Text style={{fontSize:28,color:'red',fontFamily: 'Prompt_400Regular'}}>บาท</Text>
                      </View >
                    </TouchableOpacity>
                  )}}
                />
              </View>
            )}
            {promotionType == 'Buy 2 get 1' && (
              <View style={{...styles.card,...{marginBottom:275}}} >
                <LinearGradient
                  colors={['#e43a15', '#ff6a00']}
                  style={{height:50,alignItems:'center',justifyContent:'center',borderRadius:30}} 
                >
                   <Text style={Fonts.xlwb} > 2 แถม 1</Text>
                </LinearGradient>
                <FlatList
                  data={buy2Free1}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.sku}
                  renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress ={() => showProduct(item)} style={styles.newpromotion}  >
                        <LinearGradient
                          colors={['#ee0979', '#ff6a00']}
                          style={{width:"100%",borderTopRightRadius:20,borderTopLeftRadius:20,padding:7}}>
                          <Text numberOfLines={2} style={{fontSize:18,fontFamily: 'Prompt_400Regular',color:'white',textAlign:'center'}}>{item.name}</Text>
                        </LinearGradient>
                        <Image source={{uri:item.imageId}} style={{width:Dimensions.Width/2.5,height:Dimensions.Width/2.5}} />
                        <View style={{flexDirection:'row',borderTopWidth:1,width:'90%',borderColor:Colors.InputColor,justifyContent:'center'}} >
                          <Text style={Fonts.sm} >3 ชิ้นปกติ </Text>
                          <Text style={{textDecorationLine:'line-through',fontFamily: 'Prompt_400Regular'}}>{3*item.price} </Text>
                          <Text style={Fonts.sm} >บาท</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'flex-end'}} >
                          <Text style={{fontSize:28,color:'red',fontFamily: 'Prompt_500Medium'}}>{(3*item.price)  - item.promotion[0].discount} </Text>
                          <Text style={{fontSize:28,color:'red',fontFamily: 'Prompt_400Regular'}}>บาท</Text>
                        </View >
                    </TouchableOpacity>
                  )}}
                />
            </View>
            )}

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

            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}} >      
                        <Image source = {require('../../image/241742403_188453900052739_8567756178149387658_n.jpg')} style={{width:Dimensions.Width/1.5, height:Dimensions.Width/1.5}}/>            
                        <View style = {{height:80,width:Dimensions.Width}} >
                            <PacmanIndicator color= {Colors.primaryColor} size = {60} />
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
            </View> 
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
                                  <View >
                                      <Image source={{uri:item.shopImageId}} style={{width:100,height:100}} />
                                  </View>
                                  <View style={{paddingLeft:5,width:'50%'}} >
                                      <Text style={{fontSize:20,fontWeight:'bold',color:Colors.primaryColor}} >มีสินค้า {item.instock} ชิ้น</Text>
                                      <Text style={{fontWeight:'bold'}} >{item.shopName}</Text>
                                      <View style={{flexDirection:'row'}} >
                                          <Text style={{fontWeight:'bold'}}>โทร : </Text>
                                          <Text>{item.shopTel}</Text>
                                      </View>
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
      margin:5,
      padding:5,
      backgroundColor:'white',
      borderRadius:8,
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
      borderRadius:8
    },
  notChoose: {
    justifyContent:'center',
    alignItems:'center',
    height:35,
    width:100,
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
  newpromotion : {
    width:'47%',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor:'white',
    borderRadius:30,
    marginTop:12,
    marginLeft:5,
    marginBottom:5,
    marginRight:5
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
    
  }
  });
export default RedeemScreen;