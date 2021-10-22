import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import EmptyScreen from './EmptyScreen'
import WaitProcessScreen from './WaitProcessScreen';
import LoginOrRegistor from './LoginOrRegistor';
import RegisterForm from './RegisterForm';
import FirebaseOtpVerifyScreen from './FirebaseOtpVerifyScreen';

import aa from './aa'

const RootStack = createStackNavigator();

const Root = ({navigation}) => (
    <RootStack.Navigator headerMode='none' initialRouteName="EmptyScreen">
        <RootStack.Screen name="EmptyScreen" component={EmptyScreen}/>
        <RootStack.Screen name="WaitProcessScreen" component={WaitProcessScreen}/>
        <RootStack.Screen name="LoginOrRegistor" component={LoginOrRegistor}/>
        <RootStack.Screen name='aa' component={aa} />

        {/* ฝากแพ็คทำต่อทีเอา UI จากฝั่งร้านค้ามาโปะให้แล้วแต่ยังไม่ได้ต่อ */}
        {/* <RootStack.Screen name="RegisterForm" component={RegisterForm}/>
        <RootStack.Screen name="FirebaseOtpVerifyScreen" component={FirebaseOtpVerifyScreen}/> */}

        

    </RootStack.Navigator>
);

export default Root;