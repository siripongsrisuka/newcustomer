import React from "react";
import Colors from '../constants/Colors';
import { createStackNavigator } from "@react-navigation/stack";
import BrandPointScreen from './BrandPointScreen'
import BrandPointDetails from './BrandPointDetails';


const BrandPointStack = createStackNavigator();

const  BrandPoint = () => {
    return (
      <BrandPointStack.Navigator
        initialRouteName='BrandPointScreen'
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primaryColor,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
          <BrandPointStack.Screen
            name="BrandPointScreen"
            component={BrandPointScreen}
            options={{
              headerTitleStyle : {alignSelf:'center',fontSize:25,fontFamily: 'Prompt_400Regular'},
              title: "แลกรางวัลจากแบรนด์",
            }}
          />
          <BrandPointStack.Screen
            name="BrandPointDetails"
            component={BrandPointDetails}
            options={{
              headerTitleStyle : {alignSelf:'center',fontSize:25,fontFamily: 'Prompt_400Regular'},
              title: "แลกรางวัล",
            }}
          />
      
      
      </BrandPointStack.Navigator>
        
    )
}



export default BrandPoint;