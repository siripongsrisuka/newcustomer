import React,{useEffect,useContext} from "react";
import {View,Text} from 'react-native'
// import {
//     AuthProvider,AuthContext,
//     StockProvider,
//     StockTempProvider,
//     CartProvider,
//     OrderProvider,
//     PickProductProvider,
//   } from '../context'

import { AuthContext } from '../context';

const EmptyScreen = ({navigation}) => {
    const {state,tryLocalSignIn} = useContext(AuthContext);

    useEffect(() => tryLocalSignIn().then(()=> navigation.navigate('WaitProcessScreen')) , [])
    
    return (
        <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}} >
            <Text>Empty Screen</Text>     
        </View>
    )
};

export default EmptyScreen;