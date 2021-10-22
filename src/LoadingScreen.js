import React, { useState, useRef,useEffect,useCallback, useContext } from "react";
import { View, Text, Button, Image, ActivityIndicator } from "react-native";
import Dimensions from "../src/constants/Dimensions";
import Colors from '../src/constants/Colors';
import db from '../db/firestore';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';



const LoadingScreen = ({navigation}) => {
    useEffect(()=>{
        const loadStock = async() => {
            await fetchCustomerProfile()
            
            // console.log('shopMember')

            setTimeout(() => {
                navigation.navigate("Redeem")
            },1000)
        }
        loadStock()
        
    },[])
   

    return (
        <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}} >      
            <Image source = {require('../image/Shopcham_FINAL_CF-03.png')} style={{width:Dimensions.Width/1.5, height:Dimensions.Width/1.5}}/>            
            <View style = {{height:80,width:Dimensions.Width}} >
                <PacmanIndicator color= {Colors.primaryColor} size = {60} />
                <Text>fjgdhkl</Text>
            </View>
        </View>
    )
};

export default LoadingScreen;