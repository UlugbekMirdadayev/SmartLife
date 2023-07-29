import React from 'react';
import { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';



import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { saveUser } from '../services/actions'
import { Routines } from '../services/api'
import NavigationService from '../navigators/NavigationService'

import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import HomeScreen from '../containers/HomeScreen';
import ClientDashboard from '../containers/Client/Dashboard'
import ChatScreen from '../containers/Client/Chat';
import ClientSetting from '../containers/Client/Setting';
import ClientPayDetails from '../containers/Client/ClientPayDetails'
import ClientPayHistory from '../containers/Client/ClientPayHistory'
import ClientProfile from '../containers/Client/ClientProfile'


import KassirDashboard from '../containers/Kasir/Dashboard'
import KassirSetting from '../containers/Kasir/Setting'

import SotuvchiDashboard from '../containers/Sotuvchi/Dashboard';
import XaridTanlash from '../containers/Sotuvchi/XaridTanlash';
import ViewXarid from '../containers/Sotuvchi/ViewXarid'
import YangiShartnoma from '../containers/Sotuvchi/YangiShartnoma'
import ShartnomaKiritish from '../containers/Sotuvchi/ShartnomaKiritish'
import MahsulotMalumotlari from '../containers/Sotuvchi/MahsulotMalumotlari'

import PulUndirDashboard from '../containers/Pulundiruvchi/Dashboard'
import PulUndirSetting from '../containers/Pulundiruvchi/Setting'


const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
 

 

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width;

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
   
};

class AppNavigators extends Component {
  state = {
    userID: '',
    token: 'p'
  }
  render() {
 
    const { userData, sss, t, curretMode, currentLangCode } = this.props;
    const userID = this.state.userID;
    const token = this.state.token
    const usertype = 1
    const tokens = ''
    // console.log('ssssss', curretMode)
    return (
      <NavigationContainer ref={NavigationService._navigator}

      >
        {

          tokens != '' ? (

            usertype == 1? (

              <Stack.Navigator
              screenOptions={TransitionScreenOptions}
               initialRouteName="ClientDashboard"
               // headerMode='float'
               detachInactiveScreens={false}
              >
   
               <Stack.Screen
                 name="ClientDashboard"
                 component={ClientDashboard}
                 options={{
                   headerShown: false
                 }}
               />

              <Stack.Screen
                 name="Chat"
                 component={ChatScreen}
                 options={{
                   headerShown: false
                 }}
               />

                <Stack.Screen
                 name="ClientPayDetails"
                 component={ClientPayDetails}
                 options={{
                   headerShown: false
                 }}
               />

                <Stack.Screen
                 name="ClientPayHistory"
                 component={ClientPayHistory}
                 options={{
                   headerShown: false
                 }}
               />

                <Stack.Screen
                 name="ClientProfile"
                 component={ClientProfile}
                 options={{
                   headerShown: false
                 }}
               /> 
                <Stack.Screen
                 name="ClientSetting"
                 component={ClientSetting}
                 options={{
                   headerShown: false
                 }}
               />
                 
              </Stack.Navigator>
   
           ) : (
             usertype == 2 ? (
               <Stack.Navigator
               screenOptions={TransitionScreenOptions}
               initialRouteName="KassirDashboard"
               // headerMode='float'
               detachInactiveScreens={false}
             >
   
               <Stack.Screen
                 name="KassirDashboard"
                 component={KassirDashboard}
                 options={{
                   headerShown: false
                 }}
               /> 

              <Stack.Screen
                 name="KassirSetting"
                 component={KassirSetting}
                 options={{
                   headerShown: false
                 }}
               /> 


   
   
             </Stack.Navigator>
             ) : (
              usertype == 3 ? (
                <Stack.Navigator
                screenOptions={TransitionScreenOptions}
                initialRouteName="SotuvchiDashboard"
                // headerMode='float'
                detachInactiveScreens={false}
              >
    
                <Stack.Screen
                  name="SotuvchiDashboard"
                  component={SotuvchiDashboard}
                  options={{
                    headerShown: false
                  }}
                /> 
 
               <Stack.Screen
                  name="XaridTanlash"
                  component={XaridTanlash}
                  options={{
                    headerShown: false
                  }}
                /> 
 
               <Stack.Screen
                  name="ViewXarid"
                  component={ViewXarid}
                  options={{
                    headerShown: false
                  }}
                />  
 
                <Stack.Screen
                  name="YangiShartnoma"
                  component={YangiShartnoma}
                  options={{
                    headerShown: false
                  }}
                />  
 
                <Stack.Screen
                  name="ShartnomaKiritish"
                  component={ShartnomaKiritish}
                  options={{
                    headerShown: false
                  }}
                />  
 
                <Stack.Screen
                  name="MahsulotMalumotlari"
                  component={MahsulotMalumotlari}
                  options={{
                    headerShown: false
                  }}
                /> 
 
              </Stack.Navigator>
              ):(

                <Stack.Navigator
               screenOptions={TransitionScreenOptions}
               initialRouteName="PulUndirDashboard"
               // headerMode='float'
               detachInactiveScreens={false}
             >
   
               <Stack.Screen
                 name="PulUndirDashboard"
                 component={PulUndirDashboard}
                 options={{
                   headerShown: false
                 }}
               /> 

              <Stack.Screen
                 name="PulUndirSetting"
                 component={PulUndirSetting}
                 options={{
                   headerShown: false
                 }}
               /> 

               

             </Stack.Navigator>

              )
               
             )
           )
            
          ) : (
            <Stack.Navigator
              screenOptions={TransitionScreenOptions}
               initialRouteName="HomeScreen"
               // headerMode='float'
               detachInactiveScreens={false}
              >
   
               <Stack.Screen
                 name="HomeScreen"
                 component={HomeScreen}
                 options={{
                   headerShown: false
                 }}
               />
                 
              </Stack.Navigator>
          )
          
        }
      </NavigationContainer>
    )
  }
}




const mapStateToProps = (state, ownProps) => {
  return {
    userData: state.user.user,
    currentLangCode: state.language.currentLangCode,
    curretMode: state.darkmode.darkmodeset
  }
}

AppNavigators = connect(mapStateToProps)(AppNavigators)
export default withTranslation('main')(AppNavigators)