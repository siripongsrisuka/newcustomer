import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

/* import {
    SplashScreen,
    SignInScreen,
    SignUpScreen,
    FirebaseLoginScreen,
    FireBaseSignupScreen,
    FirebaseOtpVerifyScreen,
    WaitProcessScreen,
    EmptyScreen,
} from '../screens'
import LoginOrRegistor from '../screens/LoginOrRegistor';
import RegisterForm from '../screens/RegisterForm';
import RegisterForm2 from '../screens/RegisterForm2' */

// import redeemReward from "./RedeemReward";

import EmptyScreen from './EmptyScreen'
import WaitProcessScreen from './WaitProcessScreen';
import LoginOrRegistor from './LoginOrRegistor';
import RegisterForm from './RegisterForm';
import RegisterForm2 from './RegisterForm2';
import FirebaseOtpVerifyScreen from './FirebaseOtpVerifyScreen';
// import FireBaseSignupScreen from './fire'
// import FirebaseLoginScreen from './FirebaseLoginScreen';

import aa from './aa'

const RootStack = createStackNavigator();

const Root = ({navigation}) => (
    <RootStack.Navigator headerMode='none' initialRouteName="EmptyScreen">
        <RootStack.Screen name="EmptyScreen" component={EmptyScreen}/>
        <RootStack.Screen name="WaitProcessScreen" component={WaitProcessScreen}/>
        {/* <RootStack.Screen name="SplashScreen" component={SplashScreen}/> */}
        {/* <RootStack.Screen name="SignInScreen" component={SignInScreen}/> */}
        {/* <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/> */}
        {/* <RootStack.Screen name="FireBaseSignupScreen" component={FireBaseSignupScreen}/> */}
        {/* <RootStack.Screen name="FirebaseLoginScreen" component={FirebaseLoginScreen}/> */}
        <RootStack.Screen name="LoginOrRegistor" component={LoginOrRegistor}/>
        <RootStack.Screen name="RegisterForm" component={RegisterForm}/>
        <RootStack.Screen name="RegisterForm2" component={RegisterForm2}/>

        <RootStack.Screen name="FirebaseOtpVerifyScreen" component={FirebaseOtpVerifyScreen}/>

        <RootStack.Screen name='aa' component={aa} />

    </RootStack.Navigator>
);

export default Root;