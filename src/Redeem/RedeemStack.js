import React from "react";
import Colors from '../constants/Colors';
import { createStackNavigator } from "@react-navigation/stack";
import RedeemScreen from'./RedeemScreen';
import RedeemDetail from "./RedeemDetail";
import BrandCoupon from "./BrandCoupon";
const RedeemStack = createStackNavigator();

const  Redeem = () => {
    return (
      <RedeemStack.Navigator
          initialRouteName='RedeemScreen'
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.BackgroundColor,
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
              }}
          />
          <RedeemStack.Screen
              name="RedeemDetail"
              component={RedeemDetail}
              options={{
                headerTitleStyle : {alignSelf:'center',fontSize:25, fontWeight:'bold'},
                title: "คูปองของฉัน",
              }}
          />
          <RedeemStack.Screen
              name="BrandCoupon"
              component={BrandCoupon}
              options={{
                headerTitleStyle : {alignSelf:'center',fontSize:25, fontWeight:'bold'},
                title: "คูปอง",
              }}
          />
        
      
      </RedeemStack.Navigator>
        
    )
}



export default Redeem;