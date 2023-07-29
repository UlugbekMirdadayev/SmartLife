/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
 
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'; 
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import AppNavigators from './src/navigators/AppNavigators'
import createStore from './src/services/createStore'
import i18n from './src/components/Language'
import { I18nextProvider } from 'react-i18next'
import SplashScreen from 'react-native-splash-screen'
import LunchScreen from './src/containers/LunchScreen';

const { store, persistor } = createStore()

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      gateLifted: false
    }
  }

  onBeforeLift = () => {
    // Take an action before the gate lifts
    setTimeout(() => { 
      this.setState({ gateLifted: true}) 
    }, 80000);
  }

  componentDidMount(){
    setTimeout(() => {
      SplashScreen.hide();
    }, 10000);
  }
    render(){
      return(
        <Provider store={store}>
        {/* <NavigationContainer ref={NavigationService._navigator}> */}
        <PersistGate persistor={persistor} loading={<LunchScreen/>} onBeforeLift={this.onBeforeLift()}>
          <I18nextProvider i18n={i18n()}>
            <AppNavigators/>
          </I18nextProvider>
        </PersistGate>
        {/* </NavigationContainer> */}
      </Provider>
      )
    }
    
}

export default App;
