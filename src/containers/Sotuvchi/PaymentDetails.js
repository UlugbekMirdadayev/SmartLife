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
import moment from 'moment';
function ChatScreen(props) {
  const darkmode = props.curretMode;

  useEffect(() => {
    //   alert(JSON.stringify(props.route.params.payments))
  }, []);

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
                To‘lov detallari
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
              {props.route.params.payments.productId.name}
            </Text>
            {/* <Text>Smart Phone</Text> */}
          </View>

          <View style={Css(darkmode).mt20}>
            <View>
              <Text>Narx detallari</Text>
            </View>
            <View
              style={[
                Css(darkmode).mt10,
                {
                  backgroundColor: darkmode ? '#25272b' : '#F8F9F9',
                  padding: 8,
                  borderRadius: 6,
                },
              ]}>
              <View
                style={[
                  Css(darkmode).flex,
                  Css(darkmode).between,
                  Css(darkmode).itemscenter,
                  Css(darkmode).mx10,
                ]}>
                <View>
                  <Text style={Css(darkmode).h5}>Sana</Text>
                </View>
                <View>
                  <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>
                    {moment(props.route.params.payments.createdAt).format('LL')}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  Css(darkmode).flex,
                  Css(darkmode).between,
                  Css(darkmode).itemscenter,
                  Css(darkmode).mx10,
                ]}>
                <View>
                  <Text style={Css(darkmode).h5}>Boshlang‘ich to‘lov</Text>
                </View>
                <View>
                  <Text style={[Css(darkmode).bold, Css(darkmode).h5]}>
                    ${props.route.params.payments.prepayment}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  Css(darkmode).flex,
                  Css(darkmode).between,
                  Css(darkmode).itemscenter,
                  Css(darkmode).mx10,
                ]}>
                <View>
                  <Text style={Css(darkmode).h5}>Muddat</Text>
                </View>
                <View>
                  <Text style={[Css(darkmode).bold, Css(darkmode).h5]}>
                    {props.route.params.payments.term} oy
                  </Text>
                </View>
              </View>

              <View
                style={[
                  Css(darkmode).flex,
                  Css(darkmode).between,
                  Css(darkmode).itemscenter,
                  Css(darkmode).mx10,
                ]}>
                <View>
                  <Text style={Css(darkmode).h5}>Narx</Text>
                </View>
                <View>
                  <Text style={[Css(darkmode).bold, Css(darkmode).h5]}>
                    ${props.route.params.payments.monthlyPayment} oyiga
                  </Text>
                </View>
              </View>

              <View
                style={[
                  Css(darkmode).flex,
                  Css(darkmode).between,
                  Css(darkmode).itemscenter,
                  Css(darkmode).mx10,
                ]}>
                <View>
                  <Text style={Css(darkmode).h5}>To‘lov sanasi (gacha)</Text>
                </View>
                <View>
                  <Text style={[Css(darkmode).bold, Css(darkmode).h5]}>
                    Oyning{' '}
                    {props.route.params.payments.loanDetails[0].startDate}-kuni
                  </Text>
                </View>
              </View>

              <View
                style={[
                  Css(darkmode).flex,
                  Css(darkmode).between,
                  Css(darkmode).itemscenter,
                  Css(darkmode).mx10,
                ]}>
                <View>
                  <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>
                    Jami
                  </Text>
                </View>
                <View>
                  <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>
                    $
                    {props.route.params.payments.term *
                      props.route.params.payments.monthlyPayment +
                      props.route.params.payments.prepayment}
                  </Text>
                </View>
              </View>
            </View>

            {/* <View style={Css(darkmode).mt20}>
                    <TouchableOpacity style={[Css(darkmode).btnyellow]}
                    onPress={() => NavigationService.navigate('ClientPayHistory')}
                    >
                         <Text style={[Css(darkmode).bold]}>To’lov tarixi</Text>
                    </TouchableOpacity>
                </View> */}
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

ChatScreen = connect(mapStateToProps)(ChatScreen);
export default withTranslation('main')(ChatScreen);
