import React,{useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';



import * as firebase from 'firebase';

import { AuthContext, phoneLogin2 } from '../context';

// Initialize Firebase JS SDK
// https://firebase.google.com/docs/web/setup
/*try {
  firebase.initializeApp({
    ...
  });
} catch (err) {
  // ignore app already initialized error in snack
}*/

export default function App() {

  const {state:{objPhoneConfirm},tryExpoFirebaseOtp,phoneLogin2} = React.useContext(AuthContext)

  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  // const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === 'web'
      ? {
          text:
            'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
        }
      : undefined
  );
  const attemptInvisibleVerification = true;

  useEffect(()=>{

    return () => {
      recaptchaVerifier.current = null
    }
  },[])

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        // firebaseConfig={firebaseConfig}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          phoneLogin2(phoneNumber,recaptchaVerifier.current)
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        // editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        // disabled={!objPhoneConfirm}
        onPress={async () => {
          tryExpoFirebaseOtp(objPhoneConfirm,verificationCode)
        }}
      />

    </View>
  );
}


// import * as React from 'react';
// import {
//   Text,
//   View,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
// import * as firebase from 'firebase';

// import { AuthContext, phoneLogin2 } from '../context';

// // Initialize Firebase JS SDK
// // https://firebase.google.com/docs/web/setup
// /*try {
//   firebase.initializeApp({
//     ...
//   });
// } catch (err) {
//   // ignore app already initialized error in snack
// }*/

// export default function App() {

//   const {tryExpoFirebaseOtp} = React.useContext(AuthContext)

//   const recaptchaVerifier = React.useRef(null);
//   const [phoneNumber, setPhoneNumber] = React.useState('+66853331882');
//   const [verificationId, setVerificationId] = React.useState();
//   const [verificationCode, setVerificationCode] = React.useState();
//   const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
//   const [message, showMessage] = React.useState(
//     !firebaseConfig || Platform.OS === 'web'
//       ? {
//           text:
//             'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
//         }
//       : undefined
//   );
//   // const attemptInvisibleVerification = false;
//   const attemptInvisibleVerification = true;


//   return (
//     <View style={{ padding: 20, marginTop: 50 }}>
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={firebaseConfig}
//         attemptInvisibleVerification={attemptInvisibleVerification}
//       />
//       <Text style={{ marginTop: 20 }}>Enter phone number</Text>
//       <TextInput
//         style={{ marginVertical: 10, fontSize: 17 }}
//         placeholder="+1 999 999 9999"
//         autoFocus
//         autoCompleteType="tel"
//         keyboardType="phone-pad"
//         textContentType="telephoneNumber"
//         onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
//       />
//       <Button
//         title="Send Verification Code"
//         disabled={!phoneNumber}
//         onPress={async () => {
//           // The FirebaseRecaptchaVerifierModal ref implements the
//           // FirebaseAuthApplicationVerifier interface and can be
//           // passed directly to `verifyPhoneNumber`.
//           try {
//             const thGlobalPhoneNum = '+66' + phoneNumber.substring(1)
//             const phoneProvider = new firebase.auth.PhoneAuthProvider();
//             const verificationId = await phoneProvider.verifyPhoneNumber(
//               thGlobalPhoneNum,
//               recaptchaVerifier.current
//             );
//             setVerificationId(verificationId);

//           } catch (err) {
//             console.log({ text: `Error: ${err.message}`, color: 'red' });
//           }
//         }}
//       />
//       <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
//       <TextInput
//         style={{ marginVertical: 10, fontSize: 17 }}
//         editable={!!verificationId}
//         placeholder="123456"
//         onChangeText={setVerificationCode}
//       />
//       <Button
//         title="Confirm Verification Code"
//         disabled={!verificationId}
//         onPress={async () => {
//           try {
//             const credential = firebase.auth.PhoneAuthProvider.credential(
//               verificationId,
//               verificationCode
//             );
            
//             const objRes = await firebase.auth().signInWithCredential(credential);
//             tryExpoFirebaseOtp(objRes)
            
//             console.log({ text: 'Phone authentication successful 👍' });
//           } catch (err) {
//             console.log({ text: `Error: ${err.message}`, color: 'red' });
//           }
//         }}
//       />

//     </View>
//   );
// }