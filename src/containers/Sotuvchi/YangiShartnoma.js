/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import NavigationService from '../../navigators/NavigationService';
const height = Dimensions.get('window').height;
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {saveUser} from '../../services/actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from '../../components/Spinner';
import ImagePicker from 'react-native-image-crop-picker';
import FormData from 'form-data';
import MaskInput from 'react-native-mask-input';
function ChatScreen(props) {
  // var FormData = require('form-data');
  const darkmode = props.curretMode;
  const bodyFormData = new FormData();

  const [showAlert, SetshowAlert] = useState(false);
  const [alertMessage, SetAlertMessage] = useState('');
  const [showSpinner, SetshowSpinner] = useState(false);
  const [oldPass, SetOldPass] = useState({});
  const [loading, setLoading] = useState([false, false, false]);
  const [passTurar, SetPassTurar] = useState({});
  const [fileNamePasportOld, SetfileNamePasportOld] = useState('');
  const [fileNamePasportTurar, SetfileNamePasportTurar] = useState('');

  const [branches, SetBranches] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const Schema = Yup.object().shape({
    first_name: Yup.string().required('Required!'),
    last_name: Yup.string().required('Required!'),
    phone: Yup.string().required('Required!'),
    pasport_number: Yup.string()
      .required('Required!')
      .min(7, 'Pasport raqami 7 xonali'),
    pasport_seria: Yup.string()
      .required('Required!')
      .min(2, 'Pasport seria 2 xonali'),
    adress: Yup.string().required('Required!'),
    filial: Yup.string().required('Required!'),
    pasport_old_rasm: Yup.string().required('Required!'),
    pasport_orqa_rasm: Yup.string().required('Required!'),
  });

  const FileUploadTo = img => {
    const uri =
      Platform.OS === 'android' ? img.path : img.path.replace('file://', '');
    const filename = img.path.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : 'image';

    bodyFormData.append('file', {
      uri,
      name: `image.${ext}`,
      type,
    });
    setLoading([true, loading[1]]);
    axios({
      method: 'post',
      url: 'https://app.smart-life.uz/api/v1/upload/document',
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${props.userData.token}`,
      },
    })
      .then(function (response) {
        //handle success
        console.log(response.data);
        setLoading([false, loading[1]]);
        SetfileNamePasportOld(response.data.data.filename);
      })
      .catch(function (response) {
        //handle error
        setLoading([false, loading[1]]);
        console.log(response);
      });
  };

  const FileUploadToPropiska = img => {
    const uri =
      Platform.OS === 'android' ? img.path : img.path.replace('file://', '');
    const filename = img.path.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : 'image';

    bodyFormData.append('file', {
      uri,
      name: `image.${ext}`,
      type,
    });
    setLoading([loading[0], true]);
    axios({
      method: 'post',
      url: 'https://app.smart-life.uz/api/v1/upload/document',
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${props.userData.token}`,
      },
    })
      .then(function ({data}) {
        //handle success
        setLoading([loading[0], false]);
        console.log(data);
        SetfileNamePasportTurar(data?.data?.filename);
      })
      .catch(function (response) {
        setLoading([loading[0], false]);
        //handle error
        console.log(response);
      });
  };

  const choosePhotoFromLibrary = setFieldValue => {
    if (!oldPass?.uri) {
      SetOldPass({onTouched: true});
    }

    launchImageLibrary({...{}, selectionLimit: 1}, res => {
      if (res.didCancel) {
        console.log('Cancel button pressed');
      }
    })
      .then(({assets}) => {
        ImagePicker.openCropper({path: assets[0].uri})
          .then(callbackimages => {
            console.log(callbackimages);
            setFieldValue('pasport_old_rasm', callbackimages.path);
            FileUploadTo(callbackimages);
            SetOldPass(assets[0]);
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(error => {
        console.log(error.message, 'error');
      });
  };

  const choosePhotoFromLibraryTurarJoy = setFieldValue => {
    if (!passTurar?.uri) {
      SetPassTurar({onTouched: true});
    }

    launchImageLibrary({...{}, selectionLimit: 1}, res => {
      if (res.didCancel) {
        console.log('Cancel button pressed');
      }
    })
      .then(({assets}) => {
        ImagePicker.openCropper({path: assets[0].uri})
          .then(callbackimages => {
            console.log(callbackimages);
            setFieldValue('pasport_orqa_rasm', callbackimages.path);
            FileUploadToPropiska(callbackimages);
            SetPassTurar(assets[0]);
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(error => {
        console.log(error.message, 'error');
      });
  };

  const CreateUser = values => {
    if (fileNamePasportOld !== '') {
      SetshowSpinner(true);
      const data = {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        passportId: '' + values.pasport_seria + values.pasport_number + '',
        address: values.adress,
        branchId: values.filial,
        documents: [fileNamePasportOld, fileNamePasportTurar],
      };

      console.log(data);

      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };
      setLoading([loading[0], loading[1], true]);
      axios
        .post(
          'https://app.smart-life.uz/api/v1/taker/user/create',
          data,
          {headers},
        )
        .then(response => {
          setLoading([loading[0], loading[1], false]);
          SetshowSpinner(false);
          SetshowAlert(true);
          SetAlertMessage('User Muvaffaqqiyatli qo’shildi');

          //   alert(JSON.stringify(response.data))
          // alert(JSON.stringify(response.data))
        })
        .catch(function (error) {
          setLoading([loading[0], loading[1], false]);
          SetshowSpinner(false);
          if (error.response.status === 401) {
            props.dispatch(saveUser({}));
          } else {
            if (error.response.status === 400) {
              // SetshowAlert(true)
              // SetAlertMessage("User already created")
              Alert.alert('User already created');
            }
          }
        });
    }
  };

  useEffect(() => {
    const GetFilial = () => {
      const datas = {
        phone: '',
      };
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };
      axios
        .get(
          'https://app.smart-life.uz/api/v1/provider/districts',
          datas,
          {headers},
        )
        .then(response => {
          SetBranches(response.data);
          // alert(JSON.stringify(response.data))
        });
    };
    GetFilial();
    // console.log('token', props.userData.token);
  }, [props]);

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
              <Text
                style={[
                  Css(darkmode).h3,
                  Css(darkmode).bold,
                  Css(darkmode).blackwhite,
                ]}>
                Shartnoma qilish
              </Text>
            </View>
          </View>
        </View>

        <View style={Css(darkmode).mt20}>
          <View>
            <Text
              style={{
                fontSize: 24,
                color: darkmode ? '#fff' : '#000',
                fontWeight: '600',
              }}>
              Quyidagi maydonlarni to’ldiring
            </Text>
          </View>

          <View>
            <ScrollView
              contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}
              contentInset={{bottom: 90}}
              style={{height: height / 1.2}}
              showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={{
                  first_name: '',
                  last_name: '',
                  phone: '',
                  pasport_seria: '',
                  pasport_number: '',
                  pasport_old_rasm: '',
                  pasport_orqa_rasm: '',
                  filial: '',
                }}
                validationSchema={Schema}
                onSubmit={values => {
                  CreateUser(values);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  setFieldError,
                  setTouched,
                }) => (
                  <View style={{flexGrow: 1}}>
                    <View style={Css(darkmode).mt10}>
                      <View>
                        <Text style={Css(darkmode).blackwhite}>Ism</Text>
                        {errors.first_name && touched.first_name ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.first_name}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder="Ism"
                          style={Css(darkmode).inputin}
                          onChangeText={handleChange('first_name')}
                          onBlur={handleBlur('first_name')}
                          value={values.first_name}
                          placeholderTextColor={'#999'}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt10}>
                      <View>
                        <Text style={Css(darkmode).blackwhite}>Familya</Text>
                        {errors.last_name && touched.last_name ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.last_name}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder="Familya"
                          style={Css(darkmode).inputin}
                          placeholderTextColor={props ? '#999' : '#999'}
                          onChangeText={handleChange('last_name')}
                          onBlur={handleBlur('last_name')}
                          value={values.last_name}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt10}>
                      <View>
                        <Text style={Css(darkmode).blackwhite}>
                          Telefon Raqam
                        </Text>
                        {errors.phone && touched.phone ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.phone}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder="Telefon"
                          style={Css(darkmode).inputin}
                          onChangeText={handleChange('phone')}
                          placeholderTextColor={props ? '#999' : '#999'}
                          onBlur={handleBlur('phone')}
                          value={values.phone}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt10}>
                      <View>
                        <Text style={Css(darkmode).blackwhite}>
                          Passport Seriya raqami
                        </Text>
                        {errors.pasport_seria && touched.pasport_seria ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.pasport_seria}
                          </Text>
                        ) : null}
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={[Css(darkmode).inputbg, {width: '25%'}]}>
                          <MaskInput
                            onChangeText={handleChange('pasport_seria')}
                            onBlur={handleBlur('pasport_seria')}
                            value={values.pasport_seria}
                            maxLength={2}
                            keyboardType={'phone-pad'}
                            returnKeyType={'done'}
                            returnKeyLabel={'Ok'}
                            editable
                            mask={[/^(?:[A-Za-z])$/, /^(?:[A-Za-z])$/]}
                            style={Css(darkmode).inputin}
                          />

                          {/* <TextInput
                            placeholder='AF '
                            style={Css(darkmode).inputin}
                            onChangeText={handleChange('pasport_seria')}
                            onBlur={handleBlur('pasport_seria')}
                            value={values.pasport_seria}
                            placeholderTextColor={props ? '#999' : '#999'}
                            /> */}
                        </View>
                        <View style={[Css(darkmode).inputbg, {width: '70%'}]}>
                          <MaskInput
                            onChangeText={handleChange('pasport_number')}
                            onBlur={handleBlur('pasport_number')}
                            value={values.pasport_number}
                            maxLength={7}
                            keyboardType={'phone-pad'}
                            returnKeyType={'done'}
                            returnKeyLabel={'Ok'}
                            editable
                            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                            style={Css(darkmode).inputin}
                          />
                          {/* <TextInput
                            placeholder='1234567'
                            style={Css(darkmode).inputin}
                            onChangeText={handleChange('pasport_number')}
                            onBlur={handleBlur('pasport_number')}
                            value={values.pasport_number}
                            placeholderTextColor={props ? '#999' : '#999'}
                            /> */}
                        </View>
                      </View>
                    </View>

                    <View style={Css(darkmode).mt10}>
                      <View>
                        <Text style={Css(darkmode).blackwhite}>
                          Hozirgi yashash manzili
                        </Text>
                        {errors.adress && touched.adress ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.adress}
                          </Text>
                        ) : null}
                      </View>
                      <View style={Css(darkmode).inputbg}>
                        <TextInput
                          placeholder="Hozirgi yashash manzili"
                          style={Css(darkmode).inputin}
                          onChangeText={handleChange('adress')}
                          onBlur={handleBlur('adress')}
                          placeholderTextColor={props ? '#999' : '#999'}
                          value={values.adress}
                        />
                      </View>
                    </View>

                    <View style={Css(darkmode).mt10}>
                      <View>
                        <Text style={Css(darkmode).blackwhite}>
                          Passport Nusxasi (old taraf)
                        </Text>
                        {errors.pasport_old_rasm && oldPass?.onTouched ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.pasport_old_rasm}
                          </Text>
                        ) : null}
                      </View>
                      <TouchableOpacity
                        onPress={() => choosePhotoFromLibrary(setFieldValue)}
                        style={[
                          Css(darkmode).inputbg,
                          {flexDirection: 'row', alignItems: 'center'},
                        ]}>
                        <FontAwesome
                          name="folder-open"
                          color={'#FFCD38'}
                          size={25}
                        />
                        <Text
                          style={{
                            color: darkmode ? '#fff' : '#000',
                            fontSize: 15,
                            fontWeight: '600',
                            marginLeft: 10,
                          }}>
                          Choose from your file
                        </Text>
                        {oldPass?.uri ? (
                          <View style={{marginLeft: 60}}>
                            <Image
                              source={{uri: oldPass?.uri}}
                              style={{
                                width: 60,
                                height: 45,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        ) : (
                          <></>
                        )}
                        {loading[0] ? (
                          <ActivityIndicator color={'#FBC100'} />
                        ) : null}
                      </TouchableOpacity>
                    </View>

                    <View style={Css(darkmode).mt10}>
                      <View>
                        <Text style={Css(darkmode).blackwhite}>
                          Passport Nusxasi (turar joy)
                        </Text>
                        {errors.pasport_orqa_rasm && passTurar?.onTouched ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.pasport_orqa_rasm}
                          </Text>
                        ) : null}
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          choosePhotoFromLibraryTurarJoy(setFieldValue)
                        }
                        style={[
                          Css(darkmode).inputbg,
                          {flexDirection: 'row', alignItems: 'center'},
                        ]}>
                        <FontAwesome
                          name="folder-open"
                          color={'#FFCD38'}
                          size={25}
                        />
                        <Text
                          style={{
                            color: darkmode ? '#fff' : '#000',
                            fontSize: 15,
                            fontWeight: '600',
                            marginLeft: 10,
                          }}>
                          Choose from your file
                        </Text>
                        {passTurar?.uri ? (
                          <View style={{marginLeft: 60}}>
                            <Image
                              source={{uri: passTurar?.uri}}
                              style={{width: 60, height: 45}}
                              resizeMode={'contain'}
                            />
                          </View>
                        ) : (
                          <></>
                        )}
                        {loading[1] ? (
                          <ActivityIndicator color={'#FBC100'} />
                        ) : null}
                      </TouchableOpacity>
                    </View>

                    <SafeAreaView style={[Css(darkmode).mt10, {flex: 1}]}>
                      <View>
                        <Text style={Css(darkmode).blackwhite}>
                          Qaysi filialda
                        </Text>
                        {errors.filial && touched.filial ? (
                          <Text style={{color: 'red', fontSize: 10}}>
                            {errors.filial}
                          </Text>
                        ) : null}
                      </View>
                      <DropDownPicker
                        schema={{
                          label: 'name',
                          value: '_id',
                        }}
                        open={open}
                        value={value}
                        items={branches}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={SetBranches}
                        dropDownContainerStyle={Css(darkmode).dropdowns}
                        labelStyle={{color: '#333'}}
                        style={Css(darkmode).inputbg}
                        placeholderTextColor={props ? '#999' : '#999'}
                        onChangeValue={e => setFieldValue('filial', e)}
                        // listItemContainerStyle={{borderColor:'red'}}
                      />
                    </SafeAreaView>

                    <View style={Css(darkmode).mt20}>
                      <TouchableOpacity
                        disabled={loading[2]}
                        onPress={handleSubmit}
                        style={Css(darkmode).btnyellow}>
                        {loading[2] ? (
                          <ActivityIndicator color={'#fff'} />
                        ) : (
                          <Text style={Css(darkmode).blackwhite}>
                            Yangi foydalanuvchini qo’shish
                          </Text>
                        )}
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
        title={alertMessage}
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
          NavigationService.navigate('SotuvchiDashboard');
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

export default withTranslation('main')(connect(mapStateToProps)(ChatScreen));
