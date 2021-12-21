import React, {useContext, useState,useEffect} from 'react';
import db from '../../db/firestore'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  ImageBackground
} from 'react-native';
import Dimensions from '../constants/Dimensions';
import Colors from '../constants/Colors';
import {AuthContext,CustomerLoginContext} from '../context'
import Fonts from '../constants/Fonts';

const LoginOrRegistor = ({navigation}) => {
  const [phone, setPhone] = useState("");
  const {state:{token},tryLocalSignIn} = useContext(AuthContext)
  const {state:customerLogin,fetchCustomerLogin} = useContext(CustomerLoginContext)
  const [loginPicture, setLoginPicture] = useState([])

  const checkPhoneNumber = () => {
    if(phone.length != 10){
      alert('กรุณากรอกหมายเลขโทรศัพท์มือถือให้พอดี 10 หลัก')
      return 
    } else if(phone.substring(0,1) != '0' ){
      alert('กรุณาให้เลขหลักแรกโทรศัพท์เป็น 0')
      return 
    } else {
      db.collection('customer').where("tel","==",phone).get().then((qsnapshot) => {
        if (qsnapshot.docs.length > 0) {
            navigation.navigate('FirebaseOtpVerifyScreen',{phone:phone})
        } else {
          alert('กรุณาสมัครสมาชิก เพื่อเข้าใช้งานระบบ')
        }
      })
        
    }
  }

    useEffect(() =>{
      // db.collection('AdminSetting').doc('customerLogin').get().then(function(snapshot){
      //   let xx = snapshot.data().picture
      //   // if(!token){
      //   //   setLoginPicture(xx)
      //   // }
        
      //   console.log('hello word')
      // })
      fetchCustomerLogin()
      
    },[])
    const picture = () =>{
        let res = customerLogin.filter((a) =>{return(a.id == 'customerLogin')})
        return res
    }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1,alignItems:'center',justifyContent:'center'}} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator ={false}>
      <ImageBackground  source={{uri:picture()[0]?.uri}} style={{width:Dimensions.Width,height:Dimensions.Height}}>
      <View style={{flex:1,alignItems:'center',marginTop:Dimensions.Height/1.8}} >
      {Platform.OS === 'android' ? (
             <View  >
               <TextInput
                 placeholder='  กรอกเบอร์โทรศัพท์'
                 value={phone}
                 autoCapitalize="none"
                 autoCorrect={false}
                 maxLength={10}
                 onChangeText={setPhone}
                 keyboardType='phone-pad'
                 style={{...Fonts.xlb,...{margin:10,borderRadius:10,fontSize:18,backgroundColor:Colors.InputColor,width:Dimensions.Width/1.2,alignItems:'center',height:50}}}
               />
             </View>
           ) : null}
           <TouchableOpacity style={styles.touch} onPress={checkPhoneNumber} >
               <Text style={{...Fonts.lgwb}} >เข้าสู่ระบบ</Text>
           </TouchableOpacity>
           <View style={{margin:2}} >
               <Text style={{...Fonts.mdw}} >หรือ</Text>
           </View>
           <TouchableOpacity 
               onPress={() => {navigation.navigate("RegisterForm")}} style={styles.touch} >
               <Text style={{...Fonts.lgwb}}>สมัครสมาชิก</Text>
           </TouchableOpacity> 
      </View>
      
      </ImageBackground>
          
            
    </ScrollView>
  );
};

export default LoginOrRegistor;

const styles = StyleSheet.create({
    touch : {
        width:Dimensions.Width/1.2,
        alignItems:'center',
        height:50,
        borderRadius:30,
        justifyContent:'center',
        borderWidth:1,
        borderColor:'white'
    },

    text: {
    //fontFamily: 'Kufam-SemiBoldItalic', //now can't use font ,It's bug.
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  modalView: {
    margin: 20,
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

});


// import React, {useContext, useState,useEffect} from 'react';
// import db from '../../db/firestore'
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Platform,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   Modal,
//   ImageBackground
// } from 'react-native';
// import Dimensions from '../constants/Dimensions';
// import Colors from '../constants/Colors';
// import {AuthContext,CustomerLoginContext} from '../context'

// const LoginOrRegistor = ({navigation}) => {
//   const [phone, setPhone] = useState("");
//   const {state:{token},tryLocalSignIn} = useContext(AuthContext)
//   const {state:customerLogin,fetchCustomerLogin} = useContext(CustomerLoginContext)
//   const [loginPicture, setLoginPicture] = useState([])

//   const checkPhoneNumber = () => {
//     if(phone.length != 10){
//       alert('กรุณากรอกหมายเลขโทรศัพท์มือถือให้พอดี 10 หลัก')
//       return 
//     } else if(phone.substring(0,1) != '0' ){
//       alert('กรุณาให้เลขหลักแรกโทรศัพท์เป็น 0')
//       return 
//     } else {
//       db.collection('customer').where("tel","==",phone).get().then((qsnapshot) => {
//         if (qsnapshot.docs.length > 0) {
//             navigation.navigate('FirebaseOtpVerifyScreen',{phone:phone})
//         } else {
//           alert('กรุณาสมัครสมาชิก เพื่อเข้าใช้งานระบบ')
//         }
//       })
        
//     }
//   }

//     useEffect(() =>{
//       // db.collection('AdminSetting').doc('customerLogin').get().then(function(snapshot){
//       //   let xx = snapshot.data().picture
//       //   // if(!token){
//       //   //   setLoginPicture(xx)
//       //   // }
        
//       //   console.log('hello word')
//       // })
//       fetchCustomerLogin()
      
//     },[])
//     const picture = () =>{
//         let res = customerLogin.filter((a) =>{return(a.id == 'customerLogin')})
//         return res
//     }

//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1,alignItems:'center'}} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator ={false}>
//             <Image source={{uri:picture()[0]?.uri}} style={{width:Dimensions.Width,height:Dimensions.Height}} />
//             {Platform.OS === 'android' ? (
//              <View>
//                <TextInput
//                  placeholder='กรอกเบอร์โทรศัพท์'
//                  value={phone}
//                  autoCapitalize="none"
//                  autoCorrect={false}
//                  maxLength={10}
//                  onChangeText={setPhone}
//                  keyboardType='phone-pad'
//                  style={{margin:10,borderRadius:10,fontSize:18,backgroundColor:Colors.InputColor,width:Dimensions.Width/1.2,alignItems:'center',height:50}}
//                />
//              </View>
//            ) : null}
//            <TouchableOpacity style={styles.touch} onPress={checkPhoneNumber} >
//                <Text style={{fontSize:24,fontWeight:'bold',color:'white'}} >เข้าสู่ระบบ</Text>
//            </TouchableOpacity>
//            <View style={{margin:2}} >
//                <Text style={{fontSize:20}} >หรือ</Text>
//            </View>
//            <TouchableOpacity 
//                onPress={() => {navigation.navigate("RegisterForm")}}>
//                <Text style={{fontSize:16,textDecorationLine:'underline',color:Colors.secondaryColor}} >สมัครสมาชิก</Text>
//            </TouchableOpacity> 
//     </ScrollView>
//   );
// };

// export default LoginOrRegistor;

// const styles = StyleSheet.create({
//     touch : {
//         width:Dimensions.Width/1.2,
//         alignItems:'center',
//         backgroundColor:Colors.primaryColor,
//         height:50,
//         borderRadius:30,
//         justifyContent:'center'
//     },

//     text: {
//     //fontFamily: 'Kufam-SemiBoldItalic', //now can't use font ,It's bug.
//     fontSize: 28,
//     marginBottom: 10,
//     color: '#051d5f',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },

// });