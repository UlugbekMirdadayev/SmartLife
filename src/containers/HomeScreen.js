import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  // SafeAreaView,
  // ScrollView,
  StatusBar,
  // StyleSheet,
  Text,
  // useColorScheme,
  View,
  // Image,
  TouchableOpacity,
  // Dimensions,
  // KeyboardAvoidingView,
  TextInput,
  Alert,
  // PermissionsAndroid,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  connect,
  // , useDispatch, useSelector
} from 'react-redux';
import {
  withTranslation,
  // ,   useTranslation
} from 'react-i18next';
import Css from './assests/Style/Style';
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import NavigationService from '../navigators/NavigationService';
import MaskInput from 'react-native-mask-input';
// import TextInputMask from 'react-native-text-input-mask';
import axios from 'axios';
// import Components from '../components';
// import {SET_MODE} from '../services/constants';
import {
  // setDarkmode,
  saveUser,
} from '../services/actions';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import i18next from 'i18next';

function HomeScreen(props) {
  // const dispatch = useDispatch();
  const darkmode = props.currentMode;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [smsTrue, SetSmsTrue] = useState(false);
  const [isChecked, SetisChecked] = useState(false);
  const [edit, Setedit] = useState(true);
  const [firebaseTokens, SetFirebaseTokens] = useState('');
  const [editNumber, SetEditNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refNumber, refCode] = [useRef(), useRef()];

  useEffect(() => {
    //  props.dispatch(setDarkmode(false));
    //  alert(props.currentMode)
    // console.log('lang', props.currentLangCode);

    i18next.changeLanguage(props.currentLangCode);

    requestUserPermission();
    getMessage();

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      })
      .catch(err => console.log(err));

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PlaySounds();
    });

    return unsubscribe;
  }, [props.currentLangCode, requestUserPermission]);

  const PlaySounds = () => {
    try {
      // play the file tone.mp3
      // SoundPlayer.playSoundFile('circles', 'mp3');
      // or play from url
      // SoundPlayer.playUrl('https://music.yandex.ru/album/2021552/track/18221799')
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };

  const requestUserPermission = useCallback(() => {
    async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        checkToken();
        console.log('Authorization status:', authStatus);
      }
    };
  }, []);

  const getMessage = async () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    // alert('current')
    // PlaySounds()
  };

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCMToken', fcmToken, 'FCMToken');
      SetFirebaseTokens(fcmToken);
      //  alert(fcmToken)

      // sendToken(fcmToken)
    }
  };

  const ChangePhone = phone => {
    setPhoneNumber(phone);
    if (phone.length > 8) {
      SendPhone(phone);
      Setedit(false);
      SetEditNumber(true);
    }
  };

  const ChangeNumber = () => {
    SendPhone('');
    Setedit(true);
    SetEditNumber(false);
    SetSmsTrue(false);
  };

  const SendPhone = number => {
    setLoading(true);
    setPhoneNumber(number);
    const datas = {
      phone: '998' + number,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post('https://app.smart-life.uz/api/v1/sms/send', datas, {
        headers,
      })
      .then(response => {
        setLoading(false);
        if (response.data.status) {
          SetSmsTrue(true);
        }
      })
      .catch(({response}) => {
        setLoading(false);
        console.log(response?.data);
        Alert.alert(
          JSON.stringify(response?.data?.code),
          JSON.stringify(response?.data?.message),
        );
      });
  };

  const SendSms = () => {
    if (phoneNumber.length > 8) {
      if (!smsTrue) {
        return SendPhone(phoneNumber);
      } else {
        if (smsCode?.length !== 4) {
          return refCode?.current?.focus();
        }
        setLoading(true);
        const datas = {
          phone: '998' + phoneNumber,
          code: smsCode,
          deviceId: DeviceInfo.getDeviceId(),
          FCMToken: firebaseTokens,
          mobile: true,
          platform: Platform.OS,
        };

        const headers = {
          'Content-Type': 'application/json',
        };
        axios
          .post('https://app.smart-life.uz/api/v1/sms/verify', datas, {
            headers,
          })
          .then(response => {
            setLoading(false);
            if (response?.data?.status) {
              // alert(response.data.user.role)
              props.dispatch(saveUser(response?.data));
            }
          })
          .catch(err => {
            setLoading(false);
            console.log(err.response.data.message);
            Alert.alert(
              JSON.stringify(err?.response?.data?.code || 'Error'),
              JSON.stringify(err?.response?.data?.message || ''),
            );
            console.log(err?.message);
          });
      }
    } else {
      refNumber?.current?.focus();
    }
  };

  const {t} = props;

  const styles = StyleSheet.create({
    phoneRow: {position: 'absolute', zIndex: 99, top: 25, left: 20},
    phoneText: {fontSize: 15, color: darkmode ? '#fff' : '#000'},
  });

  return (
    <>
      <View style={Css(darkmode).container}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor={'transparent'}
        />

        <View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FFCD38', '#FBDE78']}
            style={[Css(darkmode).header]}>
            <View>
              <Text
                style={[
                  Css(darkmode).h2,
                  Css(darkmode).bold,
                  Css(darkmode).textCenter,
                ]}>
                Hi, Welcome Back! 👋
              </Text>
              <Text style={Css(darkmode).textCenter}>
                Lorem ipsum dolor sit amet
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={Css(darkmode).wrapmain}>
          <View>
            <Text style={Css(darkmode).blackwhite}>{t('phone_')}</Text>
          </View>
          <View>
            <View style={styles.phoneRow}>
              <Text style={styles.phoneText}>+998</Text>
            </View>

            {/* <TextInput style={[Css(darkmode).roundinput, Css(darkmode).mt10]}/> */}
            <MaskInput
              ref={refNumber}
              value={phoneNumber}
              onChangeText={(masked, unmasked) => ChangePhone(unmasked)}
              maxLength={15}
              keyboardType={'phone-pad'}
              returnKeyType={'done'}
              returnKeyLabel={'Ok'}
              editable={edit}
              mask={[
                '(',
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
              ]}
              style={[
                Css(darkmode).roundinput,
                Css(darkmode).mt10,
                [{paddingLeft: 65}][0],
              ]}
            />
          </View>

          {smsTrue ? (
            <View style={[{marginTop: 20}][0]}>
              <Text style={Css(darkmode).h5}>{t('sms_kod')}</Text>
              <View>
                <TextInput
                  ref={refCode}
                  style={[Css(darkmode).roundinput, Css(darkmode).mt10]}
                  placeholder={'_ _ _ _ _'}
                  keyboardType={'number-pad'}
                  onChangeText={e => setSmsCode(e)}
                  returnKeyType={'done'}
                  returnKeyLabel={'Ok'}
                />
              </View>
            </View>
          ) : (
            <></>
          )}

          <View style={Css(darkmode).mt20}>
            <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
              <BouncyCheckbox
                size={25}
                fillColor={isChecked ? '#FBC100' : '#ededed'}
                unfillColor="#fff"
                text={t('offerta_view')}
                iconStyle={[{borderColor: 'red'}][0]}
                textStyle={Css(darkmode).lightgray}
                innerIconStyle={[{borderWidth: 2}][0]}
                // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                onPress={SetisChecked}
              />
            </View>
          </View>

          {/* <View style={{marginTop: 40}}>
                <TouchableOpacity
                 onPress={() => NavigationService.navigate('ClientDashboard')}
                >
                   <Text>Client</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 10}}
                  onPress={() => NavigationService.navigate('SotuvchiDashboard')}
                >
                   <Text>Sotuvchi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop: 10}}
                  onPress={() => NavigationService.navigate('KassirDashboard')}
                >
                   <Text>Kassir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 10}}
                  onPress={() => NavigationService.navigate('PulUndirDashboard')}
                >
                   <Text>Pul undiruvchi</Text>
                </TouchableOpacity>
             </View> */}

          {editNumber ? (
            <View style={Css(darkmode).mt20}>
              <TouchableOpacity
                onPress={() => ChangeNumber()}
                style={Css(darkmode).lightbtn}>
                <Text style={Css(darkmode).h4}>Raqam o'zgartirish</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}

          <View style={Css(darkmode).mt20}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFCD38', '#FBDE78']}
              style={[Css(darkmode).roundedfull]}>
              <TouchableOpacity
                style={[Css(darkmode).mainbtn]}
                onPress={() => SendSms()}>
                <Text style={[Css(darkmode).bold, Css(darkmode).h4]}>
                  {loading ? <ActivityIndicator /> : t('Kirish')}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    userData: state.profile.user_data,
    currentMode: state.darkmode.darkmodeset,
    currentLangCode: state.language.lang,
  };
};

// HomeScreen = connect(mapStateToProps)(HomeScreen);
export default withTranslation('main')(connect(mapStateToProps)(HomeScreen));
