import React from "react";
import Colors from '../constants/Colors';
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from './ProfileScreen'
// import ShopPointDetail from './ShopPointDetail';

const ProfileStack = createStackNavigator();

const  Profile = () => {
    return (
      <ProfileStack.Navigator  
      initialRouteName='ProfileScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.BackgroundColor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>
          <ProfileStack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              headerTitleStyle : {alignSelf:'center',fontSize:25, fontWeight:'bold'},
              title: "โปรไฟล์ของคุณ",
            }}/>
           
      
      </ProfileStack.Navigator>
        
    )
}



export default Profile;