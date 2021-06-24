import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import DonateCylinder from '../screens/Donatecylinder';
import RecieverDetails  from '../screens/ReceiverDetails';

export const AppStackNavigator = createStackNavigator({
  DonateCylinder: {
    screen :  DonateCylinder,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : RecieverDetails,
    navigationOptions:{
      headerShown : false
    }
  },

},
  {
    initialRouteName: 'DonateCylinder'
  }
);