/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import NavigationService from '../../navigators/NavigationService';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import {saveUser} from '../../services/actions';
import moment from 'moment';
import Spinner from '../../components/Spinner';
const {width} = Dimensions.get('window');

function SotuvchiDashboard(props) {
  const [Terminal, SetTerminal] = useState(0);
  const [Card, SetCard] = useState(0);
  const [Usd, SetUsd] = useState(0);
  const [Uzs, SetUzs] = useState(0);
  const [visa, setVisa] = useState(0);
  const [ListXarajat, SetListXarajat] = useState([]);
  const [showSpinner, SetshowSpinner] = useState(false);
  const [totalXarajat, SetTotalXarajat] = useState(0);
  const [toggle, setToggle] = useState(false);

  const {t} = props;

  const lengthData = Object.keys(props.userData).length;

  const getWallet = useCallback(() => {
    SetshowSpinner(true);
    axios
      .get('https://app.smart-life.uz/api/v1/wallet/cashier', {
        headers: {
          'x-access-token': props?.userData?.token,
        },
      })
      .then(({data}) => {
        SetshowSpinner(false);
        SetTerminal(data.terminal);
        SetCard(data.card);
        SetUsd(data.usd);
        SetUzs(data.uzs);
        setVisa(data.visa);
      })
      .catch(err => {
        SetshowSpinner(false);
        console.log(err);
      });
  }, [props?.userData?.token]);
  const Xarajat = useCallback(() => {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };

    axios
      .get(
        'https://app.smart-life.uz/api/v1/cashier/expenses/all?page=0&limit=20&startDate=' +
          moment().format('YYYY-MM-D') +
          '&endDate=' +
          moment().format('YYYY-MM-D') +
          '',
        {headers},
      )
      .then(response => {
        SetListXarajat(response?.data?.data);
        // console.log(response?.data?.data);
        // alert(JSON.stringify(response.data))

        // alert(item.price)
        SetTotalXarajat(response.data.totalPrice);

        // alert(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            props.dispatch(saveUser({}));
          }
        }
      });
  }, [props]);
  const DashboardInfos = useCallback(() => {
    SetshowSpinner(true);
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };
    if (toggle) {
      axios
        .get(
          'https://app.smart-life.uz/api/v1/installment/cashier/statistics',
          {headers},
        )
        .then(response => {
          SetshowSpinner(false);
          SetTerminal(response.data.terminal);
          SetCard(response.data.card);
          SetUsd(response.data.usd);
          SetUzs(response.data.uzs);
          setVisa(response.data.visa);
        })
        .catch(function (error) {
          SetshowSpinner(false);
          if (error.response) {
            if (error.response.status === 401) {
              props.dispatch(saveUser({}));
            }
          }
        });
    } else {
      getWallet();
    }
  }, [toggle, props, getWallet]);

  useEffect(() => {
    DashboardInfos();
  }, [DashboardInfos, toggle]);

  useEffect(() => {
    Xarajat();
    props.navigation.addListener('focus', () => {
      DashboardInfos();
      Xarajat();
    });
  }, [props, Xarajat, DashboardInfos]);

  const darkmode = props.curretMode;

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
                  onPress={() => NavigationService.navigate('KassirSetting')}
                />

                <View style={Css(darkmode).ml10}>
                  <Text style={[Css(darkmode).bold, Css(darkmode).h3]}>
                    {lengthData > 0 ? props.userData.user.last_name : ''}{' '}
                    {lengthData > 0 ? props.userData.user.first_name : ''}
                  </Text>
                  <Text style={{color: '#AEAEAE'}}>Cashier</Text>
                </View>
              </View>

              <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate('KassirNotifications')
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
                backgroundColor: '#FBC100',
                borderRadius: 12,
                padding: 20,
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
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => setToggle(!toggle)}>
                <Text
                  style={[
                    {fontWeight: '600', fontSize: 16},
                    Css(darkmode).blackwhite,
                  ]}>
                  {toggle ? 'P2P' : t('sotilgan_tovarlar_summasi')} {" "}
                  <FontAwesome name={'exchange-alt'} size={16} color={'#000'} />
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  marginTop: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{color: '#000'}}>{t('valyuta')}</Text>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    {Usd?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}
                  </Text>
                </View>
                <View
                  style={{alignItems: 'flex-end', width: (width * 0.8) / 2}}>
                  <Text style={{color: '#000'}}>{t('sum_naqd')}</Text>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    {Uzs?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'UZS',
                    })?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{color: '#000'}}>{t('terminal_')}</Text>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    {Terminal?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'UZS',
                    })?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}
                  </Text>
                </View>
                <View
                  style={{alignItems: 'flex-end', width: (width * 0.8) / 2}}>
                  <Text style={{color: '#000'}}>{t('karta_')}</Text>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    {Card?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'UZS',
                    })?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{alignItems: 'flex-start', width: '100%'}}>
                  <Text style={{color: '#000'}}>Visa karta</Text>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                    {visa
                      ?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                      ?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}
                  </Text>
                </View>
              </View>
            </View>

            <View style={Css(darkmode).mt30}>
              <View>
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('Ayirboshlash')}
                  style={[Css(darkmode).btnyellow, Css(darkmode).mt10]}>
                  <Text style={[{fontWeight: '600'}, Css(darkmode).blackwhite]}>
                    {t('exchange')}
                  </Text>
                </TouchableOpacity>
                <View style={[Css(darkmode).flex, Css(darkmode).between]}>
                  <TouchableOpacity
                    onPress={() => NavigationService.navigate('UserTekshirish')}
                    style={[
                      Css(darkmode).btnyellow,
                      Css(darkmode).mt10,
                      Css(darkmode).w_50,
                    ]}>
                    <Text
                      style={[{fontWeight: '600'}, Css(darkmode).blackwhite]}>
                      {t('tolov_qabul_qilish_oylik')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => NavigationService.navigate('OtherPayments')}
                    style={[
                      Css(darkmode).btnyellow,
                      Css(darkmode).mt10,
                      Css(darkmode).w_50,
                    ]}>
                    <Text
                      style={[{fontWeight: '600'}, Css(darkmode).blackwhite]}>
                      {t('tolov_qabul_qilish_other')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {/* <TouchableOpacity style={[Css(darkmode).lightGreenbtn, Css(darkmode).mt10]}>
                      <Text style={{fontWeight:'600', color: darkmode ? '#fff' : '#000'}}>Zakup</Text>
                   </TouchableOpacity> */}
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#005D4D',
                //  height: 224,
                borderRadius: 12,
                padding: 20,
                marginTop: 20,
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
                  Smartlife {t('rasxod_oylik')}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
                  ${totalXarajat?.toFixed(2)}
                </Text>
              </View>
              <View
                style={[
                  {width: '100%', padding: 10, marginTop: 8, borderRadius: 8},
                ]}>
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('AddXarajat')}
                  style={{
                    backgroundColor: '#fff',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 30,
                  }}>
                  <Text style={{color: '#005D4D', fontWeight: '600'}}>
                    + {t('add_xarajat')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[{width: '100%', padding: 10, borderRadius: 8}]}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#6CC0B3',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 30,
                  }}>
                  <Text style={{color: '#fff', fontWeight: '600'}}>
                    Barcha xarajatlar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
{/* 
            <View style={[{width: '100%', padding: 10, flexDirection: 'row'}]}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#005D4D',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                  width: '45%',
                  marginRight: '10%',
                }}>
                <Text style={{color: '#fff', fontWeight: '600'}}>
                  Rasxodlar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#005D4D',
                  height: 50,
                  width: '45%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                }}>
                <Text style={{color: '#fff', fontWeight: '600'}}>
                  Boshqa rasxodlar
                </Text>
              </TouchableOpacity>
            </View> */}

            <View style={Css(darkmode).mt20}>
              <View>
                <Text style={Css(darkmode).h4}>{t('bugungi_xarajatlar')}</Text>
              </View>
            </View>

            <View style={{marginTop: 20, width: '100%'}}>
              {ListXarajat?.reverse()?.map((items, index) => {
                return (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        borderBottomColor: '#ededed',
                        paddingBottom: 8,
                        marginVertical: 10,
                        width: width * 0.89,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {/* <View style={{width: 49, height: 49, backgroundColor:'#FFF5D2', borderRadius: 50, alignItems:'center', justifyContent:'center'}}>
                              <MaterialIcon name='cart-outline' size={25} color='#E3AB04'/>
                           </View> */}
                        <View>
                          <Text style={{color: '#005D4D', fontSize: 16}}>
                            {items.name}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={{color: '#005D4D', fontSize: 16}}>
                          -${items.price}
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                );
              })}

              {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#ededed', paddingBottom: 8, marginVertical: 10}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                       <View style={{width: 49, height: 49, backgroundColor:'#B9E7DF', borderRadius: 50, alignItems:'center', justifyContent:'center'}}>
                          <MaterialIcon name='file-document-outline' size={25} color='#005D4D'/>
                       </View>
                       <View style={{marginLeft: 12}}>
                       <Text style={{color:'#005D4D', fontSize: 16}}>Bosha xarajatlar</Text>
                      </View>
                    </View>
                    <View>
                       <Text style={{color:'#005D4D', fontSize: 16}}>-400</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#ededed', paddingBottom: 8, marginVertical: 10}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                       <View style={{width: 49, height: 49, backgroundColor:'#B9E7DF', borderRadius: 50, alignItems:'center', justifyContent:'center'}}>
                          <MaterialIcon name='food-outline' size={25} color='#005D4D'/>
                       </View>
                       <View style={{marginLeft: 12}}>
                       <Text style={{color:'#005D4D', fontSize: 16}}>Tushlik / Kechki ovqat</Text>
                      </View>
                    </View>
                    <View>
                       <Text style={{color:'#005D4D', fontSize: 16}}>$400</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#ededed', paddingBottom: 8, marginVertical: 10}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                       <View style={{width: 49, height: 49, backgroundColor:'#B9E7DF', borderRadius: 50, alignItems:'center', justifyContent:'center'}}>
                          <MaterialIcon name='gift-open-outline' size={25} color='#005D4D'/>
                       </View>
                       <View style={{marginLeft: 12}}>
                       <Text style={{color:'#005D4D', fontSize: 16}}>Tug’ilgan kun / Bayram</Text>
                      </View>
                    </View>
                    <View>
                       <Text style={{color:'#005D4D', fontSize: 16}}>$400</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#ededed', paddingBottom: 8, marginVertical: 10}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                       <View style={{width: 49, height: 49, backgroundColor:'#B9E7DF', borderRadius: 50, alignItems:'center', justifyContent:'center'}}>
                          <MaterialIcon name='cup' size={25} color='#005D4D'/>
                       </View>
                       <View style={{marginLeft: 12}}>
                       <Text style={{color:'#005D4D', fontSize: 16}}>Coffe / Choy</Text>
                      </View>
                    </View>
                    <View>
                       <Text style={{color:'#005D4D', fontSize: 16}}>$400</Text>
                    </View>
                </View> */}
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
    currentLang: state.language.lang,
    curretMode: state.darkmode.darkmodeset,
    CashierSumma: state.balance.balanceset,
  };
};

export default withTranslation('main')(
  connect(mapStateToProps)(SotuvchiDashboard),
);
