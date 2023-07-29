/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationService from '../../navigators/NavigationService';
import {saveUser} from '../../services/actions';
import axios from 'axios';
import Spinner from '../../components/Spinner';
const height = Dimensions.get('window').height;

function ChatScreen(props) {
  const darkmode = props.curretMode;
  const [Contracts, SetContracts] = useState([]);
  const [showSpinner, SetshowSpinner] = useState(false);

  useEffect(() => {
    const GetContracts = () => {
      SetshowSpinner(true);
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': `${props.userData.token}`,
      };
      axios
        .get(
          'https://app.smart-life.uz/api/v1/user/purchase/' +
            props.route.params.buyerId +
            '',
          {headers},
        )
        .then(response => {
          SetshowSpinner(false);
          SetContracts(response.data.purchases);
          // console.log('cccc', response.data.purchases)
        })
        .catch(function (error) {
          SetshowSpinner(false);
          if (error.response) {
            if (error.response.status === 401) {
              props.dispatch(saveUser({}));
            }
          }
        });
    };
    GetContracts();
  }, [props]);

  const PhoneCall = () => {
    Linking.openURL(`tel:${props.route.params.phone}`);
  };

  return (
    <>
      <Spinner processing={showSpinner} />
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
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('ViewXarid')}
                  style={[
                    Css(darkmode).flex,
                    Css(darkmode).itemscenter,
                    Css(darkmode).mx10,
                  ]}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 56,
                      backgroundColor: '#ededed',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'green',
                        width: 12,
                        height: 12,
                        borderRadius: 12,
                        position: 'absolute',
                        bottom: 1,
                        right: 1,
                        borderWidth: 1,
                        borderColor: '#fff',
                      }}
                    />
                  </View>
                  <View style={Css(darkmode).ml10}>
                    <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>
                      {props.route.params.lastname} {props.route.params.name}
                    </Text>
                    <Text>{props.route.params.phone}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={Css(darkmode).mt20}>
            <View
              style={{
                backgroundColor: '#00806A',
                height: 142,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <View>
                <View>
                  <Text
                    style={{color: '#fff', fontSize: 18, fontWeight: '600'}}>
                    Gold user
                  </Text>
                </View>
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#fff', fontSize: 14}}>
                    Xaridlar: {Contracts.length} ta
                  </Text>
                </View>
                <View style={{marginTop: 5, width: '80%'}}>
                  <Text style={{color: '#fff', fontSize: 14}}>
                    O’tkazib yuborilgan to’lovlar: 0 ta
                  </Text>
                </View>
              </View>

              <View>
                <Image
                  source={require('../assests/images/user_star.png')}
                  style={{width: 140, height: 140}}
                  resizeMode={'contain'}
                />
              </View>
            </View>

            <View style={Css(darkmode).mt20}>
              <TouchableOpacity
                onPress={() =>
                  NavigationService.navigate('MahsulotTanlash', {
                    buyerId: props.route.params.buyerId,
                  })
                }
                style={Css(darkmode).btnyellow}>
                <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>
                  Yangi shartnoma qilish
                </Text>
              </TouchableOpacity>
            </View>

            <View style={Css(darkmode).mt10}>
              <View
                style={[
                  Css(darkmode).flex,
                  Css(darkmode).itemscenter,
                  Css(darkmode).between,
                ]}>
                <TouchableOpacity
                  onPress={() => PhoneCall()}
                  style={[
                    Css(darkmode).lightbtn,
                    Css(darkmode).flex,
                    Css(darkmode).itemscenter,
                    {width: '100%'},
                  ]}>
                  <MaterialIcon name="phone" size={20} color={'#005D4D'} />
                  <Text style={{color: '#005D4D', marginLeft: 10}}>Aloqa</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={Css(darkmode).mt10}>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text style={Css(darkmode).h5}>Sotib olingan mahsulotlar</Text>
              </View>
            </View>
            <View style={{flexGrow: 1, height: height / 2.5}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}
                contentInset={{bottom: 30}}
                showsVerticalScrollIndicator={false}>
                {Contracts.map((items, index) => {
                  return (
                    <View
                      key={index}
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
                        <Text>Naqt sotuv</Text>
                        <Text style={[Css(darkmode).bold, Css(darkmode).h4]}>
                          {items.productId.name}
                        </Text>
                        <View style={{marginTop: 30}}>
                          <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>
                            ${items.productId.price}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </>
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
