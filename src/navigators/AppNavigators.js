import React from 'react';
import {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import NavigationService from '../navigators/NavigationService';

import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../containers/HomeScreen';
import ClientDashboard from '../containers/Client/Dashboard';
import ChatScreen from '../containers/Client/Chat';
import ClientSetting from '../containers/Client/Setting';
import ClientPayDetails from '../containers/Client/ClientPayDetails';
import ClientPayHistory from '../containers/Client/ClientPayHistory';
import ClientProfile from '../containers/Client/ClientProfile';
import ClientNotifications from '../containers/Client/Notifications';
import Vounchers from '../containers/Client/Vounchers';
import ClientHelp from '../containers/Client/Help';
import ClientLegal from '../containers/Client/Legal';

import KassirDashboard from '../containers/Kasir/Dashboard';
import KassirSetting from '../containers/Kasir/Setting';
import AddXarajat from '../containers/Kasir/AddXarajat';
import UserTanlash from '../containers/Kasir/UserTanlash';
import UserTekshirish from '../containers/Kasir/UserTekshirish';
import OtherPayments from '../containers/Kasir/OtherPayments';
import UserTovar from '../containers/Kasir/UserTovar';
import KassirPaymentDetails from '../containers/Kasir/PaymentDetails';
import KassirTolovQabulQilish from '../containers/Kasir/TolovQabulQilish';
import ChatKassir from '../containers/Kasir/ChatKassir';
import KassirNotifications from '../containers/Kasir/Notifications';
import Ayirboshlash from '../containers/Kasir/Ayirboshlash';

import SotuvchiDashboard from '../containers/Sotuvchi/Dashboard';
import XaridTanlash from '../containers/Sotuvchi/XaridTanlash';
import ViewXarid from '../containers/Sotuvchi/ViewXarid';
import YangiShartnoma from '../containers/Sotuvchi/YangiShartnoma';
import ShartnomaKiritish from '../containers/Sotuvchi/ShartnomaKiritish';
import NaqtgaShartnomaKiritish from '../containers/Sotuvchi/NaqtgaShartnomaKiritish';
import MahsulotMalumotlari from '../containers/Sotuvchi/MahsulotMalumotlari';
import MahsulotTanlash from '../containers/Sotuvchi/MahsulotTanlash';
import PaymentDetails from '../containers/Sotuvchi/PaymentDetails';
import SotuvchiProfile from '../containers/Sotuvchi/SotuvchiProfile';
import ChatSotuvchi from '../containers/Sotuvchi/ChatSotuvchi';
import SotuvchiNewsView from '../containers/Sotuvchi/NewsView';
import SotuvchiNotifications from '../containers/Sotuvchi/Notifications';

import PulUndirDashboard from '../containers/Pulundiruvchi/Dashboard';
import PulUndirSetting from '../containers/Pulundiruvchi/Setting';
import PunUndiruvchiUserTanlash from '../containers/Pulundiruvchi/UserTanlash';
import MuddatUzaytirish from '../containers/Pulundiruvchi/MuddatUzaytirish';
import MuddatUzaytirishInside from '../containers/Pulundiruvchi/MuddatUzaytirishInside';
import PulUndiruvchiPaymentDetails from '../containers/Pulundiruvchi/PaymentDetails';
import PulUndiruvchiTolovQabulQilish from '../containers/Pulundiruvchi/TolovQabulQilish';
import PulUndiruvchiNotifications from '../containers/Pulundiruvchi/Notifications';
import PulUndiruvchiBlokUsers from '../containers/Pulundiruvchi/BlokUsers';
// const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const height = Dimensions.get('window').height;
// const width = Dimensions.get('window').width;

const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

class AppNavigators extends Component {
  state = {
    userID: '',
    token: '',
  };
  render() {
    const userDatas = this.props.userData;
    const userRole = this.props.userData?.user?.role;
    const lengthData = Object.keys(userDatas).length;

    // console.log('ssssss', curretMode)
    // console.log('tokensss', Object.keys(userDatas).length);
    // console.log('datas', userDatas);

    return (
      <NavigationContainer ref={NavigationService._navigator}>
        {lengthData > 0 ? (
          userRole === 'user' ? (
            <Stack.Navigator
              screenOptions={TransitionScreenOptions}
              initialRouteName="ClientDashboard"
              // headerMode='float'
              detachInactiveScreens={false}>
              <Stack.Screen
                name="ClientDashboard"
                component={ClientDashboard}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ClientPayDetails"
                component={ClientPayDetails}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ClientPayHistory"
                component={ClientPayHistory}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ClientProfile"
                component={ClientProfile}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ClientSetting"
                component={ClientSetting}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ClientNotifications"
                component={ClientNotifications}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Vounchers"
                component={Vounchers}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ClientHelp"
                component={ClientHelp}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ClientLegal"
                component={ClientLegal}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          ) : userRole === 'cashier' ? (
            <Stack.Navigator
              screenOptions={TransitionScreenOptions}
              initialRouteName="KassirDashboard"
              // headerMode='float'
              detachInactiveScreens={false}>
              <Stack.Screen
                name="KassirDashboard"
                component={KassirDashboard}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ChatKassir"
                component={ChatKassir}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AddXarajat"
                component={AddXarajat}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Ayirboshlash"
                component={Ayirboshlash}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="UserTanlash"
                component={UserTanlash}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="UserTekshirish"
                component={UserTekshirish}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="OtherPayments"
                component={OtherPayments}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="UserTovar"
                component={UserTovar}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="KassirPaymentDetails"
                component={KassirPaymentDetails}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="KassirTolovQabulQilish"
                component={KassirTolovQabulQilish}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="KassirSetting"
                component={KassirSetting}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="KassirNotifications"
                component={KassirNotifications}
                options={{
                  headerShown: false,
                }}
              />

              {/* <Stack.Screen
                name="ClientProfile"
                component={ClientProfile}
                options={{
                  headerShown: false,
                }}
              /> */}
            </Stack.Navigator>
          ) : userRole === 'salesman' ? (
            <Stack.Navigator
              screenOptions={TransitionScreenOptions}
              initialRouteName="SotuvchiDashboard"
              // headerMode='float'
              detachInactiveScreens={false}>
              <Stack.Screen
                name="SotuvchiDashboard"
                component={SotuvchiDashboard}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="SotuvchiNewsView"
                component={SotuvchiNewsView}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="XaridTanlash"
                component={XaridTanlash}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ViewXarid"
                component={ViewXarid}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="MahsulotTanlash"
                component={MahsulotTanlash}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="PaymentDetails"
                component={PaymentDetails}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="YangiShartnoma"
                component={YangiShartnoma}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ShartnomaKiritish"
                component={ShartnomaKiritish}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="NaqtgaShartnomaKiritish"
                component={NaqtgaShartnomaKiritish}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="MahsulotMalumotlari"
                component={MahsulotMalumotlari}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="SotuvchiProfile"
                component={SotuvchiProfile}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ChatSotuvchi"
                component={ChatSotuvchi}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="SotuvchiNotifications"
                component={SotuvchiNotifications}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          ) : userRole === 'taker' ? (
            <Stack.Navigator
              screenOptions={TransitionScreenOptions}
              initialRouteName="PulUndirDashboard"
              // headerMode='float'
              detachInactiveScreens={false}>
              <Stack.Screen
                name="PulUndirDashboard"
                component={PulUndirDashboard}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="UserTekshirish"
                component={UserTekshirish}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="KassirPaymentDetails"
                component={KassirPaymentDetails}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="KassirTolovQabulQilish"
                component={KassirTolovQabulQilish}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="UserTovar"
                component={UserTovar}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="PulUndirSetting"
                component={PulUndirSetting}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PunUndiruvchiUserTanlash"
                component={PunUndiruvchiUserTanlash}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="MuddatUzaytirish"
                component={MuddatUzaytirish}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="MuddatUzaytirishInside"
                component={MuddatUzaytirishInside}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="PulUndiruvchiPaymentDetails"
                component={PulUndiruvchiPaymentDetails}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="PulUndiruvchiTolovQabulQilish"
                component={PulUndiruvchiTolovQabulQilish}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="PulUndiruvchiNotifications"
                component={PulUndiruvchiNotifications}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="PulUndiruvchiBlokUsers"
                component={PulUndiruvchiBlokUsers}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          ) : (
            <></>
          )
        ) : (
          <Stack.Navigator
            screenOptions={TransitionScreenOptions}
            initialRouteName="HomeScreen"
            // headerMode='float'
            detachInactiveScreens={false}>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userData: state.user.user,
  currentLangCode: state.language.lang,
  curretMode: state.darkmode.darkmodeset,
});

export default withTranslation('main')(connect(mapStateToProps)(AppNavigators));
