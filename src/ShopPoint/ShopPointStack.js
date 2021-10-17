import React from "react";
import Colors from '../constants/Colors';
import { createStackNavigator } from "@react-navigation/stack";
import ShopPointScreen from './ShopPointScreen'
import ShopPointDetail from './ShopPointDetail';

const ShopPointStack = createStackNavigator();

const  ShopPoint = () => {
    return (
      <ShopPointStack.Navigator
      initialRouteName='ShopPointScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>
          <ShopPointStack.Screen
            name="ShopPointScreen"
            component={ShopPointScreen}
            options={{
              headerTitleStyle : {alignSelf:'center',fontSize:25,fontFamily: 'Prompt_400Regular'},
              title: "แลกรางวัลจากร้านค้า",
            }}
          />
          <ShopPointStack.Screen
            name="ShopPointDetail"
            component={ShopPointDetail}
            options={{
              headerTitleStyle : {alignSelf:'center',fontSize:25,fontFamily: 'Prompt_400Regular'},
              title: "แลกรางวัล",
              headerShown:false
            }}
          />
      </ShopPointStack.Navigator>  
    )
}



export default ShopPoint;