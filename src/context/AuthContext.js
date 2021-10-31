// import db, {signUpWithEmail,signInWithEmail,signOut as firebaseSignOut} from '../../db/firestore'
import db,{firebaseAuth,signOut as firebaseSignOut} from '../../db/firestore'
// import firebaseAuth, { firebaseAuth } from '@react-native-firebase/auth'
import * as firebase from 'firebase';


// import AsyncStorage from '@react-native-async-storage/async-storage'; //new version
import AsyncStorage from '@react-native-async-storage/async-storage';

import CreateDataContext from './CreateDataContext';

const authReducer = (state,action) => {
    switch(action.type){
        case 'signIn':
            return{...state,token:action.payload,loading:false};
        case 'signOut':
            return{...state,token:null};
        case 'verifyPhone':
            return {...state,objPhoneConfirm:action.payload}
        case 'verificationId':
            return {...state,verificationId:action.payload}
        default:
            return state;
    }
};



const tryLocalSignIn = dispatch => async () =>{
    const uidToken = await AsyncStorage.getItem('@๊uidToken');
    

    // const uidToken = 'xxxx'

    if(uidToken){
        dispatch({type:'signIn',payload:uidToken});
    }

};


// non auto confirm OTP
// put phoneNumer -> get verifyId & send OTP -> put OTP back -> check verifyId & OTP is get along -> get credential ->sigIn with the credential
const phoneLogin2 = (dispatch) => async (phoneNum='',recaptchaVerifier ='') => {
    
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
    try {
        const thGlobalPhoneNum = '+66' + phoneNum.substring(1)
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
          thGlobalPhoneNum,
          recaptchaVerifier
        );
        // setVerificationId(verificationId);
        dispatch({type:'verificationId',payload:verificationId});

      } catch (err) {
        console.log({ text: `Error: ${err.message}`, color: 'red' });
      }

};


const tryExpoFirebaseOtp = (dispatch) => async(verificationId,verificationCode) =>{
    try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
        );
        
        const objRes = await firebase.auth().signInWithCredential(credential);
        await AsyncStorage.setItem('@๊uidToken',objRes.user.uid);
        dispatch({type:'signIn',payload:objRes.user.uid})
        console.log({ text: 'Phone authentication successful 👍' });
    } catch (err) {
        console.log("Error Code:"+err.code+"\nMessage:"+err.message)
        switch(err.code){
            case 'auth/invalid-verification-code':
                alert('รหัส OTP ไม่ถูกต้องกรุณากรอกใหม่อีกครั้ง(หรือ เบอร์มือถือไม่ใช่ของเครื่องนี้กรุณาเช็คเบอร์มือถือ)')
                break;
            case 'auth/invalid-credential':
                alert('รหัส OTP นี้หมดอายุแล้ว กรุณารับ OTP ใหม่อีกครี้ง')
                break;
            case 'auth/account-exists-with-different-credential': //เกิดเฉพาะเมื่ออะไรที่ใช้อีเมลล์ซ้ำ
                alert('อีเมลล์นี้ใช้ลงทะเบียนแล้วกรุณาใช้อีเมล์อื่น')
                break;
        }
    }

}

const signOut = (dispatch) => async() => {
    await AsyncStorage.removeItem('@๊uidToken');
    await dispatch({type:'signOut'});
    firebaseSignOut();
};

export const {Provider,Context} = CreateDataContext(
    authReducer,
    {signOut,tryLocalSignIn,phoneLogin2,tryExpoFirebaseOtp},
    {token:null,loading:true,objPhoneConfirm:null,errMessage:'',userName:'',email:'',password:'',verificationId:''}
);