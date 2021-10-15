import React, {useContext, useState} from "react";
import { Text, StyleSheet, View, Image,TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import Dimensions from '../constants/Dimensions';
import {Context as BrandMemberContext} from '../context/BrandMemberContext';
import Colors from '../constants/Colors'
import db from "../../db/firestore";
import Fonts from "../constants/Fonts";

const  BrandPointDetails = ({route}) => {
    const {brandId} = route.params
    const {state : {brandMember,brandProfile},getBrandMember}= useContext(BrandMemberContext);
    let filterBrandReward = brandProfile.filter((brand)=> brand.brandId == brandId)
    let brandReward = filterBrandReward[0].reward
    const [showReward, setShowReward] = useState(false);
    const [rewardData, setRewardData] = useState({})

    let filterBrandMember = brandMember.filter((brand)=> brand.brandId == brandId)
    
    const RedeemPoint = () => {
        if(rewardData.pointConsume >filterBrandMember[0].remainPoint){
            alert('สะสมแต้มเพิ่มอีกหน่อย แล้วมารับรางวัลไปได้เลย')
        } else {
            filterBrandMember[0].remainPoint = filterBrandMember[0].remainPoint - rewardData.pointConsume
            filterBrandMember[0].reward.push({
                rewardId:rewardData.rewardId,
                rewardName:rewardData.rewardName,
                rewardDetail:rewardData.rewardDetail,
                rewardImageId:rewardData.imageId,
                qty:1,
                status:'request',
                dateTime:String(new Date())
            })
            getBrandMember(brandMember)
            db.collection("brandMember").doc(filterBrandMember[0].doc).update({
                remainPoint : filterBrandMember[0].remainPoint,
                reward :filterBrandMember[0].reward
            })
            alert('แลกรางวัลสำเร็จ')
        }
        setShowReward(false)
    };



    return (
        <View style = {{justifyContent:'center',alignItems:'center',backgroundColor:'white',flex:1}} >
            <View style ={{flexDirection:'row'}} >
                <Image source={{uri: filterBrandReward[0].imageId}} style={{height:140,width:140}}  />
                <View style = {{padding:5,alignSelf:'center',flex:1}} >
                    <View style={{marginLeft:5}} >
                        <Text style={{fontSize:16,fontWeight:'bold'}} >{filterBrandReward[0].brandName}</Text>
                    </View>
                    <View style={{marginLeft:5}}><Text>{filterBrandReward[0].address}</Text></View>
                    
                    <View style={{flexDirection:'row',padding:5}} >
                        <Text style={{fontWeight:'bold'}} >แต้มสะสม : </Text>
                        <Text>{brandMember[0].remainPoint}</Text>
                    </View>
                </View>
            </View>
            
            <View style={{ width:'90%',borderBottomWidth:1,alignItems:'center',height:30,justifyContent:'center',borderColor:'#b5b5b5'}}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>ของรางวัลทั้งหมด</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={brandReward}
                keyExtractor={(item) => item.rewardId}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card} >
                            <TouchableOpacity onPress = {() => {setShowReward(true),setRewardData(item)}} >
                                <Image source={{uri: item.imageId}} style={{height:'100%',width:'100%',borderRadius:10}} resizeMode='stretch' />
                            </TouchableOpacity>
                            
                            <View style = {styles.absulute} >
                                <Text style={Fonts.smw}>ใช้ {item.pointConsume} คะแนน</Text>
                            </View>  
                               
                                {/* <View style={{marginLeft:10,justifyContent:'space-between'}} >
                                    <View>
                                        <Text style={{fontSize:20,fontWeight:'bold',color:Colors.primaryColor}}>จำนวนคงเหลือ </Text>
                                        <Text style={{fontSize:20,fontWeight:'bold',color:Colors.primaryColor}}>{item.remainQty} รางวัล</Text>
                                    </View>
                                    <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>ใช้ {item.pointConsume} คะแนน</Text>
                                </View> */}
                            
                            {/* <TouchableOpacity onPress = {() => {setShowReward(true),setRewardData(item)}} >
                                <View style = {styles.redeem}>
                                    <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>แลกรางวัล</Text>
                                </View>
                            </TouchableOpacity> */}

                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={showReward}
                                onRequestClose={() => {
                                    setShowReward(false);
                                }}
                            >
                                <TouchableOpacity 
                                    style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center'}} 
                                    activeOpacity={1} 
                                    onPress={() => {setShowReward(false)}}
                                >
                                    <TouchableWithoutFeedback>                    
                                        <View style={styles.showReward}>
                                                <Image source={{uri: item.imageId}}  style={{height:Dimensions.Width/1.5,width:Dimensions.Width/1.5}} />
                                                <View style={{padding:5}} >
                                                    <Text style={styles.modalText}>รายละเอียด : {item.detail}</Text>
                                                    <Text style={styles.modalText}>มูลค่า : {item.price} บาท</Text>
                                                </View>
                                                <View style={{flexDirection:'row',height:50}} >
                                                    <TouchableOpacity 
                                                        style={{flex:1,alignItems:'center',backgroundColor:Colors.BackgroundColor,justifyContent:'center'}} 
                                                        onPress={() => {setShowReward(false)}}
                                                        >
                                                        <Text style={{fontSize:18,color:'white'}} >ย้อนกลับ</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity 
                                                        style={{flex:1,alignItems:'center',backgroundColor:Colors.primaryColor,justifyContent:'center'}} 
                                                        onPress={RedeemPoint}
                                                        >
                                                        <Text style={{fontSize:18,color:'white'}} >แลกรางวัล</Text>
                                                    </TouchableOpacity>  
                                                </View>
                                                
                                        </View>
                                                    
                                    </TouchableWithoutFeedback>
                                </TouchableOpacity> 
                            </Modal> 
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white'
    },
    card: {
        width:Dimensions.Width-40,
        height: Dimensions.Width-40,
        margin:5,
        backgroundColor:'white',
        borderRadius:30,
        shadowColor:'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height:2},
          shadowRadius:10,
          elevation:3,
    },
    redeem: {
        backgroundColor:Colors.gold2,
        alignItems:'center',
        width:'40%',
        alignSelf:'center',
        borderRadius:30,
        height:40,
        justifyContent:'center',
        marginTop:10,
    },
    showReward: {
    margin: 20,
    backgroundColor: "white",
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    paddingTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    modalText: {
    marginBottom: 15,
    fontSize:18,
    },
    absulute: {
        height:40, 
        width:100,
        backgroundColor:'#aba9a9',
        justifyContent:'center',
        alignItems:'center',
        opacity:0.8,
        position:'absolute',
        left:10,
        top:5,
        borderRadius:30,
        zIndex:10
    },
})


