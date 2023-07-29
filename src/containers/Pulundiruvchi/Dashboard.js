import React, {useEffect, useRef, useState} from 'react';
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
import {connect, useDispatch} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SvgUri from 'react-native-svg-uri';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper';
import NavigationService from '../../navigators/NavigationService';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const SLIDER_WIDTH = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 2) / 5);
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import {setDarkmode, saveUser} from '../../services/actions';
import moment from 'moment';
import Spinner from '../../components/Spinner';
import ignoreWarnings from 'ignore-warnings';

function SotuvchiDashboard(props) {
  const darkmode = props.curretMode;

  const dispatch = useDispatch();

  const {t} = props;

  const lengthData = Object.keys(props.userData).length;

  const [PulUndirishKerak, SetPulUndirishKerak] = useState(0);
  const [BoglanishKerak, SetBoglanishKerak] = useState(0);
  const [BloklashKerak, SetBloklashKerak] = useState(0);
  const [Bloklanganlar, SetBloklanganlar] = useState(0);
  const [listMoneyCollect, SetListMoneyCollect] = useState([]);
  const [showSpinner, SetshowSpinner] = useState(false);

  const DashboardInfo = () => {
    SetshowSpinner(true);
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };
    axios
      .get('https://app.smart-life.uz/api/v1/money/collector/statistics', {
        headers,
      })
      .then(response => {
        SetshowSpinner(false);
        SetPulUndirishKerak(response.data.statistic.money);
        SetBoglanishKerak(response.data.statistic.countUser);
        SetBloklashKerak(response.data.statistic.waitingBlockUsers);
        SetBloklanganlar(response.data.statistic.blockedUsers);
        SetListMoneyCollect(response.data.data);
        // console.log(response.data)
      })
      .catch(function (error) {
        SetshowSpinner(false);
        if (error.response) {
          if (error.response.status == 401) {
            props.dispatch(saveUser({}));
          }
        }
      });
  };

  useEffect(() => {
    DashboardInfo();
    props.navigation.addListener('focus', () => {
      DashboardInfo();
    });
  }, []);

  return (
    <>
      <Spinner processing={showSpinner} />
      <View style={Css(darkmode).container}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />

        <View style={Css(darkmode).content}>
          <View style={Css(darkmode).pageheader}>
            <View
              style={[
                Css(darkmode).flex,
                Css(darkmode).itemscenter,
                Css(darkmode).between,
              ]}>
              <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                <TouchableOpacity
                  style={Css(darkmode).proicons}
                  onPress={() =>
                    NavigationService.navigate('PulUndirSetting')
                  }></TouchableOpacity>

                <View style={Css(darkmode).ml10}>
                  <Text style={[Css(darkmode).bold, Css(darkmode).h3]}>
                    {lengthData > 0 ? props.userData.user.last_name : ''}{' '}
                    {lengthData > 0 ? props.userData.user.first_name : ''}
                  </Text>
                  <Text style={{color: '#AEAEAE'}}>
                    Smartlife shop asistant
                  </Text>
                </View>
              </View>

              <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate('PulUndiruvchiNotifications')
                  }>
                  <Octicons
                    name="bell"
                    size={24}
                    style={Css(darkmode).blackwhite}
                  />
                  {/* <View style={{backgroundColor:'#F7060B', width:11, height:11, borderRadius:10, position:'absolute', right: -1, top: -2}}></View> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView
            style={Css(darkmode).mt20}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 120}}
            contentInset={{bottom: 50}}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: '#005D4D',
                borderRadius: 12,
                padding: 20,
                marginTop: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#005D4D',
                  width: 66,
                  height: 66,
                  borderRadius: 66,
                  right: -5,
                  top: -8,
                  position: 'absolute',
                  borderWidth: 10,
                  borderColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome name={'dollar-sign'} size={30} color={'#fff'} />
              </View>
              <View>
                <Text style={{fontWeight: '600', fontSize: 16, color: '#fff'}}>
                  {t('sotilgan_tovarlar_summasi')}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{color: '#fff'}}>{t('pul_undirish_kerak')}</Text>
                  <Text
                    style={{fontSize: 30, fontWeight: '600', color: '#fff'}}>
                    {PulUndirishKerak}{' '}
                  </Text>
                </View>
                <View style={{width: 110}}>
                  <Text style={{color: '#fff'}}>{t('boglanish_kerak')}</Text>
                  <Text
                    style={{fontSize: 30, fontWeight: '600', color: '#fff'}}>
                    {BoglanishKerak}{' '}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{color: '#fff'}}>{t('bloklash_kerak')}</Text>
                  <Text
                    style={{fontSize: 30, fontWeight: '600', color: '#fff'}}>
                    {Bloklanganlar}{' '}
                  </Text>
                </View>
                <View style={{width: 110}}>
                  <Text style={{color: '#fff'}}>{t('bloklanganlar')}</Text>
                  <Text
                    style={{fontSize: 30, fontWeight: '600', color: '#fff'}}>
                    {Bloklanganlar}{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View style={Css(darkmode).mt20}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate('PunUndiruvchiUserTanlash')
                  }
                  style={[Css(darkmode).btnyellow]}>
                  <Text style={[Css(darkmode).blackwhite, {fontWeight: '600'}]}>
                    {t('muddat_uzaytirish')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate('PulUndiruvchiBlokUsers')
                  }
                  style={[Css(darkmode).lightGreenbtn, Css(darkmode).mt10]}>
                  <Text style={[Css(darkmode).blackwhite, {fontWeight: '600'}]}>
                    {t('bloklash_kerak')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('UserTekshirish')}
                  style={[Css(darkmode).lightGreenbtn, Css(darkmode).mt10]}>
                  <Text style={[Css(darkmode).blackwhite, {fontWeight: '600'}]}>
                    Shartnoma qabul qilish
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={Css(darkmode).mt20}>
              <View>
                <Text style={Css(darkmode).h4}>{t('bugun_pul_undirish')}</Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              {listMoneyCollect.map((items, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate(
                        'PulUndiruvchiPaymentDetails',
                        {
                          payments: items,
                        },
                      )
                    }
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderBottomColor: '#ededed',
                      paddingBottom: 8,
                      marginVertical: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: 49,
                          height: 49,
                          backgroundColor: '#ededed',
                          borderRadius: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <MaterialIcon name="account" size={25} color="#999" />
                      </View>
                      <View style={{marginLeft: 12}}>
                        <Text style={Css(darkmode).h4}>
                          {items.icloud.serialNumber}
                        </Text>
                        <Text style={{color: '#999', fontSize: 16}}>
                          {items.icloud.account}
                        </Text>
                      </View>
                    </View>
                    <View></View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    userData: state.user.user,
    currentLangCode: state.language.lang,
    curretMode: state.darkmode.darkmodeset,
  };
};

SotuvchiDashboard = connect(mapStateToProps)(SotuvchiDashboard);
export default withTranslation('main')(SotuvchiDashboard);
