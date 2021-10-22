// import db, {signUpWithEmail,signInWithEmail,signOut as firebaseSignOut} from '../../db/firestore'
import db,{firebaseAuth,signOut as firebaseSignOut} from '../../db/firestore'
// import firebaseAuth, { firebaseAuth } from '@react-native-firebase/auth'


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

/* const signUpEmail = (dispatch) => async (email,password,confirm_password) => {
    if(password.length < 6){
        alert("โปรดกรอกรหัสผ่านอย่างน้อย 6 หลัก");
        return;
    }

    if(password != confirm_password){
        alert('โปรดกรอกรหัสผ่านให้ตรงกันทั้ง 2 ช่อง');
        return;
    }
    try{ //Why try catch but still show error from firebase !!!!!?????
        await signUpWithEmail(email,password);
    }catch{
        alert('รูปแบบอีเมลที่กรอกไม่ถูกต้อง');
        return;
    }

    // dispatch({type:'signin',payload:response});
    alert('ลงทะเบียนสำเร็จ โปรดไปหน้าลงทะเบียนเพื่อเข้าสู่ระบบ');
 };

const signInEmail = (dispatch) => async (email, password) => {
    // const emailLogInToken = await signInWithEmail(email,password);

    const  emailLogInToken = 'xxx';
    await AsyncStorage.setItem('@emailLogInToken',"xxx");
    dispatch({type:'signIn',payload:"xxx"});

}; */

// non auto confirm OTP
// put phoneNumer -> get verifyId & send OTP -> put OTP back -> check verifyId & OTP is get along -> get credential ->sigIn with the credential
const phoneLogin2 = (dispatch) => async (phoneNum='') => {

    if(phoneNum.length != 10){
        alert('กรุณากรอกหมายเลขโทรศัพท์มือถือให้พอดี 10 หลัก')
        return 
    }
  
    if(phoneNum.substring(0,1) != '0' ){
        alert('กรุณาให้เลขหลักแรกโทรศัพท์เป็น 0')
        return 
    }


    const thGlobalPhoneNum = '+66' + phoneNum.substring(1) //+66 is thailand global code phone standard => from '0123456789 => +66123456789'

    try{
        const objRes = await firebaseAuth().verifyPhoneNumber(thGlobalPhoneNum) //can more detail detect in each state (by expand notation) eg.send_otp,verify_timeout.but not necessary now
        dispatch({type:'verifyPhone',payload:objRes});
        return objRes
    }catch(err){
        console.log("Error Code:"+err.code+"\nMessage:"+err.message)
        switch(err.code){
            case 'auth/invalid-phone-number':
                alert('รูปแบบเบอร์มือถือไม่ถูกต้อง ตามมาตราฐาน E.164')
                break;
            case 'auth/missing-phone-number':
                alert('Thrown if the phone number is missing.')  //??? ดักจับเบอร์ที่ไม่มีอยู่จริงไม่ได้แล้วดักจับอะไร ?
                break;
            case 'auth/quota-exceeded':
                alert('คุณขอ OTP เกินมาตราฐานความปลอดภัยคือ เกิน 5 ครั้งใน 4 ชม. กรุณารอจนกว่าจะครบเวลาแล้วลงทะเบียนใหม่')
                break;
        }
    }

};

