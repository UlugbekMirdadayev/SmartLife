import React, {useEffect, useState} from 'react';
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
  Switch,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SvgUri from 'react-native-svg-uri';
import NavigationService from '../../navigators/NavigationService';
import {SET_LANGUAGE} from '../../services/constants';
import {SET_DARKMODE} from '../../services/constants';
import {useDispatch} from 'react-redux';

import AwesomeAlert from 'react-native-awesome-alerts';
import {setDarkmode, saveUser, setLang} from '../../services/actions';

function SettingScreen(props) {
  const darkmode = props.curretMode;
  const dispatch = useDispatch();
  const [showLang, SetShowLang] = useState(false);

  const [showAlert, SetshowAlert] = useState(false);

  const lengthData = Object.keys(props.userData).length;
  const {t} = props;

  useEffect(() => {
    // props.dispatch(setDarkmode(false));
  }, []);

  const [isEnabled, setIsEnabled] = useState(darkmode);
  const toggleSwitch = val => {
    // alert(val)
    setIsEnabled(previousState => !previousState);
    props.dispatch(setDarkmode(val));
  };

  const LogOut = () => {
    props.dispatch(saveUser({}));
  };

  const changeLanguage = lang => {
    let {i18n, dispatch} = props;
    // props.dispatch(setLang(lang));
    i18n.changeLanguage(lang, () => {
      dispatch({type: SET_LANGUAGE, lang});
    });
  };

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
              <Ionic
                name={'arrow-back'}
                size={18}
                style={Css(darkmode).blackwhite}
              />
            </TouchableOpacity>
            <View style={Css(darkmode).ml10}>
              <Text style={Css(darkmode).h3}>{t('setting')}</Text>
            </View>
          </View>
        </View>

        <View style={Css(darkmode).mt20}>
          <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
            <TouchableOpacity
              style={Css(darkmode).proicons}
              activeOpacity={1}></TouchableOpacity>

            <View style={Css(darkmode).ml10}>
              <Text style={[Css(darkmode).bold, Css(darkmode).h3]}>
                {lengthData > 0 ? props.userData.user.last_name : ''}{' '}
                {lengthData > 0 ? props.userData.user.first_name : ''}
              </Text>
              <Text style={{color: '#AEAEAE'}}>
                {lengthData > 0 ? props.userData.user.phone : ''}
              </Text>
            </View>
          </View>

          <View style={Css(darkmode).mt20}>
            <Text style={Css(darkmode).h4}>{t('personal_info')}</Text>

            <View style={{marginTop: 10}}>
              <TouchableOpacity
                // onPress={() => NavigationService.navigate('ClientProfile')}
                style={[
                  Css(darkmode).flex,
                  Css(darkmode).itemscenter,
                  Css(darkmode).between,
                  {marginVertical: 10},
                ]}>
                <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                  <View>
                    <Feather
                      name="user"
                      size={20}
                      style={Css(darkmode).blackwhite}
                    />
                  </View>
                  <View style={Css(darkmode).ml10}>
                    <Text style={Css(darkmode).h4}>{t('profil')}</Text>
                  </View>
                </View>

                <View>
                  <Feather
                    name={'chevron-right'}
                    style={Css(darkmode).blackwhite}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={Css(darkmode).mt20}>
              <Text style={Css(darkmode).h4}>{t('umumiy')}</Text>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  onPress={() => SetShowLang(showLang ? false : true)}
                  style={[
                    Css(darkmode).flex,
                    Css(darkmode).itemscenter,
                    Css(darkmode).between,
                    {marginVertical: 10},
                  ]}>
                  <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                    <View>
                      <Feather
                        name="globe"
                        size={20}
                        style={Css(darkmode).blackwhite}
                      />
                    </View>
                    <View style={Css(darkmode).ml10}>
                      <Text style={Css(darkmode).h4}>
                        {t('selectLanguage')}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Feather
                      name={'chevron-right'}
                      size={20}
                      style={Css(darkmode).blackwhite}
                    />
                  </View>
                </TouchableOpacity>

                {showLang ? (
                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      onPress={() => changeLanguage('uz')}
                      style={{padding: 4}}>
                      <Text style={Css(darkmode).blackwhite}>O'zbekcha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => changeLanguage('ru')}
                      style={{padding: 4}}>
                      <Text style={Css(darkmode).blackwhite}>Русский</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>

            <View>
              {/* <Text style={Css(darkmode).h4}>About</Text> */}
              <View>
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('ClientLegal')}
                  style={[
                    Css(darkmode).flex,
                    Css(darkmode).itemscenter,
                    Css(darkmode).between,
                    {marginVertical: 10},
                  ]}>
                  <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                    <View>
                      <Feather
                        name="shield"
                        size={20}
                        style={Css(darkmode).blackwhite}
                      />
                    </View>
                    <View style={Css(darkmode).ml10}>
                      <Text style={Css(darkmode).h4}>Legal and Policies</Text>
                    </View>
                  </View>

                  <View>
                    <Feather
                      name={'chevron-right'}
                      size={20}
                      style={Css(darkmode).blackwhite}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => NavigationService.navigate('ClientHelp')}
                  style={[
                    Css(darkmode).flex,
                    Css(darkmode).itemscenter,
                    Css(darkmode).between,
                    {marginVertical: 10},
                  ]}>
                  <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                    <View>
                      <Feather
                        name="help-circle"
                        size={20}
                        style={Css(darkmode).blackwhite}
                      />
                    </View>
                    <View style={Css(darkmode).ml10}>
                      <Text style={Css(darkmode).h4}>{t('yordam')}</Text>
                    </View>
                  </View>

                  <View>
                    <Feather name={'chevron-right'} size={20} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    Css(darkmode).flex,
                    Css(darkmode).itemscenter,
                    Css(darkmode).between,
                    {marginVertical: 10},
                  ]}>
                  <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                    <View>
                      <Feather
                        name="moon"
                        size={20}
                        style={Css(darkmode).blackwhite}
                      />
                    </View>
                    <View style={Css(darkmode).ml10}>
                      <Text style={Css(darkmode).h4}>{t('dark_theme')}</Text>
                    </View>
                  </View>

                  <View>
                    <Switch
                      trackColor={{false: '#767577', true: '#FBDE78'}}
                      thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
                      ios_backgroundColor="#EDF2F7"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 30}}>
              <TouchableOpacity
                onPress={() => SetshowAlert(true)}
                style={{
                  borderWidth: 1,
                  borderColor: '#FF9A9A',
                  height: 56,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#FF4949', fontSize: 18}}>
                  {t('logOut')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={t('want_log_out')}
        message=""
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={t('no')}
        confirmText={t('yes')}
        confirmButtonColor="#FBC100"
        cancelButtonColor="#666"
        onCancelPressed={() => {
          SetshowAlert(false);
        }}
        onConfirmPressed={() => {
          // NavigationService.navigate('SotuvchiDashboard')
          LogOut();
        }}
        alertContainerStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}}
        contentContainerStyle={{width: '96%'}}
        titleStyle={{textAlign: 'center'}}
      />
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    userData: state.user.user,
    currentLangCode: state.language.lang,
    curretMode: state.darkmode.darkmodeset,
  };
};

SettingScreen = connect(mapStateToProps)(SettingScreen);
export default withTranslation('main')(SettingScreen);
