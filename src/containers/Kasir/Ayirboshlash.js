/* eslint-disable react-native/no-inline-styles */
import React, {useInsertionEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import NavigationService from '../../navigators/NavigationService';
import DropDownPicker from 'react-native-dropdown-picker';
// import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
// import {saveUser} from '../../services/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import {saveUser} from '../../services/actions';

function SettingScreen(props) {
  const darkmode = props.curretMode;
  const {t} = props;
  const [gifts, Setgifts] = useState([
    {
      value: 'terminal',
      label: 'Terminal',
    },
    {
      value: 'card',
      label: 'Karta',
    },
    {
      value: 'uzs',
      label: "So'm",
    },
    {
      value: 'usd',
      label: 'Valyuta',
    },
    {
      value: 'visa',
      label: 'Visa',
    },
  ]);
  const [openGift, SetopenGift] = useState(false);
  const [openQayerga, SetopenQayerga] = useState(false);
  const [GiftId, SetGiftId] = useState(null);
  const [loading, setLoading] = useState(null);
  const [qayergaId, SetQayergaId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [kursSum, SetKursSum] = useState(0);
  const [maxSum, setMaxSum] = useState(0);
  const [staticData, setStaticData] = useState({
    card: 0,
    terminal: 0,
    usd: 0,
    uzs: 0,
    visa: 0,
  });

  const Schema = Yup.object().shape({
    xarajat_summa: Yup.string().required('Required!'),
    qayerdan: Yup.string().required('Required!'),
    qayerga: Yup.string().required('Required!'),
  });

  const SetFrom = (val, setFieldValue) => {
    if (!val) {
      return null;
    }
    setFieldValue(
      'qayerdan',
      String(
        Number(val)
          ?.toFixed(2)
          ?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1'),
      ),
    );
    setFieldValue(
      'xarajat_summa',
      String(
        (staticData[val] || 0)
          ?.toFixed(2)
          ?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1'),
      ),
    );
    setMaxSum(
      Number(
        (staticData[val] || 0)
          ?.toFixed(2)
          ?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1'),
      ),
    );
  };

  const SetTo = (val, setFieldValue) => {
    setFieldValue('qayerga', val);
  };

  const optionsWhere = gifts.filter(items => items.value !== GiftId);
  const optionsWhereTo = gifts.filter(items => items.value !== qayergaId);

  const Save = values => {
    const dataForm = {
      card: staticData.card,
      terminal: staticData.terminal,
      usd: staticData.usd,
      uzs: staticData.uzs,
      visa: staticData.visa,
    };
    if (GiftId === 'usd') {
      dataForm.usd = Number(staticData.usd) - Number(values.xarajat_summa);
    }
    if (GiftId === 'visa') {
      dataForm.visa = Number(staticData.visa) - Number(values.xarajat_summa);
    }
    if (GiftId === 'uzs') {
      dataForm.uzs = Number(staticData.uzs) - Number(values.xarajat_summa);
    }
    if (GiftId === 'terminal') {
      dataForm.terminal =
        Number(staticData.terminal) - Number(values.xarajat_summa);
    }
    if (GiftId === 'card') {
      dataForm.card = Number(staticData.card) - Number(values.xarajat_summa);
    }

    //

    if (qayergaId === 'usd') {
      if (['uzs', 'terminal', 'card'].includes(GiftId)) {
        dataForm.usd =
          Number(staticData.usd) + Number(values.xarajat_summa) / kursSum;
      } else {
        dataForm.usd = Number(staticData.usd) + Number(values.xarajat_summa);
      }
    }
    if (qayergaId === 'visa') {
      if (['uzs', 'terminal', 'card'].includes(GiftId)) {
        dataForm.visa =
          Number(staticData.visa) + Number(values.xarajat_summa) / kursSum;
      } else {
        dataForm.visa = Number(staticData.visa) + Number(values.xarajat_summa);
      }
    }
    if (qayergaId === 'uzs') {
      if (['usd', 'visa'].includes(GiftId)) {
        dataForm.uzs =
          Number(staticData.uzs) + Number(values.xarajat_summa) * kursSum;
      } else {
        dataForm.uzs = Number(staticData.uzs) + Number(values.xarajat_summa);
      }
    }
    if (qayergaId === 'terminal') {
      if (['usd', 'visa'].includes(GiftId)) {
        dataForm.terminal =
          Number(staticData.terminal) + Number(values.xarajat_summa) * kursSum;
      } else {
        dataForm.terminal =
          Number(staticData.terminal) + Number(values.xarajat_summa);
      }
    }
    if (qayergaId === 'card') {
      if (['usd', 'visa'].includes(GiftId)) {
        dataForm.card =
          Number(staticData.card) + Number(values.xarajat_summa) * kursSum;
      } else {
        dataForm.card = Number(staticData.card) + Number(values.xarajat_summa);
      }
    }

    setLoading(true);
    axios
      .patch('https://app.smart-life.uz/api/v1/wallet/cashier', dataForm, {
        headers: {
          'x-access-token': props?.userData?.token,
        },
      })
      .then(({data}) => {
        setLoading(false);
        setStaticData(data);
        setShowAlert(true);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  useInsertionEffect(() => {
    const KursValyut = () => {
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };

      axios
        .get('https://app.smart-life.uz/api/v1/exchange', {headers})
        .then(response => SetKursSum(response.data.usd))
        .catch(function (error) {
          console.log(error);
          if (error.response) {
            if (error.response.status === 401) {
              props.dispatch(saveUser({}));
            }
          }
        });
    };
    axios
      .get('https://app.smart-life.uz/api/v1/wallet/cashier', {
        headers: {
          'x-access-token': props?.userData?.token,
        },
      })
      .then(({data}) => setStaticData(data))
      .catch(err => {
        console.log(err);
      });
    KursValyut();
  }, [props?.userData?.token]);

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
              <Text style={Css(darkmode).h3}>{t('exchange')}</Text>
            </View>
          </View>
        </View>

        <Formik
          initialValues={{
            xarajat_summa: '',
            qayerdan: '',
            qayerga: '',
          }}
          validationSchema={Schema}
          onSubmit={Save}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <ScrollView style={Css(darkmode).mt20}>
              <View style={[Css(darkmode).mt10, {zIndex: 300}]}>
                <View style={{marginTop: 5, zIndex: 200}}>
                  <Text>Qayerdan</Text>

                  {errors.qayerdan && touched.qayerdan ? (
                    <Text style={{color: 'red', fontSize: 10}}>
                      {errors.qayerdan}
                    </Text>
                  ) : null}

                  <DropDownPicker
                    open={openGift}
                    placeholder={'Tanlash'}
                    value={GiftId}
                    items={optionsWhereTo}
                    setOpen={SetopenGift}
                    setValue={SetGiftId}
                    setItems={Setgifts}
                    dropDownContainerStyle={Css(darkmode).dropdowns}
                    style={[Css(darkmode).inputbg, {zIndex: 99}]}
                    onChangeValue={e => SetFrom(e, setFieldValue)}
                  />
                </View>
              </View>

              <View style={[Css(darkmode).mt10, {zIndex: 200}]}>
                <View style={{marginTop: 5, zIndex: 100}}>
                  <Text>Qayerga</Text>

                  {errors.qayerga && touched.qayerga ? (
                    <Text style={{color: 'red', fontSize: 10}}>
                      {errors.qayerga}
                    </Text>
                  ) : null}

                  <DropDownPicker
                    open={openQayerga}
                    placeholder={'Tanlash'}
                    value={qayergaId}
                    items={optionsWhere}
                    setOpen={SetopenQayerga}
                    setValue={SetQayergaId}
                    setItems={Setgifts}
                    dropDownContainerStyle={Css(darkmode).dropdowns}
                    style={[Css(darkmode).inputbg, {zIndex: 99}]}
                    onChangeValue={e => SetTo(e, setFieldValue)}
                  />
                </View>
              </View>

              <View style={Css(darkmode).mt20}>
                <Text>{t('summa_kiriting')}</Text>

                {errors.xarajat_summa && touched.xarajat_summa ? (
                  <Text style={{color: 'red', fontSize: 10}}>
                    {errors.xarajat_summa}
                  </Text>
                ) : null}

                <View style={Css(darkmode).inputbg}>
                  <TextInput
                    placeholder={
                      ['uzs', 'terminal', 'card'].includes(GiftId)
                        ? 'UZS'
                        : 'USD'
                    }
                    style={Css(darkmode).inputin}
                    onChangeText={handleChange('xarajat_summa')}
                    onBlur={handleBlur('xarajat_summa')}
                    value={values.xarajat_summa}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
              <View style={Css(darkmode).mt20}>
                {['usd', 'visa'].includes(GiftId) &&
                ['uzs', 'terminal', 'card'].includes(qayergaId) ? (
                  <Text>
                    Значение в{' '}
                    {(values.xarajat_summa * kursSum)
                      .toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'UZS',
                      })
                      ?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}
                  </Text>
                ) : null}
                {['usd', 'visa'].includes(qayergaId) &&
                ['uzs', 'terminal', 'card'].includes(GiftId) ? (
                  <Text>
                    Стоимость в долларах{' '}
                    {(values.xarajat_summa / kursSum)
                      .toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                      ?.replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}
                  </Text>
                ) : null}
              </View>

              <View style={Css(darkmode).mt50}>
                <TouchableOpacity
                  disabled={Number(values.xarajat_summa) > maxSum}
                  onPress={loading ? null : handleSubmit}
                  style={[
                    Css(darkmode).btnyellow,
                    Number(values.xarajat_summa) > maxSum
                      ? Css(darkmode).disabled
                      : {},
                  ]}>
                  {loading ? (
                    <ActivityIndicator color={'#fff'} />
                  ) : (
                    <Text style={Css(darkmode).blackwhite}>
                      {t('exchange')}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={t('success_sended')}
        message=""
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText={t('ni')}
        confirmText={t('got_to_main')}
        confirmButtonColor="#FBC100"
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={() => NavigationService.goBack()}
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
    CashierSumma: state.balance.balanceset,
  };
};

export default withTranslation('main')(connect(mapStateToProps)(SettingScreen));
