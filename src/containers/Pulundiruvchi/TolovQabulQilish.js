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
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SvgUri from 'react-native-svg-uri';
import NavigationService from '../../navigators/NavigationService';
const height = Dimensions.get('window').height;
import {Formik} from 'formik';
import * as Yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';
import {setDarkmode, saveUser} from '../../services/actions';
import axios from 'axios';
import Spinner from '../../components/Spinner';

function ChatScreen(props) {
  const dispatch = useDispatch();

  const {t} = props;

  const darkmode = props.curretMode;
  const [hasNoreal, SethasNoreal] = useState(false);
  const [genders, SetGenders] = useState(true);
  const [showSpinner, SetshowSpinner] = useState(false);
  const [exSum, SetExSum] = useState(0);
  const [showEmpty, SetShowEmpty] = useState(false);
  const [showAlert, SetshowAlert] = useState(false);

  const Schema = Yup.object().shape({
    seria_number: Yup.string().required('Required!'),
  });

  const Exchange = () => {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };

    axios
      .get('https://app.smart-life.uz/api/v1/exchange', {headers})
      .then(response => {
        SetExSum(response.data.usd);
        // alert(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          if (error.response.status == 401) {
            props.dispatch(saveUser({}));
          }
        }
      });
  };

  const Paying = values => {
    if (
      values.terminal == '' &&
      values.card == '' &&
      values.valyuta == '' &&
      values.qaytim == ''
    ) {
      SetShowEmpty(true);
      return false;
    }

    SetshowSpinner(true);
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };

    const data = {
      terminal: values.terminal,
      card: values.card,
      usd: values.valyuta,
      uzs: values.sum,
      moneyRefund: values.qaytim,
      currency: 'UZS',
    };

    console.log(data);

    console.log('id', props.route.params.id);
    console.log('load', props.route.params.loanid);

    axios
      .put(
        'https://app.smart-life.uz/api/v1/installment/cashier/debt/repayment/' +
          props.route.params.id +
          '/' +
          props.route.params.loanid +
          '',
        data,
        {headers},
      )
      .then(response => {
        SetshowSpinner(false);
        SetshowAlert(true);
        // NavigationService.navigate('PulUndirDashboard')
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
    if (props.route.params.remainingMoney == 0) {
      SethasNoreal(false);
    } else {
      SethasNoreal(true);
    }

    Exchange();

    // alert(props.route.params.remainingMoney)
  }, []);

  return (
    <View style={Css(darkmode).container}>
      <Spinner processing={showSpinner} />
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
                {t('tolov_qabul_qilish')}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={Css(darkmode).mt20}
          contentContainerStyle={{flexGrow: 1, paddingBottom: height / 5}}
          contentInset={{bottom: height / 5}}
          showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              terminal: '',
              card: '',
              valyuta: '',
              sum: '',
              qaytim: '',
            }}
            // validationSchema={Schema}
            onSubmit={values => {
              Paying(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View>
                <View style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 16, fontWeight: '600'}}>
                    {t('tolov_summasi')}
                  </Text>
                  <Text style={{color: '#999'}}>{t('to_dollar')}</Text>
                  <Text style={{marginTop: 10, color: '#005D4D', fontSize: 15}}>
                    {t('kurs')}: $1={exSum} so’m
                  </Text>
                </View>

                <View style={Css(darkmode).mt20}>
                  <Text style={Css(darkmode).h5}>Terminal</Text>
                  <View style={Css(darkmode).inputbg}>
                    <TextInput
                      style={Css(darkmode).inputin}
                      onChangeText={handleChange('terminal')}
                      onBlur={handleBlur('terminal')}
                      value={values.terminal}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                <View style={Css(darkmode).mt20}>
                  <Text style={Css(darkmode).h5}>{t('karta_')}</Text>
                  <View style={Css(darkmode).inputbg}>
                    <TextInput
                      style={Css(darkmode).inputin}
                      onChangeText={handleChange('card')}
                      onBlur={handleBlur('card')}
                      value={values.card}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                <View style={Css(darkmode).mt20}>
                  <Text style={Css(darkmode).h5}>{t('valyuta')}</Text>
                  <View style={Css(darkmode).inputbg}>
                    <TextInput
                      style={Css(darkmode).inputin}
                      onChangeText={handleChange('valyuta')}
                      onBlur={handleBlur('valyuta')}
                      value={values.valyuta}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                <View style={Css(darkmode).mt20}>
                  <Text style={Css(darkmode).h5}>{t('sum_')}</Text>
                  <View style={Css(darkmode).inputbg}>
                    <TextInput
                      style={Css(darkmode).inputin}
                      onChangeText={handleChange('sum')}
                      onBlur={handleBlur('sum')}
                      value={values.sum}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                <View style={Css(darkmode).mt20}>
                  <Text style={Css(darkmode).h5}>{t('qaytim')}</Text>
                  <View style={Css(darkmode).inputbg}>
                    <TextInput
                      style={Css(darkmode).inputin}
                      onChangeText={handleChange('qaytim')}
                      onBlur={handleBlur('qaytim')}
                      value={values.qaytim}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                <View style={Css(darkmode).mt20}>
                  <Text style={Css(darkmode).h5}>{t('noreal_summa')}</Text>
                  <View style={Css(darkmode).inputbg}>
                    <TextInput
                      style={Css(darkmode).inputin}
                      value={'' + props.route.params.remainingMoney + ''}
                      disabled={false}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  disabled={
                    props.route.params.remainingMoney == 0 ? true : false
                  }
                  onPress={() =>
                    hasNoreal ? SethasNoreal(false) : SethasNoreal(true)
                  }
                  style={[
                    Css(darkmode).mt20,
                    Css(darkmode).flex,
                    Css(darkmode).itemscenter,
                  ]}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: '#333',
                      borderRadius: 3,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {hasNoreal ? (
                      <Feather name={'check'} color={'#fff'} size={20} />
                    ) : (
                      <></>
                    )}
                  </View>

                  <Text style={[Css(darkmode).blackwhite, {marginLeft: 10}]}>
                    {t('noreal_sum_yech')}
                  </Text>
                </TouchableOpacity>

                <View style={Css(darkmode).mt20}>
                  <Text style={Css(darkmode).h4}>{t('jami')}</Text>
                  <View style={Css(darkmode).inputbg}>
                    <TextInput
                      style={Css(darkmode).inputin}
                      value={
                        '' +
                        (+values.terminal +
                          +values.card +
                          +values.valyuta +
                          +values.sum +
                          +values.qaytim) +
                        ''
                      }
                    />
                  </View>
                </View>

                <View style={Css(darkmode).mt20}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={Css(darkmode).btnyellow}>
                    <Text>{t('qabul_qildim')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>

      <AwesomeAlert
        show={showEmpty}
        showProgress={false}
        title={"Maydonlardan birini to'ldiring!"}
        message=""
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#FBC100"
        onCancelPressed={() => {
          SetShowEmpty(false);
        }}
        onConfirmPressed={() => {
          SetShowEmpty(false);
        }}
        alertContainerStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}}
        contentContainerStyle={{width: '96%'}}
        titleStyle={{textAlign: 'center'}}
      />

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={'Success!'}
        message=""
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Main page"
        confirmButtonColor="#FBC100"
        onCancelPressed={() => {
          SetshowAlert(false);
        }}
        onConfirmPressed={() => {
          NavigationService.navigate('PulUndirDashboard');
          SetshowAlert(false);
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

ChatScreen = connect(mapStateToProps)(ChatScreen);
export default withTranslation('main')(ChatScreen);