export default BrandPointDetails;




// import React, {useContext, useState} from "react";
// import { Text, StyleSheet, View, Image,TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
// import Dimensions from '../constants/Dimensions';
// import {Context as BrandMemberContext} from '../context/BrandMemberContext';
// import Colors from '../constants/Colors'
// import db from "../../db/firestore";

// const  BrandPointDetails = ({route}) => {
//     const {brandId} = route.params
//     const {state : {brandMember,brandProfile},getBrandMember}= useContext(BrandMemberContext);
//     let filterBrandReward = brandProfile.filter((brand)=> brand.brandId == brandId)
//     let brandReward = filterBrandReward[0].reward
//     const [showReward, setShowReward] = useState(false);
//     const [rewardData, setRewardData] = useState({})

//     let filterBrandMember = brandMember.filter((brand)=> brand.brandId == brandId)
    
//     const RedeemPoint = () => {
//         if(rewardData.pointConsume >filterBrandMember[0].remainPoint){
//             alert('สะสมแต้มเพิ่มอีกหน่อย แล้วมารับรางวัลไปได้เลย')
//         } else {
//             filterBrandMember[0].remainPoint = filterBrandMember[0].remainPoint - rewardData.pointConsume
//             filterBrandMember[0].reward.push({
//                 rewardId:rewardData.rewardId,
//                 rewardName:rewardData.rewardName,
//                 rewardDetail:rewardData.rewardDetail,
//                 rewardImageId:rewardData.imageId,
//                 qty:1,
//                 status:'request',
//                 dateTime:String(new Date())
//             })
//             getBrandMember(brandMember)
//             db.collection("brandMember").doc(filterBrandMember[0].doc).update({
//                 remainPoint : filterBrandMember[0].remainPoint,
//                 reward :filterBrandMember[0].reward
//             })
//             alert('แลกรางวัลสำเร็จ')
//         }
//         setShowReward(false)
//     };

//     return (
//         <View style = {{justifyContent:'center',alignItems:'center',backgroundColor:'white',flex:1}} >
//             <View style ={{flexDirection:'row'}} >
//                 <Image source={{uri: filterBrandReward[0].imageId}} style={{height:140,width:140}}  />
//                 <View style = {{padding:5,alignSelf:'center',flex:1}} >
//                     <View style={{marginLeft:5}} >
//                         <Text style={{fontSize:16,fontWeight:'bold'}} >{filterBrandReward[0].brandName}</Text>
//                     </View>
//                     <View style={{marginLeft:5}}><Text>{filterBrandReward[0].address}</Text></View>
                    
//                     <View style={{flexDirection:'row',padding:5}} >
//                         <Text style={{fontWeight:'bold'}} >แต้มสะสม : </Text>
//                         <Text>{brandMember[0].remainPoint}</Text>
//                     </View>
//                 </View>
//             </View>
            
