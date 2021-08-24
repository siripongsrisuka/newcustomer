import Colors from './src/constants/Colors'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import ShopPoint from './src/ShopPoint/ShopPointStack';
import BrandPoint from './src/BrandPoint/BrandPointStack'
import Profile from './src/Profile/ProfileStack';
import Redeem from './src/Redeem/RedeemStack';
import LoadingScreen from './src/LoadingScreen';
import {Provider as BrandPointProvider} from './src/context/BrandPointContext';
import {Provider as BrandMemberProvider} from './src/context/BrandMemberContext';
import {Provider as ShopMemberProvider} from './src/context/ShopMemberContext'
import {Provider as CustomerProfileProvider} from './src/context/CustomerProfileContext'


import { Fontisto, MaterialIcons, FontAwesome, Ionicons   } from '@expo/vector-icons'; 



const Tab = createBottomTabNavigator();



function MyTabs() {
  return (
    <Tab.Navigator 
     tabBarOptions = {{
       activeTintColor:'white',
       inactiveTintColor:'white',
       activeBackgroundColor:Colors.primaryColor,
       inactiveBackgroundColor:'#827d7d',
       showLabel:'true',
       keyboardHidesTabBar:'true',
     }}
     backBehavior='initialRoute'
     initialRouteName="Redeem" 
     >
      
      <Tab.Screen name="Redeem" component={Redeem} 
        options={{
          // tabBarBadge:'3',
          tabBarLabel: 'หน้าหลัก',
          tabBarColor:Colors.primaryColor,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="newspaper-o" size={24} color= {color} />
          )}}/>
      <Tab.Screen name="BrandPoint" component={BrandPoint} 
        options={{
          tabBarLabel: 'แบรนด์',
          tabBarColor:Colors.primaryColor,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="redeem" size={24} color="white" />
          )}}/>
      <Tab.Screen name="ShopPoint" component={ShopPoint} 
        options={{
          tabBarLabel: 'ร้านค้า',
          tabBarColor:Colors.primaryColor,
          tabBarIcon: ({ color }) => (
            <Fontisto name="shopping-package" size={24} color="white" />
          )}}/>
      <Tab.Screen name="Profile" component={Profile} 
        options={{
          tabBarLabel: 'โปรไฟล์',
          size:24,
          tabBarColor:Colors.primaryColor,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color="white" />
          )}}/>
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <ShopMemberProvider>
      <BrandMemberProvider>
        <BrandPointProvider>
          <CustomerProfileProvider>
            <NavigationContainer>
              <MyTabs />
            </NavigationContainer>
          </CustomerProfileProvider>
        </BrandPointProvider>
      </BrandMemberProvider>
    </ShopMemberProvider>
      

    
    
  );
}

// Close Setting a timer for long time yellow box warning When use realtime firebase
//https://github.com/firebase/firebase-js-sdk/issues/97

import {Platform, InteractionManager} from 'react-native';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue Setting a timer for long time
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = 'lt' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startsWith('lt')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}