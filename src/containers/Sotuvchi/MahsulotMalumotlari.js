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
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SvgUri from 'react-native-svg-uri';
import NavigationService from '../../navigators/NavigationService';
import SelectDropdown from 'react-native-select-dropdown';
const height = Dimensions.get('window').height;
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';

function ChatScreen(props) {
  const darkmode = props.curretMode;

  const countries = ['Toshkent', 'Farg’ona', 'Andijon'];
  const [box, SetBox] = useState(true);
  const [showAlert, SetshowAlert] = useState(false);

  const Schema = Yup.object().shape({
    seria_number: Yup.string().required('Required!'),
    icloud_login: Yup.string().required('Required!'),
    icloud_pass: Yup.string().required('Required!'),
    screen_pass: Yup.string().required('Required!'),
  });

  const ContinueTo = values => {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };

    const data = {
      amount: +props.route.params.prepayment + +props.route.params.paidAmount,
      term: props.route.params.mudat,
      startDate: props.route.params.TolovSana,
      paidAmount: +props.route.params.paidAmount + +0,
      prepayment: +props.route.params.prepayment + +0,
      branchId: props.userData.user.branchId,
      productId: props.route.params.productId,
      operatorId: props.route.params.operator,
      buyerId: props.route.params.buyerId,
      icloud: {
        serialNumber: values.seria_number,
        account: values.icloud_login,
        password: values.icloud_pass,
        screenPassword: values.screen_pass,
        box: box,
      },
    };
    axios
      .post(
        'https://app.smart-life.uz/api/v1/taker/create/installment',
        data,
        {headers},
      )
      .then(response => {
        SetshowAlert(true);
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
              <Ionic name={'arrow-back'} size={18} />
            </TouchableOpacity>
            <View style={Css(darkmode).ml10}>
              <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>
                Mahsulot ma’lumotlari
              </Text>
            </View>
          </View>
        </View>

        <View style={Css(darkmode).mt10}>
          <View>
            <ScrollView
              contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}
              style={{height: height / 1.2}}
              showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={{
                  seria_number: '',
                  icloud_login: '',
                  icloud_pass: '',
                  screen_pass: '',
                }}
                validationSchema={Schema}
                onSubmit={values => {
                  ContinueTo(values);
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
                  <View style={{flexGrow: 1}}>
                    <View style={Css(darkmode).mt20}>
                      <View>
                        <Text>Mahsulotning seriya raqami</Text>
                        {errors.seria_number && touched.seria_number ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.seria_number}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder="651651651561"
                          style={Css(darkmode).inputin}
                          onChangeText={handleChange('seria_number')}
                          onBlur={handleBlur('seria_number')}
                          value={values.seria_number}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt20}>
                      <View>
                        <Text>iCloud Login</Text>
                        {errors.icloud_login && touched.icloud_login ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.icloud_login}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder="Email"
                          style={Css(darkmode).inputin}
                          onChangeText={handleChange('icloud_login')}
                          onBlur={handleBlur('icloud_login')}
                          value={values.icloud_login}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt20}>
                      <View>
                        <Text>Icloud parol</Text>
                        {errors.icloud_pass && touched.icloud_pass ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.icloud_pass}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder=""
                          style={Css(darkmode).inputin}
                          onChangeText={handleChange('icloud_pass')}
                          onBlur={handleBlur('icloud_pass')}
                          value={values.icloud_pass}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt20}>
                      <View>
                        <Text>Ekran vaqti paroli</Text>
                        {errors.screen_pass && touched.screen_pass ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.screen_pass}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder=""
                          style={Css(darkmode).inputin}
                          onChangeText={handleChange('screen_pass')}
                          onBlur={handleBlur('screen_pass')}
                          value={values.screen_pass}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt40}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => SetBox(box ? false : true)}
                        style={{
                          height: 50,
                          borderWidth: 1,
                          borderColor: '#D8D8D8',
                          borderRadius: 6,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            fontSize: 17,
                            color: '#000',
                          }}>
                          Korobkasi mavjudmi?
                        </Text>
                        <View
                          style={{
                            backgroundColor: box ? '#005D4D' : '#999',
                            width: 24,
                            height: 24,
                            borderRadius: 24,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {box ? (
                            <Feather name="check" color={'#fff'} size={15} />
                          ) : (
                            <Feather name="check" color={'#fff'} size={15} />
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={Css(darkmode).mt20}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={Css(darkmode).btnyellow}>
                        <Text style={Css(darkmode).bold}>
                          Shartnomani qo’shish
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </View>
      </View>

      <AwesomeAlert
        show={showAlert}
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