//             <View style={{ width:'90%',borderBottomWidth:1,alignItems:'center',height:30,justifyContent:'center',borderColor:'#b5b5b5'}}>
//                 <Text style={{fontSize:20,fontWeight:'bold'}}>ของรางวัลทั้งหมด</Text>
//             </View>
//             <FlatList
//                 showsVerticalScrollIndicator={false}
//                 data={brandReward}
//                 keyExtractor={(item) => item.rewardId}
//                 renderItem={({ item }) => {
//                     return (
//                         <View style={styles.card} >
//                             <Text style = {{alignSelf:'center',fontSize:20,fontWeight:'bold',color:'black'}} >{item.rewardName}</Text>
//                             <View style = {{flexDirection:'row'}} >
//                                 <View>
//                                     <TouchableOpacity onPress = {() => {setShowReward(true),setRewardData(item)}} >
//                                         <Image source={{uri: item.imageId}} style={{height:140,width:140}} resizeMode='contain' />
//                                     </TouchableOpacity>
//                                 </View>
//                                 <View style={{marginLeft:10,justifyContent:'space-between'}} >
//                                     <View>
//                                         <Text style={{fontSize:20,fontWeight:'bold',color:Colors.primaryColor}}>จำนวนคงเหลือ </Text>
//                                         <Text style={{fontSize:20,fontWeight:'bold',color:Colors.primaryColor}}>{item.remainQty} รางวัล</Text>
//                                     </View>
//                                     <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>ใช้ {item.pointConsume} คะแนน</Text>
//                                 </View>
//                             </View>
//                             <TouchableOpacity onPress = {() => {setShowReward(true),setRewardData(item)}} >
//                                 <View style = {styles.redeem}>
//                                     <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>แลกรางวัล</Text>
//                                 </View>
//                             </TouchableOpacity>

//                             <Modal
//                                 animationType="fade"
//                                 transparent={true}
//                                 visible={showReward}
//                                 onRequestClose={() => {
//                                     setShowReward(false);
//                                 }}
//                             >
//                                 <TouchableOpacity 
//                                     style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center'}} 
//                                     activeOpacity={1} 
//                                     onPress={() => {setShowReward(false)}}
//                                 >
//                                     <TouchableWithoutFeedback>                    
//                                         <View style={styles.showReward}>
//                                                 <Image source={{uri: item.imageId}}  style={{height:Dimensions.Width/1.5,width:Dimensions.Width/1.5}} />
//                                                 <View style={{padding:5}} >
//                                                     <Text style={styles.modalText}>รายละเอียด : {item.detail}</Text>
//                                                     <Text style={styles.modalText}>มูลค่า : {item.price} บาท</Text>
//                                                 </View>
//                                                 <View style={{flexDirection:'row',height:50}} >
//                                                     <TouchableOpacity 
//                                                         style={{flex:1,alignItems:'center',backgroundColor:Colors.BackgroundColor,justifyContent:'center'}} 
//                                                         onPress={() => {setShowReward(false)}}
//                                                         >
//                                                         <Text style={{fontSize:18,color:'white'}} >ย้อนกลับ</Text>
//                                                     </TouchableOpacity>
//                                                     <TouchableOpacity 
//                                                         style={{flex:1,alignItems:'center',backgroundColor:Colors.primaryColor,justifyContent:'center'}} 
//                                                         onPress={RedeemPoint}
//                                                         >
//                                                         <Text style={{fontSize:18,color:'white'}} >แลกรางวัล</Text>
//                                                     </TouchableOpacity>  
//                                                 </View>
                                                
//                                         </View>
                                                    
//                                     </TouchableWithoutFeedback>
//                                 </TouchableOpacity> 
//                             </Modal> 
//                         </View>
//                     )
//                 }}
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container : {
//         flex:1,
//         justifyContent:'flex-start',
//         alignItems:'center',
//         backgroundColor:'white'
//     },
//     card: {
//         width:Dimensions.Width-20,
//         margin:5,
//         backgroundColor:'white',
//         borderRadius:8,
//         padding:10,
//         shadowColor:'black',
//           shadowOpacity: 0.26,
//           shadowOffset: {width: 0, height:2},
//           shadowRadius:10,
//           elevation:3,
//     },
//     redeem: {
//         backgroundColor:Colors.gold2,
//         alignItems:'center',
//         width:'40%',
//         alignSelf:'center',
//         borderRadius:8,
//         height:40,
//         justifyContent:'center',
//         marginTop:10,
//     },
//     showReward: {
//     margin: 20,
//     backgroundColor: "white",
//     borderTopRightRadius:20,
//     borderTopLeftRadius:20,
//     paddingTop: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//         width: 0,
//         height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     },
//     modalText: {
//     marginBottom: 15,
//     fontSize:18,
//     }
// })


// export default BrandPointDetails;