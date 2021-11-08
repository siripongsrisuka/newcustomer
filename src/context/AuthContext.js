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
            return{...state,token:null, objPhoneConfirm:null};
        case 'recapchaVerify':
            return {...state,recaptchaVerifier:action.payload};
        case 'verifyPhone':
            return {...state,objPhoneConfirm:action.payload};
        case 'objPhoneConfirm':
            return {...state,objPhoneConfirm:action.payload};
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

const recapchaVerify = (dispatch) => (recaptchaVerifier) =>{
    dispatch({type:'recapchaVerify',payload:recaptchaVerifier})
}


// non auto confirm OTP
// put phoneNumer -> get verifyId & send OTP -> put OTP back -> check verifyId & OTP is get along -> get credential ->sigIn with the credential
const phoneLogin2 = (dispatch) => async (phoneNum='',recaptchaVerifier ='') => {
    
    console.log('xxxxx',recaptchaVerifier)
    try {
        const thGlobalPhoneNum = '+66' + phoneNum.substring(1)

        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const objPhoneConfirm = await phoneProvider.verifyPhoneNumber(
          thGlobalPhoneNum,
          recaptchaVerifier
        );
        dispatch({type:'objPhoneConfirm',payload:objPhoneConfirm});

    } catch (err) {
        alert('error')
    }

};


const tryExpoFirebaseOtp = (dispatch) => async(objPhoneConfirm,verificationCode) =>{
    try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            objPhoneConfirm,
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
    {signOut,tryLocalSignIn,recapchaVerify,phoneLogin2,tryExpoFirebaseOtp},
    {token:null,loading:true,recaptchaVerifier:null,objPhoneConfirm:null,errMessage:'',userName:'',email:'',password:''}
);