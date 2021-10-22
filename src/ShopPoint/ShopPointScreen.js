import React,{useContext} from "react";
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity} from "react-native";
import Dimensions from '../constants/Dimensions'
import Colors from "../constants/Colors";
import {Context as ShopMemberContext} from '../context/ShopMemberContext'
import db from '../../db/firestore'
import Fonts from "../constants/Fonts";

const  ShopPointScreen = ({navigation}) => {
    const {state : {shopMember,shopProfile},getShopProfile}= useContext(ShopMemberContext)
    const checkShop =  (shopId) => {
        let filter = shopProfile.filter((item) => {return(item.shopId == shopId)})
         if (filter.length == 0){
            db.collection('shop').where("shopId","==",shopId).get().then(function(snapshot){
                snapshot.forEach(function(docs){
                    shopProfile.push(docs.data())
                    getShopProfile(shopProfile)
                    navigation.navigate('ShopPointDetail',{shopId:shopId}) 
                })})
        } else {
            navigation.navigate('ShopPointDetail',{shopId:shopId}) 
        }
        
    }
    // console.log(shopMember)
    return (
        <View style = {styles.container} >
            <View style = {{borderColor:'#b5b5b5',flexDirection:'row',padding:10,borderBottomWidth:1,width:'95%',alignSelf:'center',justifyContent:'center'}} >
                <Text style={Fonts.md}>ร้านที่คุณสนับสนุน : </Text>
                <Text style={{...Fonts.md,...{color:Colors.primaryColor}}}>{shopMember.length} </Text>
                <Text style={Fonts.md}>ร้านค้า</Text>
            </View>
            <View style={{alignItems:'center',flex:1}} >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={shopMember}
                    keyExtractor={(item) => item.shopId}
                    renderItem={({ item }) => {
                    return (
                        <View style= {styles.card} >
                            <TouchableOpacity onPress= {()=> checkShop(item.shopId) }>
                                <View style={{flexDirection:'row'}} >
                                    <View style = {{width:'40%',height:Dimensions.Height/6}} >
                                        <Image style = {styles.image} source={{uri:item.shopImageId}} />
                                    </View>
                                    <View style={{marginLeft:10, width:"50%",marginTop:10,justifyContent:'space-between'}} >
                                        <View>
                                            <Text numberOfLines={1} style={Fonts.lg} >{item.shopName}</Text>
                                        </View>
                                        <View style = {{marginBottom:10}} >
                                            <Text style={Fonts.sm} >แต้มสะสม :{item.remainPoint} </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}}
                />
            </View>
        </View>
)}


const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'white',
    },

    card: {
        width:Dimensions.Width-20,
        height:Dimensions.Height/6,
        margin:5,
        backgroundColor:'white',
        borderRadius:15,
        shadowColor:'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height:2},
          shadowRadius:10,
          elevation:3,
    },
    image : {
        width:"100%",
        height:"100%",
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15
    },

})
export default ShopPointScreen;