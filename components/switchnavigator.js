import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import  DonateCylinder from '../screens/Donatecylinder';
import RequestCylinder from '../screens/Requestcylinder';

export const AppTabNavigator = createBottomTabNavigator({
  DonateCylinder : {
    screen: DonateCylinder,
    navigationOptions :{
     
      tabBarLabel : "Donate item",
    }
  },
  RequestCylinder: {
    screen: RequestCylinder,
    navigationOptions :{
      
      tabBarLabel : "Request item",
    }
  }
});