import React, {useContext} from "react";
import { 
  Text, 
  StyleSheet, 
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList 
} from "react-native";
import Colors from '../constants/Colors'
import {Context as BrandMemberContext} from '../context/BrandMemberContext';
// import { BrandPointContext,BrandMemberContext } from "../context";

const RedeemDetail = ({navigation}) => {
    const {state : {brandMember}}= useContext(BrandMemberContext);
    console.log(brandMember)
    return (
        <View style={{flex:1}} >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={brandMember}
                keyExtractor={(item) => item.brandId}
                renderItem={({ item }) => {
                return (
                  <View style={styles.brandCoupon} >
                      <View style={{flex:1,borderRightWidth:1,borderColor:Colors.InputColor,justifyContent:'center'}} >
                          <Image 
                            source={{uri:item.brandLogoId}} 
                            style={{width:'100%',height:'100%'}}
                            resizeMode='stretch'
                          />
                      </View>
                      <TouchableOpacity onPress={() => navigation.navigate("BrandCoupon",{brandId:item.brandId})} style={{flex:1,borderColor:Colors.InputColor,height:'90%',justifyContent:'space-around',alignItems:'center'}}>
                          <Text style={{fontSize:18}} >{item.brandName} </Text>
                          <Text style={{color:Colors.primaryColor}} >คลิกดูคูปอง</Text>
                      </TouchableOpacity>
                  </View>
                )}}
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
    height:120,
    flexDirection:'row',
    alignItems:'center',
    margin:5
  }
})
export default RedeemDetail;