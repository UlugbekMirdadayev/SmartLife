/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
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

const height = Dimensions.get('window').height;
function ChatScreen(props) {
  const darkmode = props.curretMode;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [operators, SetOperators] = useState([]);

  const [Muddat, SetMuddat] = useState(2);
  const [TolovSana, SetTolovSanat] = useState(5);
  const [OperatorId, SetOperatorId] = useState(0);

  const Schema = Yup.object().shape({
    pre_payment: Yup.string().required('Required!'),
    paid_payment: Yup.string().required('Required!'),
  });

  const month = [
    {
      id: 1,
      month: 2,
    },
    {
      id: 2,
      month: 3,
    },
    {
      id: 3,
      month: 4,
    },
    {
      id: 4,
      month: 5,
    },
    {
      id: 5,
      month: 6,
    },
    {
      id: 6,
      month: 7,
    },
    {
      id: 7,
      month: 8,
    },
  ];

  const day = [
    {
      id: 1,
      days: 5,
    },
    {
      id: 2,
      days: 10,
    },
    {
      id: 3,
      days: 15,
    },
    {
      id: 4,
      days: 20,
    },
  ];

  const ContinueTo = values => {
    NavigationService.navigate('MahsulotMalumotlari', {
      prepayment: values.pre_payment,
      paidAmount: values.paid_payment,
      mudat: Muddat,
      TolovSana: TolovSana,
      operator: OperatorId,
      productId: props.route.params.productid,
      buyerId: props.route.params.buyerId,
    });
  };

  useEffect(() => {
    const GetOperators = () => {
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };
      axios
        .get('https://app.smart-life.uz/api/v1/operator', {headers})
        .then(response => {
          SetOperators(response.data);
          setValue(response.data[0]._id);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 401) {
              props.dispatch(saveUser({}));
            }
          }
        });
    };
    GetOperators();

    // alert(props.route.params.buyerId)
  }, [props]);

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
                Shartnomani kiritish
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
                  pre_payment: '',
                  paid_payment: '',
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
                        <Text style={Css(darkmode).h5}>Oldindan to’lov</Text>
                        {errors.pre_payment && touched.pre_payment ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.pre_payment}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder="$"
                          style={Css(darkmode).inputin}
                          onChangeText={handleChange('pre_payment')}
                          onBlur={handleBlur('pre_payment')}
                          value={values.pre_payment}
                          keyboardType={'number-pad'}
                          returnKeyType={'done'}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt20}>
                      <View>
                        <Text style={Css(darkmode).h5}>Bir oylik to’lov</Text>
                        {errors.paid_payment && touched.paid_payment ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.paid_payment}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder="$"
                          style={Css(darkmode).inputin}
                          onChangeText={handleChange('paid_payment')}
                          onBlur={handleBlur('paid_payment')}
                          value={values.paid_payment}
                          keyboardType={'number-pad'}
                          returnKeyType={'done'}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt20}>
                      <View>
                        <Text style={Css(darkmode).h5}>Muddat</Text>
                      </View>
                      <ScrollView
                        contentContainerStyle={{flexGrow: 1, marginTop: 10}}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {month?.map((items, index) => {
                          return Muddat === items.month ? (
                            <TouchableOpacity
                              key={index}
                              style={{
                                backgroundColor: '#FBC100',
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 20,
                                marginRight: 8,
                              }}>
                              <Text>{items.month} oy</Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              key={index}
                              onPress={() => SetMuddat(items.month)}
                              style={{
                                borderColor: '#999',
                                borderWidth: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 20,
                                marginRight: 8,
                              }}>
                              <Text style={Css(darkmode).h5}>
                                {items.month} oy
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                    </View>

                    <View style={Css(darkmode).mt20}>
                      <View>
                        <Text style={Css(darkmode).h5}>To'lov sanasi</Text>
                      </View>
                      <ScrollView
                        contentContainerStyle={{flexGrow: 1, marginTop: 10}}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {day?.map((items, index) => {
                          return TolovSana === items.days ? (
                            <TouchableOpacity
                              key={index}
                              style={{
                                backgroundColor: '#FBC100',
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 20,
                                marginRight: 8,
                              }}>
                              <Text>{items.days} oy</Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              key={index}
                              onPress={() => SetTolovSanat(items.days)}
                              style={{
                                borderColor: '#999',
                                borderWidth: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 20,
                                marginRight: 8,
                              }}>
                              <Text style={Css(darkmode).h5}>
                                {items.days} oy
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                    </View>

                    <View style={Css(darkmode).mt20}>
                      <View>
                        <Text style={Css(darkmode).h5}>
                          Qaysi operator nomidan
                        </Text>
                      </View>
                      <View style={{marginTop: 5}}>
                        <DropDownPicker
                          schema={{
                            label: 'name',
                            value: '_id',
                          }}
                          open={open}
                          value={value}
                          items={operators}
                          setOpen={setOpen}
                          setValue={setValue}
                          setItems={SetOperators}
                          dropDownContainerStyle={Css(darkmode).dropdowns}
                          labelStyle={{color: '#333'}}
                          style={Css(darkmode).inputbg}
                          onChangeValue={e => SetOperatorId(e)}
                          // listItemContainerStyle={{borderColor:'red'}}
                        />
                      </View>
                    </View>

                    <View
                      style={[
                        Css(darkmode).mt50,
                        Css(darkmode).flex,
                        Css(darkmode).between,
                        Css(darkmode).itemscenter,
                      ]}>
                      <View>
                        <Text
                          style={{
                            fontWeight: '600',
                            color: darkmode ? '#fff' : '#000',
                            fontSize: 18,
                          }}>
                          Jami summa:
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontWeight: '600',
                            color: darkmode ? '#fff' : '#000',
                            fontSize: 18,
                          }}>
                          $
                          {Number(values.paid_payment * Muddat) +
                            Number(values?.pre_payment)}
                        </Text>
                      </View>
                    </View>

                    <View style={Css(darkmode).mt20}>
                      <TouchableOpacity
                        style={Css(darkmode).btnyellow}
                        onPress={handleSubmit}>
                        <Text style={Css(darkmode).bold}>Davom etish</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </View>
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