// non auto confirm OTP
const confirmOtp2 = (dispatch) => async (objPhoneConfirm=null,otp=null) => {

    try{
        const credential = await firebase.auth.PhoneAuthProvider.credential(objPhoneConfirm.verificationId,otp)
        const res = await firebaseAuth().signInWithCredential(credential)

        await AsyncStorage.setItem('@๊uidToken',res.user.uid);
        // db.collection('shop').where("shopId","==",res.user.uid).get().then((qsnapshot) => {
        //     if (qsnapshot.docs.length > 0) {
        //         dispatch({type:'signIn',payload:res.user.uid});
        //     } else {
        //         db.collection('shop').add({
        //             shopId: res.user.uid,
        //             shopName: '',
        //             ownerName:'',
        //             email:'',
        //             imageId:'https://static.posttoday.com/media/content/2018/02/21/6A4F3A5B48E94BB7A216F55CA98AF3F3.jpg',
        //             shopDetail:'',
        //             tel:'',
        //             bankName:'string',
        //             accountName:'',
        //             accountNumber:'',
        //             address:'',
        //             tambon:'',
        //             district:'',
        //             province:'',
        //             state:'',
        //             postcode:'',
        //             latitude:'',
        //             longitude:'',
        //             startDate:'',
        //             reward: [
        //                 {
        //                     imageId:'https://scontent.fbkk4-4.fna.fbcdn.net/v/t1.15752-9/242091314_901297710798749_3194019738618108445_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeFEdDPcZtPo_KdbwNvqB6Yj2iU89ogTrejaJTz2iBOt6ClTSsRoDDG2mAT-hT0Q4VYdXYdXc6CS6ViMnhgbTKqW&_nc_ohc=RRF8iWHMHigAX9ae8tz&_nc_ht=scontent.fbkk4-4.fna&oh=3433a7e57d99624c1cde6abf95b211a1&oe=6169A3F1',
        //                     rewardName:'คูปองส่วนลด 10 บาท',
        //                     pointConsume:'200',
        //                     status:'inValid'
        //                 },
        //                 {
        //                     imageId:'https://scontent.fbkk3-4.fna.fbcdn.net/v/t1.15752-9/242121518_601358047893487_2231765035843792608_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeF4TC4YA75dBRHmgVK-le1ztd8ZSdeoGvm13xlJ16ga-SGLwwo7gDXqAa88x-fI85eae6C0S_RySbJRiZKky-Kq&_nc_ohc=ySzAkUsfdvsAX_t2X23&_nc_ht=scontent.fbkk3-4.fna&oh=2f4c96e8ff78cf2a3d97992ad4dd0192&oe=6169CD04',
        //                     rewardName:'คูปองส่วนลด 20 บาท',
        //                     pointConsume:'300',
        //                     status:'inValid'
        //                 },
        //                 {
        //                     imageId:'https://scontent.fbkk3-3.fna.fbcdn.net/v/t1.15752-9/242136135_400985821417518_6713780019023356909_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeGC6I-tfpRER55zVNe1Dti8Depr7wVTXTMN6mvvBVNdM-O6KmqxQo3N-GoFJPJkVQkHw4aVgDNxlaM8GUTMZb0B&_nc_ohc=-QOplWefovYAX89yp6o&_nc_ht=scontent.fbkk3-3.fna&oh=938bb0c4e566a163ea7e6d9dadc7bf46&oe=616B5352',
        //                     rewardName:'คูปองส่วนลด 50 บาท',
        //                     pointConsume:'700',
        //                     status:'inValid'
        //                 },
        //                 {
        //                     imageId:'https://scontent.fbkk3-3.fna.fbcdn.net/v/t1.15752-9/242124331_407999160754751_2715660094564549846_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeGiC4aYvKK88UY3QDo37lZMIha6T6aOiNEiFrpPpo6I0a0RjEDXUCRxm5c_ejgcoLYcM0Uiduk6mJaVAGVhvDt2&_nc_ohc=wKZo9XDkCqIAX-IWGq1&_nc_ht=scontent.fbkk3-3.fna&oh=4ebce98816f91d98ec8b806c9d0c2089&oe=6168ADDD',
        //                     rewardName:'คูปองส่วนลด 100 บาท',
        //                     pointConsume:'1500',
        //                     status:'inValid'
        //                 },
        //                 {
        //                     imageId:'https://scontent.fbkk4-3.fna.fbcdn.net/v/t1.15752-9/242097897_2638278053145204_6060258264591698381_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeHJrDGgYRDtEmZ6BAjMDTFTsdYnUum-DZex1idS6b4Nl7JamhnAf2hkQs84DqtJ3Q3j1-JVN06fZhK003XXyog9&_nc_ohc=ID54yLQ_uxAAX_tuJfX&_nc_ht=scontent.fbkk4-3.fna&oh=0b140f249437e60ef8abe574b07decee&oe=6168B150',
        //                     rewardName:'ช๊อปเงินคือ 10 บาท',
        //                     pointConsume:'200',
        //                     status:'inValid'
        //                 },
        //                 {
        //                     imageId:'https://scontent.fbkk3-1.fna.fbcdn.net/v/t1.15752-9/242094292_1535987360079687_96213893506826869_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeF7iQQDiySEjLnVg2TcxAwde1z5Sjfq2Xl7XPlKN-rZeWDXEQ-zTgoH7UnmyK35Uo5yK63wI176MJHMCCoWiQ-E&_nc_ohc=LplGA_VFfNIAX_SK6Q6&_nc_ht=scontent.fbkk3-1.fna&oh=4de87bb29060d400cf48740b0e8b5d92&oe=616A3266',
        //                     rewardName:'ช๊อปเงินคืน 20 บาท',
        //                     pointConsume:'350',
        //                     status:'inValid'
        //                 },
        //                 {
        //                     imageId:'https://scontent.fbkk4-1.fna.fbcdn.net/v/t1.15752-9/242096794_714371709964642_2571967211211666250_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeEtMtbQ0AechUP6lkawmYEYnOYGs8HtQbWc5gazwe1BtU0bWhg7d6VnvPNoOE3tivoWBGVCuTK-fqLp_Duk95Y7&_nc_ohc=FCp3k4q7YRQAX-UCaRL&_nc_oc=AQmBZE1ST1heyZL9VVQ8ZjM5HbIAOgTN9b9eIyNkwewVpDGQMl-NcZRz5EVhDWwQrJ4&tn=vbKj1OxbfAcH0Ch9&_nc_ht=scontent.fbkk4-1.fna&oh=886d74978c26cac6e09cf2788d1a02de&oe=616908D6',
        //                     rewardName:'ช๊อปเงินคืน 50 บาท',
        //                     pointConsume:'750',
        //                     status:'inValid'
        //                 },
        //                 {
        //                     imageId:'https://scontent.fbkk3-4.fna.fbcdn.net/v/t1.15752-9/242100526_2907399332907345_4862698836618375401_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeGg8lNVN9_hfLnrUub60EZ5vONzrbUuCEy843OttS4ITGFz0W0hL1yJsec6F17ub15QwDfBMgH4d_EhqgscXZDy&_nc_ohc=zq4sDDBf2I8AX9Zq4pH&_nc_ht=scontent.fbkk3-4.fna&oh=7fb02de88bbbfa0fc7e2b6339ad96871&oe=6168C893',
        //                     rewardName:'ช๊อปเงินคืน 100 บาท',
        //                     pointConsume:'1500',
        //                     status:'inValid'
        //                 },
        //             ],
        //         }).then((ddd) => {dispatch({type:'signIn',payload:res.user.uid})})
        //     }
        // })
        
        console.log("confirmOtp2")
        console.log(res.user.uid)
        console.log("confirmOtp2")
        dispatch({type:'signIn',payload:res.user.uid})
  
    }catch(err){
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

};

const tryExpoFirebaseOtp = (dispatch) => async(objRes) =>{

    await AsyncStorage.setItem('@๊uidToken',objRes.user.uid);
    dispatch({type:'signIn',payload:objRes.user.uid})
}

const signOut = (dispatch) => async() => {
    await AsyncStorage.removeItem('@๊uidToken');
    await dispatch({type:'signOut'});
    firebaseSignOut();
};

export const {Provider,Context} = CreateDataContext(
    authReducer,
    {signOut,tryLocalSignIn,phoneLogin2,confirmOtp2,tryExpoFirebaseOtp},
    {token:null,loading:true,objPhoneConfirm:null,errMessage:'',userName:'',email:'',password:''}
);