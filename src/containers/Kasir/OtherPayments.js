/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState, useCallback, useRef} from 'react';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Css from '../assests/Style/Style';
import Ionic from 'react-native-vector-icons/Ionicons';
import NavigationService from '../../navigators/NavigationService';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'axios';

function OtherPayments(props) {
  const {bottom} = useSafeAreaInsets();
  const {t} = props;
  const [searchType, SetSearchType] = useState(1);
  const [active, setActive] = useState(1);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsloading] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const Type = [
    {
      id: 1,
      type: 'Boshqa to’lov',
    },
    {
      id: 2,
      type: 'Naqd to’lov',
    },
  ];

  const onChangeTab = useCallback(
    index => {
      setActive(index);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();

      setTimeout(() => {
        SetSearchType(index);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }, 500);
      setTimeout(() => {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }, 300);
    },
    [fadeAnim, scaleAnim],
  );

  const darkmode = useMemo(() => props?.curretMode, [props?.curretMode]);

  const purchases = useMemo(
    () =>
      searchType === 2 ? list.filter(({productId}) => productId.cash) : list,
    [searchType, list],
  );

  const getPurchases = useCallback(() => {
    setLoading(true);
    axios
      .get('https://app.smart-life.uz/api/v1/cashier/user/purchase/all', {
        headers: {
          'x-access-token': props?.userData?.token,
        },
      })
      .then(({data}) => {
        setLoading(false);
        setList(data?.purchases);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, [props?.userData?.token]);

  const updateStatus = (id, status) => {
    if (isloading) {
      return null;
    }
    console.log(status, id);
    setIsloading(id);
    axios
      .patch(
        `https://app.smart-life.uz/api/v1/cashier/user/purchase/update/${id}`,
        {status},
        {
          headers: {
            'x-access-token': props?.userData?.token,
          },
        },
      )
      .then(() => {
        setIsloading(null);
        getPurchases();
      })
      .catch(err => {
        setIsloading(null);
        console.log(err);
      });
  };

  useEffect(() => {
    getPurchases();
  }, [getPurchases]);

  return (
    <View style={Css(darkmode).container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <View
        style={[
          Css(darkmode).pageheader,
          {marginBottom: 20},
          Css(darkmode).content,
        ]}>
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
              {t('tolov_qabul_qilish_other')}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          Css(darkmode).mt20,
          Css(darkmode).content,
          Css(darkmode).flex,
          Css(darkmode).between,
        ]}>
        {Type.map((items, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onChangeTab(items.id)}
            style={[
              Css(darkmode).roundbtn,
              Css(darkmode).w_50,
              Css(darkmode).itemscenter,
              active === items.id ? Css(darkmode).roundbtn_selected : {},
            ]}>
            <Text style={[Css(darkmode).blackwhite, Css(darkmode).h5]}>
              {items.type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          Css(darkmode).mt20,
          Css(darkmode).content,
          {marginBottom: bottom + 20},
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getPurchases} />
        }>
        {purchases.map(items => (
          <View
            key={items?._id}
            style={[
              Css(darkmode).between,
              Css(darkmode).roundbtn_selected,
              Css(darkmode).flex,
              Css(darkmode).itemscenter,
              Css(darkmode).mt10,
            ]}>
            <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>
              {items?.productId?.price} $
            </Text>
            <View style={[Css(darkmode).flex]}>
              {isloading === items?._id ? (
                <TouchableOpacity>
                  <ActivityIndicator size={24} color="#FFF" />
                </TouchableOpacity>
              ) : null}
              <Octicons name="check" size={24} style={{color: 'transparent'}} />
              <TouchableOpacity
                onPress={() => updateStatus(items?._id, 'active')}>
                <Octicons name="check" size={24} style={{color: '#1AA932'}} />
              </TouchableOpacity>
              <Octicons name="check" size={24} style={{color: 'transparent'}} />
              <TouchableOpacity
                onPress={() => updateStatus(items?._id, 'inactive')}>
                <Octicons name="x" size={24} style={{color: '#FF0000'}} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
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

export default withTranslation('main')(connect(mapStateToProps)(OtherPayments));
