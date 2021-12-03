import React from "react";
import { 
  Text, 
  StyleSheet, 
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Dimensions from "../src/constants/Dimensions";
import Colors from "../src/constants/Colors";
import Fonts from "../src/constants/Fonts";

const Catalog = ({data,detail='1 ชิ้นปกติ',multiply=1,press,stock=0}) => {
    
    return(
        <View style={{...styles.card,...{marginBottom:280}}} >
                <FlatList
                  data={data}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.sku}
                  renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress ={() => {press(item)}} style={styles.newpromotion} >
                      <LinearGradient
                        colors={['#ee0979', '#ff6a00']}
                        style={{width:"100%",borderTopRightRadius:20,borderTopLeftRadius:20,padding:7}}>
                        <Text numberOfLines={1} style={{fontSize:18,fontFamily: 'Prompt_400Regular',color:'white',textAlign:'center'}}>{item.name}</Text>
                      </LinearGradient>
                     <View style={{width:'100%',alignItems:'center',justifyContent:'center'}} >
                       {item.point.length > 0 && (
                          <View style={{position:'absolute',left:0,zIndex:99,backgroundColor:Colors.primaryColor,flexDirection:'row',borderTopRightRadius:10,borderBottomRightRadius:10,alignItem:'center',bottom:5}} >
                            <View style={{alignItems:'center',paddingRight:2}} >
                              <Text style={{...Fonts.sm,...{color:'white'}}} textAlign='center' >รับ</Text>
                              <Text style={{...Fonts.sm,...{fontSize:10,color:'white'}}}>คะแนน</Text>
                            </View>
                            <View style={{padding:3,borderLeftWidth:1,height:'70%',justifyContent:'center',alignSelf:'center',borderColor:'white'}} >
                              <Text style={{...Fonts.sm,...{fontSize:16,color:'white'}}}>{item.point[0].point}</Text>
                            </View>
                          </View>
                       )}
                       
                       
                     <Image source={{uri:item.imageId}} style={{width:Dimensions.Width/3,height:Dimensions.Width/3,borderRadius:10}} />
                     </View>

                      <View style={{flexDirection:'row',borderTopWidth:1,width:'90%',borderColor:Colors.InputColor,justifyContent:'center'}} >
                        <Text style={Fonts.sm} >{detail} </Text>
                        <Text style={{textDecorationLine:'line-through',fontFamily: 'Prompt_400Regular'}}>{multiply*item.price} </Text>
                        <Text style={Fonts.sm} >บาท</Text>
                      </View>
                      <View style={{flexDirection:'row',alignItems:'flex-end'}} >
                        <Text style={{fontSize:28,color:'red',fontFamily: 'Prompt_500Medium'}}>{(multiply*item.price)- item.promotion[0].discount} </Text>
                        <Text style={{fontSize:28,color:'red',fontFamily: 'Prompt_400Regular'}}>บาท</Text>
                      </View >
                    </TouchableOpacity>
                  )}}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width:Dimensions.Width-15,
        margin:5,
        padding:5,
        backgroundColor:'white',
        borderRadius:8,
        marginTop:0
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
        marginLeft:5,
        marginBottom:10,
        marginRight:5
      },
})

export default Catalog;