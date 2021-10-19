import React from "react";
import { View,Image} from "react-native";

import Dimensions from "../constants/Dimensions";
import Colors from '../constants/Colors'
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


const WaitProcessScreen = ({navigation}) => {

    const waitProcess = async () => {
        await setTimeout(() => {
            navigation.navigate("LoginOrRegistor")
        },2000)
    }
    waitProcess()

    return (
        <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}} >      
            <Image source = {require('../../image/Shopcham_FINAL_CF-03.png')} style={{width:Dimensions.Width/1.5, height:Dimensions.Width/1.5}}/>
            <View style = {{height:80,width:Dimensions.Width}} >
                <PacmanIndicator color= {Colors.primaryColor} size = {60} />
            </View>
        </View>
    )
};

export default WaitProcessScreen;