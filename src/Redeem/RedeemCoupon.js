import React, {useContext} from "react";
import { 
  Text, 
  StyleSheet, 
  View,
  Image,
  FlatList
} from "react-native";
import Colors from '../constants/Colors'
import Fonts from "../constants/Fonts";
import {Context as BrandMemberContext} from '../context/BrandMemberContext'

const  redeemCoupon = () => {
    const {state : {brandMember}}= useContext(BrandMemberContext);
    let allCoupon = []
    brandMember.forEach(element => {
        element.coupon.forEach((coupon) => {
            allCoupon.push(coupon)
        })
    });
    
    return(
        <View style={{flex:1}} >
            <FlatList
              data={allCoupon}
              keyExtractor={(item) => item.sku}
              renderItem={({item}) => {
              return (
                <View style={styles.brandCoupon} >
                  <View style={{flex:1,borderRightWidth:1,borderColor:Colors.InputColor,height:'90%',justifyContent:'center',alignItems:'center'}} >
                    <Image 
                      source={{uri:item.imageId}} 
                      style={{width:'90%',height:'90%'}}
                      resizeMode='stretch'
                    />
                  </View>
                  <View style={styles.coupon} >
                      <View>
                          <Text style={Fonts.lg} >{item.productName}</Text> 
                          <Text style={Fonts.sm} numberOfLines={3}>รายละเอียด : {item.productDetail} </Text>
                      </View>
                      <View>
                          <Text style={{fontSize:30,color:Colors.primaryColor,fontFamily: 'Prompt_400Regular'}}>x {item.qty} ชิ้น</Text>
                      </View> 
                  </View>
                </View>
              )
              }}
            />
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
      height:160,
      flexDirection:'row',
      alignItems:'center',
      margin:5
    },
    coupon : {
      flex:1.5,
      borderRightWidth:1,
      borderColor:Colors.InputColor,
      height:'90%',
      paddingLeft:5,
      justifyContent:'space-between'
    }
  })

export default redeemCoupon;