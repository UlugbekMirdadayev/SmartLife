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
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SvgUri from 'react-native-svg-uri';
import NavigationService from '../../navigators/NavigationService';

function ChatScreen(props) {
  const darkmode = props.curretMode;

  useEffect(() => {}, []);

  return (
    <View style={Css(darkmode).container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />

      <View style={Css(darkmode).content}>
        <View style={Css(darkmode).pageheader}>
          <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
            <TouchableOpacity
              style={Css(darkmode).backto}
              onPress={() => NavigationService.goBack()}>
              <Ionic name={'arrow-back'} size={18} />
            </TouchableOpacity>
            <View style={Css(darkmode).ml10}>
              <Text style={Css(darkmode).h3}>Yangilik va maqola</Text>
            </View>
          </View>
        </View>

        <View style={Css(darkmode).mt20}>
          <View style={{height: '90%'}}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              contentInset={{bottom: 40}}>
              <View style={{flex: 1}}>
                <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>
                  {props?.route?.params?.title}
                </Text>

                <Text>{props.route.params.art}</Text>

                <Text style={{textAlign: 'justify'}}>
                  {props.route.params.desc}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ChatScreen;
