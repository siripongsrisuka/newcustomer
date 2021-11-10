import Colors from './src/constants/Colors'
import React,{useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import ShopPoint from './src/ShopPoint/ShopPointStack';
import BrandPoint from './src/BrandPoint/BrandPointStack'
import Profile from './src/Profile/ProfileStack';
import Redeem from './src/Redeem/RedeemStack';
import Root from './src/Root/RootStack'
import LoadingScreen from './src/LoadingScreen';

import {    
  AuthProvider,AuthContext,
  BrandPointProvider,
  BrandMemberProvider,
  CustomerProfileProvider,
  ShopMemberProvider,
  ShopCouponProvider
} from './src/context'



import { Fontisto, MaterialIcons, FontAwesome, Ionicons   } from '@expo/vector-icons'; 
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
// import { useFonts, Inter_900Black,Prompt_400Regular } from '@expo-google-fonts/inter';
import {
  useFonts,
  Prompt_100Thin,
  Prompt_100Thin_Italic,
  Prompt_200ExtraLight,
  Prompt_200ExtraLight_Italic,
  Prompt_300Light,
  Prompt_300Light_Italic,
  Prompt_400Regular,
  Prompt_400Regular_Italic,
  Prompt_500Medium,
  Prompt_500Medium_Italic,
  Prompt_600SemiBold,
  Prompt_600SemiBold_Italic,
  Prompt_700Bold,
  Prompt_700Bold_Italic,
  Prompt_800ExtraBold,
  Prompt_800ExtraBold_Italic,
  Prompt_900Black,
  Prompt_900Black_Italic,
} from '@expo-google-fonts/prompt';



const Tab = createBottomTabNavigator();



function MyTabs() {

  const {state:{token},tryLocalSignIn} = useContext(AuthContext)

  return (
    <NavigationContainer>
      {!token?
      (
        <Root/>
      ):(
        <Tab.Navigator 
          tabBarOptions = {{
            activeTintColor:Colors.primaryColor,
            inactiveTintColor:Colors.bottom,
            activeBackgroundColor:'white',
            inactiveBackgroundColor:'white',
            showLabel:'true',
            keyboardHidesTabBar:'true',
          }}
          backBehavior='initialRoute'
          initialRouteName="Redeem" 
        >
          <Tab.Screen name="Redeem" component={Redeem} 
            options={{
              // tabBarBadge:'3',
              tabBarLabel: 'โปรโมชั่น',
              tabBarColor:Colors.primaryColor,
              tabBarIcon: ({ color }) => (
                <Fontisto name="shopping-sale" size={24} color= {color} />
              )}}
              />
          <Tab.Screen name="BrandPoint" component={BrandPoint} 
            options={{
              tabBarLabel: 'แบรนด์',
              tabBarColor:Colors.primaryColor,
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="redeem" size={24} color={color}/>
              )}}/>
          <Tab.Screen name="ShopPoint" component={ShopPoint} 
            options={{
              tabBarLabel: 'ร้านค้า',
              tabBarColor:Colors.primaryColor,
              tabBarIcon: ({ color }) => (
                <Fontisto name="shopping-package" size={24} color={color} />
              )}}/>
          <Tab.Screen name="Profile" component={Profile} 
            options={{
              tabBarLabel: 'ฉัน',
              size:24,
              tabBarColor:Colors.primaryColor,
              tabBarIcon: ({ color }) => (
                <Ionicons name="person" size={24} color={color}/>
              )}}/>
        </Tab.Navigator>
      )}      
    </NavigationContainer>
  );
}


export default function App() {
  let [fontsLoaded] = useFonts({
    Prompt_100Thin,
    Prompt_100Thin_Italic,
    Prompt_200ExtraLight,
    Prompt_200ExtraLight_Italic,
    Prompt_300Light,
    Prompt_300Light_Italic,
    Prompt_400Regular,
    Prompt_400Regular_Italic,
    Prompt_500Medium,
    Prompt_500Medium_Italic,
    Prompt_600SemiBold,
    Prompt_600SemiBold_Italic,
    Prompt_700Bold,
    Prompt_700Bold_Italic,
    Prompt_800ExtraBold,
    Prompt_800ExtraBold_Italic,
    Prompt_900Black,
    Prompt_900Black_Italic,
  });

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <AuthProvider>
      <ShopMemberProvider>
        <BrandMemberProvider>
          <BrandPointProvider>
            <CustomerProfileProvider>
              <ShopCouponProvider>
                <MyTabs />
              </ShopCouponProvider>
            </CustomerProfileProvider>
          </BrandPointProvider>
        </BrandMemberProvider>
      </ShopMemberProvider>      
    </AuthProvider>
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