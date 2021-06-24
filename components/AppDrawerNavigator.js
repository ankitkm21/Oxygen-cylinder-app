import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu  from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/MyDonations';
import NotificationScreen from '../screens/NotificationScreen';
import MyPrescriptionScreen from '../screens/MyPrescriptionScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    MyPrescription : {
      screen : MyPrescriptionScreen
    },
    MyDonations : {
    screen : MyDonationScreen
  },
   Notification : {
    screen : NotificationScreen
  },
   
    Setting : {
    screen : SettingScreen
  },
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })