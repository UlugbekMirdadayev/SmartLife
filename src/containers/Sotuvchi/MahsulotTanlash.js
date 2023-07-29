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
import axios from 'axios';
import Spinner from '../../components/Spinner';

function ChatScreen(props) {
  const dispatch = useDispatch();

  const [catyGoryList, SetcatyGoryList] = useState([]);
  const [searchType, SetSearchType] = useState(1);
  const [searchParams, SetSearchParams] = useState('');
  const [ProductList, SetProductList] = useState([]);
  const [showSpinner, SetshowSpinner] = useState(false);

  const Type = [
    {
      id: 1,
      type: 'Ism',
    },
    {
      id: 2,
      type: 'Raqam',
    },
    {
      id: 3,
      type: 'Pasport',
    },
  ];

  const Products = cat => {
    SetshowSpinner(true);
    SetSearchType(cat);

    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };
    axios
      .get('https://app.smart-life.uz/api/v1/product?categoryId=' + cat + '', {
        headers,
      })
      .then(response => {
        SetshowSpinner(false);

        SetProductList(response.data);
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

  const GetCatigory = () => {
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`,
    };
    axios
      .get('https://app.smart-life.uz/api/v1/product/category', {headers})
      .then(response => {
        SetcatyGoryList(response.data);

        SetSearchType(response.data[0]._id);
        Products(response.data[0]._id);
        // console.log(response.data[0]._id)
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status == 401) {
            props.dispatch(saveUser({}));
          }
        }
      });
  };

  const SearchUser = params => {
    SetSearchParams(params);
    if (params.length > 2) {
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };

      var search_param = '';
      if (searchType == 1) {
        search_param = 'first_name';
      }
      if (searchType == 2) {
        search_param = 'phone';
      }
      if (searchType == 3) {
        search_param = 'pasport';
      }

      // alert('https://app.smart-life.uz/api/v1/contact/search?'+search_param+'='+params+'')

      axios
        .get(
          'https://app.smart-life.uz/api/v1/contact/search?' +
            search_param +
            '=' +
            params +
            '',
          {headers},
        )
        .then(response => {
          if (response.data.length > 0) {
            SetUserList(response.data);
          }
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status == 401) {
              props.dispatch(saveUser({}));
            }
          }
        });
    } else {
      GetUsers();
    }
  };

  const darkmode = props.curretMode;

  useEffect(() => {
    GetCatigory();
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
                Mahsulotni tanlash
              </Text>
            </View>
          </View>
        </View>

        <View style={Css(darkmode).mt20}>
          <View>
            <View
              style={{
                borderWidth: 1,
                height: 45,
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderColor: darkmode ? '#fff' : '#000',
              }}>
              <View>
                <Feather
                  name={'search'}
                  size={20}
                  style={Css(darkmode).blackwhite}
                />
              </View>
              <View
                style={{
                  alignItems: 'flex-start',
                  alignContent: 'flex-start',
                  width: '80%',
                }}>
                <View>
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor={darkmode ? '#999' : '#999'}
                    onChangeText={e => SearchUser(e)}
                    value={searchParams}
                    style={[
                      Css(darkmode).blackwhite,
                      {marginLeft: 10, fontSize: 14},
                    ]}
                  />
                </View>
              </View>
              <View style={{position: 'absolute', right: 8}}>
                {searchParams != '' ? (
                  <TouchableOpacity onPress={() => SetSearchParams('')}>
                    <Feather name="x" size={20} />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>

          <View style={Css(darkmode).mt10}>
            <ScrollView
              horizontal
              contentContainerStyle={{flexGrow: 1}}
              showsHorizontalScrollIndicator={false}>
              {catyGoryList.map((items, index) => {
                return searchType == items?._id ? (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    style={[
                      Css(darkmode).roundbtn_selected,
                      {marginHorizontal: 5},
                    ]}>
                    <Text>{items.name}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={index}
                    onPress={() => Products(items._id)}
                    style={[Css(darkmode).roundbtn, {marginHorizontal: 5}]}>
                    <Text style={Css(darkmode).h5}>{items.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={Css(darkmode).mt20}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              {ProductList?.map((items, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      NavigationService.navigate('ShartnomaKiritish', {
                        productid: items._id,
                        buyerId: props.route.params.buyerId,
                      })
                    }
                    style={[Css(darkmode).flex, Css(darkmode).mx10]}>
                    <View
                      style={{
                        backgroundColor: '#F4F4F4',
                        width: 117,
                        height: 100,
                        borderRadius: 4,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../assests/images/iphone13.png')}
                        style={{width: 70, height: 110}}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={[Css(darkmode).bold, Css(darkmode).h4]}>
                        {items.name}
                      </Text>
                      <View style={{width: '95%'}}>
                        <Text style={Css(darkmode).h5}>
                          {items.configuration}
                        </Text>
                      </View>
                      <View style={{marginTop: 10}}>
                        <Text
                          style={[
                            Css(darkmode).blackwhite,
                            {fontSize: 18, fontWeight: '600'},
                          ]}>
                          ${items.price}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}

              <View style={{marginTop: 50}}>
                <TouchableOpacity
                  style={Css(darkmode).btnyellow}
                  onPress={() => NavigationService.navigate('YangiShartnoma')}>
                  <Text style={Css(darkmode).bold}>Yangi qoshish</Text>
                </TouchableOpacity>
              </View>
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

ChatScreen = connect(mapStateToProps)(ChatScreen);
export default withTranslation('main')(ChatScreen);
