/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import NavigationService from '../../navigators/NavigationService';
import moment from 'moment';
import {t} from 'i18next';
function ChatScreen(props) {
  const darkmode = props.curretMode;

  const [open, SetOpen] = useState(0);
  return (
    <View style={Css(darkmode).container}>
      <StatusBar
        barStyle="dark-content"
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
              <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>
                {t('payments_history')}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={Css(darkmode).mt20}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}
          contentInset={{bottom: 50}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{height: 180, backgroundColor: '#FBC100', borderRadius: 10}}>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={require('../assests/images/iphone13.png')}
                style={{width: 90, height: 110}}
                resizeMode={'contain'}
              />
            </View>
          </View>

          <View style={Css(darkmode).mt10}>
            <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>
              {props?.route?.params?.payments?.productId?.name}
            </Text>
            <Text>Smart Phone</Text>
          </View>

          <View style={Css(darkmode).mt20}>
            {props.route.params.payments.loanDetails.map((items, index) => {
              return (
                <Fragment key={index}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      SetOpen(open === items.payId ? 0 : items.payId)
                    }
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '90%',
                      }}>
                      {items.paid ? (
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#B2E7DD',
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Feather name={'check'} size={30} color={'#005D4D'} />
                        </View>
                      ) : (
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#FFD6D6',
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Feather name={'x'} size={30} color={'#FF3535'} />
                        </View>
                      )}

                      <View>
                        <View style={{width: '90%', marginLeft: 6}}>
                          <Text style={{color: darkmode ? '#fff' : '#000'}}>
                            <Text
                              style={{
                                fontWeight: '600',
                                color: darkmode ? '#fff' : '#000',
                              }}>
                              {moment(items.paymentDate).format('ll')}
                            </Text>{' '}
                            uchun to’lov amalga oshirildi
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View>
                      <View>
                        <Feather
                          name={
                            open === items.payId ? 'chevron-up' : 'chevron-down'
                          }
                          size={25}
                          style={Css(darkmode).blackwhite}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>

                  {open === items.payId ? (
                    <View style={Css(darkmode).mt10}>
                      <View
                        style={[
                          Css(darkmode).mx10,
                          Css(darkmode).flex,
                          Css(darkmode).between,
                          Css(darkmode).itemscenter,
                        ]}>
                        <View>
                          <Text style={Css(darkmode).h5}>{t('date_')}</Text>
                        </View>
                        <View>
                          <Text style={[Css(darkmode).bold, Css(darkmode).h5]}>
                            July 16 2022
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          Css(darkmode).mx10,
                          Css(darkmode).flex,
                          Css(darkmode).between,
                          Css(darkmode).itemscenter,
                        ]}>
                        <View>
                          <Text style={Css(darkmode).h5}>
                            {t('kim_toladi')}
                          </Text>
                        </View>
                        <View>
                          <Text style={[Css(darkmode).bold, Css(darkmode).h5]}>
                            Sadulla Kobiljonov
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          Css(darkmode).mx10,
                          Css(darkmode).flex,
                          Css(darkmode).between,
                          Css(darkmode).itemscenter,
                        ]}>
                        <View>
                          <Text style={Css(darkmode).h5}>
                            {t('which_month')}
                          </Text>
                        </View>
                        <View>
                          <Text style={[Css(darkmode).bold, Css(darkmode).h5]}>
                            Mart oyi uchun
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          Css(darkmode).mx10,
                          Css(darkmode).flex,
                          Css(darkmode).between,
                          Css(darkmode).itemscenter,
                        ]}>
                        <View>
                          <Text style={Css(darkmode).h5}>
                            {t('qanch_toladi')}
                          </Text>
                        </View>
                        <View>
                          <Text style={[Css(darkmode).bold, Css(darkmode).h5]}>
                            $100
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          Css(darkmode).mx10,
                          Css(darkmode).flex,
                          Css(darkmode).between,
                          Css(darkmode).itemscenter,
                        ]}>
                        <View>
                          <Text style={Css(darkmode).h5}>{t('status_')}</Text>
                        </View>
                        <View>
                          {/* <Text style={[Css(darkmode).bold, Css(darkmode).h5]}>O’z vaqtida to’landi</Text> */}
                        </View>
                      </View>

                      <View
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <View>
                          {items.paid === false ? (
                            <TouchableOpacity
                              onPress={() =>
                                NavigationService.navigate(
                                  'KassirTolovQabulQilish',
                                  {
                                    id: props.route.params.payments._id,
                                    loanid: items.payId,
                                    remainingMoney:
                                      props.route.params.payments
                                        .remainingMoney,
                                  },
                                )
                              }
                              style={{
                                backgroundColor: '#FBC100',
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 10,
                                borderRadius: 10,
                              }}>
                              <Text> {t('tolov_qabul_qilish')}</Text>
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            alignContent: 'center',
                            marginLeft: 20,
                          }}>
                          <Feather name="download" size={18} />
                          <Text style={{color: '#005D4D', marginLeft: 10}}>
                            Download PDF
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                </Fragment>
              );
            })}
          </View>
        </ScrollView>
      </View>
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

export default withTranslation('main')(connect(mapStateToProps)(ChatScreen));
