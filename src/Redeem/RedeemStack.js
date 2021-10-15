import React from "react";
import Colors from '../constants/Colors';
import { createStackNavigator } from "@react-navigation/stack";
import RedeemScreen from'./RedeemScreen';
import redeemCoupon from "./RedeemCoupon";
import redeemReward from "./RedeemReward";
const RedeemStack = createStackNavigator();

const  Redeem = () => {
    return (
      <RedeemStack.Navigator
          initialRouteName='RedeemScreen'
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primaryColor,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
        }}>
          <RedeemStack.Screen
              name="RedeemScreen"
              component={RedeemScreen}
              options={{
                headerTitleStyle : {alignSelf:'center',fontSize:25, fontWeight:'bold'},
                title: "หน้าหลัก",
                headerShown:false
              }}
          />
          <RedeemStack.Screen
              name="redeemCoupon"
              component={redeemCoupon}
              options={{
                headerTitleStyle : {alignSelf:'center',fontSize:25,fontFamily: 'Prompt_400Regular'},
                title: "คูปองของฉัน",
              }}
          />
          <RedeemStack.Screen
              name="redeemReward"
              component={redeemReward}
              options={{
                headerTitleStyle : {alignSelf:'center',fontSize:25,fontFamily: 'Prompt_400Regular'},
                title: "รางวัลของฉัน",
              }}
          />
        
      
      </RedeemStack.Navigator>
        
    )
}



export default Redeem;