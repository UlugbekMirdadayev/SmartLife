/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import NavigationService from '../../navigators/NavigationService';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {saveUser} from '../../services/actions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function ChatScreen(props) {
  const {bottom} = useSafeAreaInsets();
  const darkmode = props.curretMode;
  const [open, setOpen] = useState(false);
  const [open_, setOpen_] = useState(false);
  const [value, setValue] = useState(props?.userData?.user?.first_name);
  const [value_, setValue_] = useState('false');
  const [imei, setImei] = useState(null);
  const [operators, SetOperators] = useState([
    {
      _id: props?.userData?.user?._id,
      name:
        props?.userData?.user?.first_name +
        ' ' +
        props?.userData?.user?.last_name,
    },
  ]);
  const [imeiList, setImeiList] = useState([]);
  const [imeiListOpen, setImeiListOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([
    {
      name: 'B.U',
      id: 'false',
    },
    {
      name: 'Yangi',
      id: 'true',
    },
  ]);
  const [isSelected, setIsSelected] = useState({});

  const [OperatorId, SetOperatorId] = useState(null);
  const [stateID, setStateID] = useState('false');

  const imeiListData = useSelector(({imei}) => imei?.imei);

  const Schema = Yup.object().shape({
    imei: Yup.string().required('Required!'),
    price: Yup.string().required('Required!'),
  });

  const {handleChange, handleSubmit, handleBlur, errors, values, touched} =
    useFormik({
      validationSchema: Schema,
      initialValues: {price: '', imei: ''},
      onSubmit: data => ContinueTo(data),
    });

  const ContinueTo = formData => {
    const data = {
      ...formData,
      client: OperatorId,
      usedPhone: stateID,
      arrivalDate: isSelected?.Sana,
      notes: 'description text',
    };
    setLoading(true);
    console.log(data, 'data====');
    axios
      .post('https://app.smart-life.uz/api/v1/sheets', data)
      .then(res => {
        setLoading(false);
        console.log(res?.data, 'res?.data');
        NavigationService.goBack();
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const GetOperators = useCallback(() => {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };
    axios
      .get('https://app.smart-life.uz/api/v1/operator', {headers})
      .then(response => {
        SetOperators([
          {
            _id: props?.userData?.user?._id,
            name:
              props?.userData?.user?.first_name +
              ' ' +
              props?.userData?.user?.last_name,
          },
          ...response.data,
        ]);
        if (response?.data?.length) {
          setValue(response?.data[0]?._id);
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 401) {
            props.dispatch(saveUser({}));
          }
        }
      });
  }, [props]);

  useEffect(() => {
    GetOperators();
  }, [GetOperators]);

  const imeiChecker = im => {
    setImei(im);
    if (im?.length >= 4) {
      setImeiListOpen(true);
      setImeiList(
        imeiListData
          ?.filter(num => num?.IMEI?.includes(im))
          ?.map((item, key) => ({
            name: `${item?.IMEI}`,
            id: `${item?.IMEI + '.' + key}`,
          })),
      );
    } else {
      setImeiListOpen(false);
    }
  };

  useEffect(() => {
    if (imei?.length > 4) {
      const vv = imeiListData?.find(({IMEI}) =>
        IMEI?.includes(imei?.split('.')[0]),
      );
      if (vv?.IMEI) {
        setIsSelected(vv);
        setValue_(JSON.stringify(vv.Holati === 'Yangi'));
        handleChange('price')(vv?.Narxi?.replace(/\s/g, ''));
        handleChange('name')(vv?.Nomi);
        handleChange('document')(JSON.stringify(vv?.Karobkasi === 'Bor'));
      } else {
        handleChange('document')('');
      }
    }
  }, [imei, imeiListData, handleChange]);

  return (
    <View style={Css(darkmode).container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={Css(darkmode).content}>
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
        <View style={Css(darkmode).mt20}>
          <View style={{zIndex: 20}}>
            <Text style={Css(darkmode).h5}>Mahsulot seriya raqami</Text>
            {errors.imei && touched.imei ? (
              <Text style={{color: 'red', fontSize: 10}}>{errors.imei}</Text>
            ) : null}
            <View style={Css(darkmode).inputbg}>
              <TextInput
                style={Css(darkmode).inputin}
                onChangeText={text => {
                  imeiChecker(text);
                  handleChange('imei')(text);
                  if (text?.length > 4) {
                    const vv = imeiListData?.find(({IMEI}) =>
                      IMEI?.includes(text?.split('.')[0]),
                    );
                    if (vv?.Narxi) {
                      handleChange('price')(vv?.Narxi?.replace(/\s/g, ''));
                    }
                  }
                }}
                onBlur={handleBlur('imei')}
                value={imei?.split('.')[0]}
                keyboardType={'number-pad'}
                returnKeyType={'done'}
                maxLength={18}
              />
            </View>
            {imeiListOpen ? (
              <View style={{marginTop: 5}}>
                <DropDownPicker
                  schema={{
                    label: 'name',
                    value: 'id',
                  }}
                  open={imeiListOpen}
                  value={imei}
                  items={imeiList}
                  setOpen={setImeiListOpen}
                  setValue={setImei}
                  setItems={setImeiList}
                  dropDownContainerStyle={Css(darkmode).dropdowns}
                  labelStyle={{color: '#333'}}
                  style={[Css(darkmode).inputbg]}
                  onChangeValue={setImei}
                  onSelectItem={text => {
                    handleChange('imei')(text.name);
                  }}
                  listMode="SCROLLVIEW"
                />
              </View>
            ) : null}
          </View>
          <View style={Css(darkmode).mt20}>
            <View style={{zIndex: -10}}>
              <Text style={Css(darkmode).h5}>Xolati</Text>
            </View>
            <View style={{marginTop: 5}}>
              <DropDownPicker
                schema={{
                  label: 'name',
                  value: 'id',
                }}
                open={open_}
                value={value_}
                items={states}
                setOpen={setOpen_}
                setValue={setValue_}
                setItems={setStates}
                dropDownContainerStyle={Css(darkmode).dropdowns}
                labelStyle={{color: '#333'}}
                style={[Css(darkmode).inputbg]}
                onChangeValue={setStateID}
                listMode="SCROLLVIEW"
              />
            </View>
          </View>
          <View style={[Css(darkmode).mt20, {zIndex: -10}]}>
            <View>
              <Text style={Css(darkmode).h5}>Narxi</Text>
              {!isSelected?.Narxi && touched.imei ? (
                <Text style={{color: 'red', fontSize: 10}}>{errors.price}</Text>
              ) : null}
            </View>
            <View style={Css(darkmode).inputbg}>
              <TextInput
                // placeholder="$"
                style={Css(darkmode).inputin}
                onChangeText={text => {
                  setIsSelected({
                    ...isSelected,
                    Narxi: text?.replace(/\s/g, ''),
                  });
                  handleChange('price')(text?.replace(/\s/g, ''));
                }}
                onBlur={handleBlur('price')}
                value={values.price}
                keyboardType={'number-pad'}
                returnKeyType={'done'}
              />
            </View>
          </View>

          {/* <View style={[Css(darkmode).mt20, {zIndex: -10}]}>
            <View>
              <Text style={Css(darkmode).h5}>Nomi</Text>
            </View>
            <View style={Css(darkmode).inputbg}>
              <TextInput
                style={Css(darkmode).inputin}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                returnKeyType={'done'}
              />
            </View>
          </View> */}

          <View style={Css(darkmode).mt20}>
            <View>
              <Text style={Css(darkmode).h5}>Qaysi operator nomidan</Text>
            </View>
            <View style={{marginTop: 5}}>
              <DropDownPicker
                schema={{
                  label: 'name',
                  value: 'name',
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
                listMode="MODAL"
              />
            </View>
          </View>

          {(values?.name && (
            <View
              style={[
                Css(darkmode).mt50,
                Css(darkmode).flex,
                Css(darkmode).between,
                Css(darkmode).itemscenter,
                {zIndex: -10},
              ]}>
              <View>
                <Text
                  style={{
                    fontWeight: '600',
                    color: darkmode ? '#fff' : '#000',
                    fontSize: 18,
                  }}>
                  Nomi:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: '600',
                    color: darkmode ? '#fff' : '#000',
                    fontSize: 18,
                  }}>
                  {isSelected?.Nomi}
                </Text>
              </View>
            </View>
          )) ||
            null}
          <View
            style={[
              Css(darkmode).mt20,
              Css(darkmode).flex,
              Css(darkmode).between,
              Css(darkmode).itemscenter,
              {zIndex: -10},
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
                ${values.price}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          Css(darkmode).mt20,
          Css(darkmode).content,
          {marginBottom: bottom + 20},
        ]}>
        <TouchableOpacity
          disabled={!imeiList.length}
          style={Css(darkmode).btnyellow}
          onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>
              Davom etish
            </Text>
          )}
        </TouchableOpacity>
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
