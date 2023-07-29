/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import NavigationService from '../../navigators/NavigationService';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {saveUser} from '../../services/actions';
import AwesomeAlert from 'react-native-awesome-alerts';

function SettingScreen(props) {
  const darkmode = props.curretMode;

  const {t} = props;

  const [openGift, SetopenGift] = useState(false);
  const [loading, setLoading] = useState(false);
  const [GiftId, SetGiftId] = useState(null);
  const [showAlert, SetshowAlert] = useState(false);
  const [defaultSum, SetDefaulutSum] = useState('usd');
  const [exSum, SetExSum] = useState(0);

  const [gifts, Setgifts] = useState([
    {
      value: 'logistics',
      label: 'Logistika',
    },
    {
      value: 'purchase',
      label: 'Sotib olish',
    },
    {
      value: 'accessory_gift',
      label: "Aksessuar sovg'asi",
    },
    {
      value: 'other',
      label: 'Boshqalar',
    },
    {
      value: 'Exson',
      label: 'Exson',
    },
    {
      value: 'Marketing',
      label: 'Marketing',
    },
    {
      value: 'Kurs farqi',
      label: 'Kurs farqi',
    },
    {
      value: 'Soliq',
      label: 'Soliq',
    },
    {
      value: 'Qarz',
      label: 'Qarz',
    },
    {
      value: "O'tqazma",
      label: "O'tqazma",
    },
    {
      value: 'Ayirboshlash',
      label: 'Ayirboshlash',
    },
    {
      value: 'Ofis xarajati',
      label: 'Ofis xarajati',
    },
    {
      value: 'Arenda',
      label: 'Arenda',
    },
    {
      value: 'Dividend',
      label: 'Dividend',
    },
    {
      value: 'Imei',
      label: 'Imei',
    },
    {
      value: 'Remont',
      label: 'Remont',
    },
    {
      value: 'Boshqa chiqim',
      label: 'Boshqa chiqim',
    },
    {
      value: "Sovg'a",
      label: "Sovg'a",
    },
    {
      value: 'Oziq-ovqat',
      label: 'Oziq-ovqat',
    },
    {
      value: 'Taksi',
      label: 'Taksi',
    },
    {
      value: 'Reklama',
      label: 'Reklama',
    },
    {
      value: 'Bonus',
      label: 'Bonus',
    },
    {
      value: 'Oylik ishchilar',
      label: 'Oylik ishchilar',
    },
    {
      value: 'Sotib olish',
      label: 'Sotib olish',
    },
    {
      value: 'Boshqa kirim',
      label: 'Boshqa kirim',
    },
    {
      value: 'Ustav',
      label: 'Ustav',
    },
    {
      value: "Muddatli to'lov",
      label: "Muddatli to'lov",
    },
    {
      value: "Boshlang'ich to'lov",
      label: "Boshlang'ich to'lov",
    },
    {
      value: 'Sotuv',
      label: 'Sotuv',
    },
    {
      value: 'Oy boshiga qoldiq',
      label: 'Oy boshiga qoldiq',
    },
  ]);

  const Schema = Yup.object().shape({
    xarajat_summa: Yup.string().required('Required!'),
    xarajat_type: Yup.string().required('Required!'),
    xarajat_name: Yup.string().required('Required!'),
    currencyType: Yup.string().required('Required!'),
  });

  const ChangeXarajat = (val, setFieldValue) => {
    console.log(val);
    setFieldValue('xarajat_type', val);
    if (val === 'logistics') {
      setFieldValue('xarajat_name', 'Logistika');
    } else if (val === 'purchase') {
      setFieldValue('xarajat_name', 'Sotib olish');
    } else if (val === 'accessory_gift') {
      setFieldValue('xarajat_name', "Aksessuar sovg'asi");
    } else if (val === 'other') {
      setFieldValue('xarajat_name', 'Boshqalar');
    } else {
      setFieldValue('xarajat_name', val);
    }
  };

  const Save = values => {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props?.userData?.token}`,
    };

    const data = {
      name: values?.xarajat_name,
      price:
        defaultSum === 'uzs'
          ? (values?.xarajat_summa / exSum).toFixed(2)
          : values?.xarajat_summa,
      expensesType: values?.xarajat_type,
      currencyType: values?.currencyType,
    };

    console.log(data);

    setLoading(true);

    axios
      .post('https://app.smart-life.uz/api/v1/cashier/expenses', data, {
        headers,
      })
      .then(response => {
        console.log(response.data);
        setLoading(false);
        SetshowAlert(true);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        if (error.response) {
          if (error.response.status === 401) {
            props.dispatch(saveUser({}));
          }
        }
      });
  };

  useEffect(() => {
    const Exchange = () => {
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };

      axios
        .get('https://app.smart-life.uz/api/v1/exchange', {headers})
        .then(response => {
          SetExSum(response?.data?.usd);
        })
        .catch(function (error) {
          console.log(error);
          if (error.response) {
            if (error.response.status === 401) {
              props.dispatch(saveUser({}));
            }
          }
        });
    };
    props.navigation.addListener('focus', () => {
      Exchange();
    });
  }, [props]);

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
              <Text style={Css(darkmode).h3}>{t('add_xarajat')}</Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{textAlign: 'center'}}> 1 USD {exSum} sum</Text>
        </View>

        <Formik
          initialValues={{
            xarajat_summa: '',
            xarajat_type: '',
            xarajat_name: '',
            currencyType: 'usd',
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
            <View style={Css(darkmode).mt20}>
              <View style={[Css(darkmode).mt10, {zIndex: 200}]}>
                <View style={{marginTop: 5, zIndex: 100}}>
                  {errors.xarajat_type && touched.xarajat_type ? (
                    <Text style={{color: 'red', fontSize: 10}}>
                      {errors.xarajat_type}
                    </Text>
                  ) : null}

                  <DropDownPicker
                    open={openGift}
                    placeholder={'Xarajatlar turi'}
                    value={GiftId}
                    items={gifts}
                    setOpen={SetopenGift}
                    setValue={SetGiftId}
                    setItems={Setgifts}
                    dropDownContainerStyle={Css(darkmode).dropdowns}
                    style={[Css(darkmode).inputbg, {zIndex: 99}]}
                    onChangeValue={e => ChangeXarajat(e, setFieldValue)}
                    listMode="MODAL"
                    autoScroll
                  />
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => {
                    SetDefaulutSum('usd');
                    setFieldValue('currencyType', 'usd');
                  }}
                  style={{
                    backgroundColor:
                      defaultSum === 'usd' ? '#FBC100' : 'transparent',
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: defaultSum === 'usd' ? '#FBC100' : '#000',
                  }}>
                  <Text style={{color: defaultSum === 'usd' ? '#fff' : '#999'}}>
                    USD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    SetDefaulutSum('uzs');
                    setFieldValue('currencyType', 'uzs');
                  }}
                  style={{
                    backgroundColor:
                      defaultSum === 'uzs' ? '#FBC100' : 'transparent',
                    marginLeft: 10,
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: defaultSum === 'uzs' ? '#FBC100' : '#000',
                  }}>
                  <Text style={{color: defaultSum === 'uzs' ? '#fff' : '#999'}}>
                    UZS
                  </Text>
                </TouchableOpacity>
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
                    placeholder={values.currencyType === 'usd' ? '$' : 'UZS'}
                    style={Css(darkmode).inputin}
                    onChangeText={handleChange('xarajat_summa')}
                    onBlur={handleBlur('xarajat_summa')}
                    value={values.xarajat_summa}
                    keyboardType="number-pad"
                  />
                </View>

                {values.xarajat_summa !== '' ? (
                  <View style={{marginTop: 5}}>
                    {defaultSum === 'uzs' ? (
                      <Text>{(values.xarajat_summa / exSum).toFixed(2)}</Text>
                    ) : (
                      <Text>{values.xarajat_summa}</Text>
                    )}
                  </View>
                ) : (
                  <></>
                )}
              </View>

              <View style={Css(darkmode).mt20}>
                <View>
                  <Text>{t('qaysi_kassir')}</Text>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={[Css(darkmode).h5]}>
                    {props.userData.user.last_name}{' '}
                    {props.userData.user.first_name}
                  </Text>
                </View>
              </View>

              <View style={Css(darkmode).mt50}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={Css(darkmode).btnyellow}>
                  {loading ? (
                    <ActivityIndicator color={'#fff'} />
                  ) : (
                    <Text>{t('add_xarajat')}</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={t('success_added')}
        message=""
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText={t('ni')}
        confirmText={t('got_to_main')}
        confirmButtonColor="#FBC100"
        onCancelPressed={() => {
          this.hideAlert();
        }}
        onConfirmPressed={() => {
          NavigationService.goBack();
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

export default withTranslation('main')(connect(mapStateToProps)(SettingScreen));
