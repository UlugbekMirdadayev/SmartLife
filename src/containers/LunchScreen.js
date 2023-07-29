import React, {useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import i18next from 'i18next';
import { connect, useDispatch, useSelector } from 'react-redux'
import { withTranslation } from 'react-i18next'

function LunchScreen(props) {

  useEffect(() => {
    i18next.changeLanguage(props.currentLangCode)
  },[])

  return (
    <>

      <View>
         <Text></Text>
      </View>
    
    </>
  );
}

 


const mapStateToProps = (state, ownProps) => {
  return {
      userData: state.profile.user_data,
      currentMode: state.darkmode.darkmodeset,
      currentLangCode: state.language.lang,     
  }
}

LunchScreen = connect(mapStateToProps)(LunchScreen)
export default withTranslation('main')(LunchScreen)
