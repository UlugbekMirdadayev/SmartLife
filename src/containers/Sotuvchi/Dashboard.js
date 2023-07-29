import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import NavigationService from '../../navigators/NavigationService';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
const height = Dimensions.get('window').height;
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import {saveUser, setImeiList} from '../../services/actions';
// import { io } from "socket.io-client";
import Octicons from 'react-native-vector-icons/Octicons';
import Spinner from '../../components/Spinner';
import {io} from 'socket.io-client';

function SotuvchiDashboard(props) {
  var socket = io.connect('http://185.65.202.117:3077');

  socket.on('connect', function () {
    socket.emit('add-user', 1);
  });

  // socket.emit('add-user', 1);

  // console.log('check', socket.connected);
  // const socket = io.connect("https://app.smart-life.uz");

  const [monthDays, SetmonthDays] = useState(0);
  const [monthMoney, SetmonthMoney] = useState(0);
  const [Contracts, SetContracts] = useState([]);

  const lengthData = Object.keys(props.userData).length;
  const [NewsList, SetNewsList] = useState(null);
  const [showSpinner, SetshowSpinner] = useState(false);

  const getImeiList = useCallback(() => {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };
    axios
      .get('https://app.smart-life.uz/api/v1/imei/check', {headers})
      .then(({data}) => {
        props.dispatch(setImeiList(data?.data));
        // setImeiList(
        //   data?.data?.map((item, key) => ({
        //     name: `${item?.IMEI}`,
        //     id: `${item?.IMEI + '.' + key}`,
        //   })),
        // );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.userData.token]);

  useEffect(() => {
    const GetNews = () => {
      SetshowSpinner(true);
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };
      axios
        .get('https://app.smart-life.uz/api/v1/news', {headers})
        .then(response => {
          SetNewsList(response.data[0]);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 401) {
              props.dispatch(saveUser({}));
            }
          }
        });
    };
    const DashboardInfo = () => {
      SetshowSpinner(true);

      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };
      axios
        .get('https://app.smart-life.uz/api/v1/taker/statistics', {
          headers,
        })
        .then(response => {
          SetshowSpinner(false);
          // console.log(response.data)
          SetmonthDays(response.data.monthDays);
          SetmonthMoney(response.data.monthMoney);
        })
        .catch(function (error) {
          SetshowSpinner(false);
          if (error.response) {
            // Alert.alert(JSON.stringify(error?.response?.status || ''));
            if (error.response.status === 401) {
              props.dispatch(saveUser({}));
            }
          }
        });
    };
    const GetContracts = () => {
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };
      axios
        .get('https://app.smart-life.uz/api/v1/installment/cashier/all', {
          headers,
        })
        .then(response => {
          if (response?.data?.length) {
            SetContracts(response?.data?.reverse());
          }
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 401) {
              props.dispatch(saveUser({}));
            }
          }
        });
    };
    DashboardInfo();
    GetNews();
    GetContracts();
    getImeiList();

    props.navigation.addListener('focus', () => {
      DashboardInfo();
      GetContracts();
      GetNews();
    });
  }, [props, getImeiList]);

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
                  style={[Css(darkmode)?.proicons]}
                  onPress={() => NavigationService.navigate('SotuvchiProfile')}>
                  <Text>{''}</Text>
                </TouchableOpacity>

                <View style={Css(darkmode).ml10}>
                  <Text style={[Css(darkmode).bold, Css(darkmode).h3]}>
                    {lengthData > 0 ? props.userData.user.last_name : ''}{' '}
                    {lengthData > 0 ? props.userData.user.first_name : ''}
                  </Text>
                  <Text style={[{color: '#AEAEAE'}][0]}>
                    Smartlife shop asistant
                  </Text>
                </View>
              </View>

              <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate('SotuvchiNotifications')
                  }>
                  <Octicons
                    name="bell"
                    size={24}
                    style={Css(darkmode).blackwhite}
                  />
                  {/* <View style={{backgroundColor:'#F7060B', width:11, height:11, borderRadius:10, position:'absolute', right: -1, top: -2}}></View> */}
                </TouchableOpacity>

                {/* <TouchableOpacity style={Css(darkmode).ml10}
               onPress={() => NavigationService.navigate('ChatSotuvchi')}
              >
               <Feather name='message-square' size={23} style={Css(darkmode).blackwhite}/>
              <View style={{backgroundColor:'#F7060B', width:11, height:11, borderRadius:10, position:'absolute', right: -1, top: -2}}></View>
              </TouchableOpacity> */}
              </View>
            </View>
          </View>

          <ScrollView
            style={Css(darkmode).mt20}
            contentContainerStyle={
              [{flexGrow: 1, paddingBottom: height / 5}][0]
            }
            contentInset={{bottom: height}}
            showsVerticalScrollIndicator={false}>
            <View
              style={
                [
                  {
                    backgroundColor: '#FBC100',
                    height: 224,
                    borderRadius: 12,
                    padding: 20,
                  },
                ][0]
              }>
              <View
                style={
                  [
                    {
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
                    },
                  ][0]
                }>
                <FontAwesome name={'dollar-sign'} size={30} color={'#fff'} />
              </View>
              <View>
                <Text style={[{fontWeight: '600', fontSize: 16}][0]}>
                  Sotilgan tovarlar summasi
                </Text>
              </View>

              <View
                style={
                  [
                    {
                      marginTop: 40,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  ][0]
                }>
                <View>
                  <Text style={[{color: '#000'}][0]}>Kunlik sotuv</Text>
                  <Text
                    style={
                      [{fontSize: 30, fontWeight: '600', color: '#000'}][0]
                    }>
                    {monthDays} $
                  </Text>
                </View>
                <View>
                  <Text style={[{color: '#000'}][0]}>Oylik sotuv</Text>
                  <Text
                    style={
                      [{fontSize: 30, fontWeight: '600', color: '#000'}][0]
                    }>
                    {monthMoney} $
                  </Text>
                </View>
              </View>

              {NewsList != null ? (
                <View
                  style={[
                    Css(darkmode).shadowmd,
                    [
                      {
                        backgroundColor: darkmode ? '#333' : '#fff',
                        width: '100%',
                        padding: 10,
                        marginTop: 40,
                        borderRadius: 8,
                      },
                    ][0],
                  ]}>
                  <Text style={Css(darkmode).h5}>{NewsList.article}</Text>
                  <View style={[{marginTop: 5}][0]}>
                    <TouchableOpacity
                      onPress={() =>
                        NavigationService.navigate('SotuvchiNewsView', {
                          title: NewsList.title,
                          desc: NewsList.description,
                          art: NewsList.article,
                        })
                      }>
                      <Text style={[{color: '#005D4D', fontWeight: '600'}][0]}>
                        Batafsil...
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>

            <View style={Css(darkmode).mt40}>
              {/* <View>
                   <TouchableOpacity style={[Css(darkmode).btnyellow]}>
                      <Text style={{fontWeight:'600'}}>Naqtga shartnoma</Text>
                   </TouchableOpacity>
                </View> */}
              <View>
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate('NaqtgaShartnomaKiritish')
                  }
                  style={[Css(darkmode).btnyellow, Css(darkmode).mt10]}>
                  <Text
                    style={
                      [
                        {
                          fontWeight: '600',
                          color: darkmode ? '#fff' : '#000',
                        },
                      ][0]
                    }>
                    Naqtga shartnoma
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('XaridTanlash')}
                  style={[Css(darkmode).lightGreenbtn, Css(darkmode).mt10]}>
                  <Text
                    style={
                      [
                        {
                          fontWeight: '600',
                          color: darkmode ? '#fff' : '#000',
                        },
                      ][0]
                    }>
                    Muddatli to’lovga shartnoma
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={Css(darkmode).mt20}>
              <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>
                Joriy shartnomalar
              </Text>

              <View>
                <View>
                  {Contracts.map((items, index) => {
                    return (
                      <View
                        key={items._id}
                        style={[Css(darkmode).flex, [{marginVertical: 10}][0]]}>
                        <View
                          style={
                            [
                              {
                                backgroundColor: '#F4F4F4',
                                width: 117,
                                height: 100,
                                borderRadius: 4,
                                alignItems: 'center',
                              },
                            ][0]
                          }>
                          <Image
                            source={require('../assests/images/iphone13.png')}
                            style={[{width: 70, height: 110}][0]}
                            resizeMode={'contain'}
                          />
                        </View>
                        <View style={[{marginLeft: 10}][0]}>
                          {/* <Text>Naqt sotuv</Text> */}
                          <Text style={[Css(darkmode).bold, Css(darkmode).h4]}>
                            {items.productId.name}
                          </Text>
                          <View style={[{marginTop: 20}][0]}>
                            <TouchableOpacity
                              onPress={() =>
                                NavigationService.navigate('PaymentDetails', {
                                  payments: items,
                                })
                              }
                              style={Css(darkmode).middlelight}>
                              <Text style={Css(darkmode).blackwhite}>
                                To’lov haqida
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <AwesomeAlert
          show={false}
          showProgress={false}
          title="Shartnoma Muvaffaqqiyatli
          qo’shildi"
          message=""
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Main page"
          confirmButtonColor="#FBC100"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            NavigationService.navigate('SotuvchiDashboard');
          }}
          alertContainerStyle={[{backgroundColor: 'rgba(0,0,0,0.7)'}][0]}
          contentContainerStyle={[{width: '96%'}][0]}
          titleStyle={[{textAlign: 'center'}][0]}
        />
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

export default withTranslation('main')(
  connect(mapStateToProps)(SotuvchiDashboard),
);
