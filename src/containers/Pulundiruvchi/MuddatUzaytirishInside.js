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
    TextInput
} from 'react-native';
import { connect, useDispatch } from 'react-redux'
import { withTranslation } from 'react-i18next'
import Css from '../assests/Style/Style'
import Ionic from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import SvgUri from 'react-native-svg-uri';
import NavigationService from '../../navigators/NavigationService';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import axios from 'axios';
import { setDarkmode, saveUser } from '../../services/actions'
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from '../../components/Spinner';

function ChatScreen(props) {
    const dispatch = useDispatch()

    const {t} = props

    const darkmode = props.curretMode
    const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
    const [date, setDate] = useState(new Date())
    const [showAlert, SetshowAlert] = useState(false)
  const [showSpinner, SetshowSpinner] = useState(false)


    const ChangeMuddat = () => {
        SetshowSpinner(true)
        const headers = {
           'Content-Type': 'application/json',
           'x-access-token': `${props.userData.token}`
       };
       const data = {
        'ss' : 1
       }
    //    console.log('https://app.smart-life.uz/api/v1/money/collector/'+props.route.params.id+'/'+moment(date).format('YYYY-MM-DD HH:mm:ss')+'')
       axios.patch('https://app.smart-life.uz/api/v1/money/collector/'+props.route.params.id+'/'+moment(date).format('YYYY-MM-DD HH:mm:ss')+'', data,  { headers })
           .then(response => {

            SetshowSpinner(false)

            SetshowAlert(true)
            // alert(JSON.stringify(response.data))
             
           })
           .catch(function (error) {
            SetshowSpinner(false)
             console.log('err', error)
              if (error.response) {
                 if(error.response.status == 401)
                 {
                    props.dispatch(saveUser({}));
                 }
              }
            });
       }

    useEffect(() => {

        
    
    },[])

    return(
        <View style={Css(darkmode).container}>
             <Spinner processing={showSpinner}/>
            <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />

            <View style={Css(darkmode).content}>

            <View style={Css(darkmode).pageheader}>
                 <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                    <TouchableOpacity style={Css(darkmode).backto}
                    onPress={() => NavigationService.goBack()}
                    
                    >
                        <Ionic name={'arrow-back'} size={18} style={Css(darkmode).blackwhite}/>
                    </TouchableOpacity>
                    <View style={Css(darkmode).ml10}>
                        <Text style={Css(darkmode).h3}>{props.route.params.lastname} {props.route.params.name}</Text>
                    </View>
                 </View>
            </View>

            <View style={Css(darkmode).mt20}>
                <View>

                <View
                  
                 
                 
                >
                <View> 

                    <View style={Css(darkmode).mt20}>
                         <View style={{alignItems:'center'}}>
                            <MaterialIcon name='account-circle' size={120} color={'#78828A'}/>
                         </View>
                    </View>

                    <View style={[Css(darkmode).flex, Css(darkmode).mt20]}>
                         <View style={{width: 100, height: 100, backgroundColor:'#FFCD38', borderRadius: 6}}>

                         </View>
                         <View style={{marginLeft: 20}}>
                             <View>
                                <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>{props.route.params.payments.productId.name}</Text>
                                <View style={[Css(darkmode).flex, Css(darkmode).itemscenter, {marginTop: 5}]}>
                                    <View style={{width: 12, height: 12, borderRadius: 20, backgroundColor:'red'}}>

                                    </View>
                                <Text style={{color:'red', marginLeft: 8}}>{t('tolov_kechiktirilgan')}</Text>
                                </View>
                                
                             </View>
                         </View>
                    </View>

                    <View style={Css(darkmode).mt20}>
                        <View style={[Css(darkmode).flex, Css(darkmode).itemscenter, Css(darkmode).between]}>
                            <View>
                                 <Text style={Css(darkmode).blackwhite}>{t('oylik_tolov_summasi')}</Text>
                            </View>
                            <View>
                                <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>120$</Text>
                            </View>
                        </View>

                        <View style={[Css(darkmode).flex, Css(darkmode).itemscenter, Css(darkmode).between, Css(darkmode).mt10]}>
                            <View>
                                 <Text style={Css(darkmode).blackwhite}>{t('tolanmagan')}</Text>
                            </View>
                            <View>
                                <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>1 oy uchun</Text>
                            </View>
                        </View>

                        <View style={[Css(darkmode).flex, Css(darkmode).itemscenter, Css(darkmode).between, Css(darkmode).mt10]}>
                            <View>
                                 <Text style={Css(darkmode).blackwhite}>{t('jami')}</Text>
                            </View>
                            <View>
                                <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>120$</Text>
                            </View>
                        </View>

                    </View>

                    <SafeAreaView style={Css(darkmode).mt20}>
                        <View>
                        <Text>{t('uzaytiriladigan_sana')}</Text>
                        </View>
                        <View style={Css(darkmode).inputbg}>
                            <TextInput style={Css(darkmode).inputin}
                              value={''+moment(date).format('ll')+''}
                             
                              editable={false}
                            />
                            <View style={{position:'absolute', right: 10, top: 10}}>
                                <TouchableOpacity
                                 onPress={() => setShowDatePickerSingle(true)}
                                >
                                    <Feather name='calendar' size={25}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                       
                        <View style={{position: 'relative', top: 0}}>
                        <DatePicker
                            modal
                            open={showDatePickerSingle}
                            date={date}
                            mode={'date'}
                            locale={'uz'}
                            onConfirm={(date) => {
                            setShowDatePickerSingle(false)
                            setDate(date)
                            }}
                            onCancel={() => {
                            setShowDatePickerSingle(false)
                            }}
                            title={'Muddatni tanlang'}
                        />
                        </View>
                    </SafeAreaView>

                    <View style={Css(darkmode).mt20}>
                        <TouchableOpacity 
                        onPress={() => ChangeMuddat()}
                        style={Css(darkmode).btnyellow}>
                            <Text style={Css(darkmode).h4}>{t('muddat_uzaytirish')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => NavigationService.navigate('PulUndirDashboard')}
                        style={[Css(darkmode).lightbtn, Css(darkmode).mt10]}>
                            <Text style={Css(darkmode).h4}>{t('bekor_qilish')}</Text>
                        </TouchableOpacity>
                    </View>

                   

                </View>
                

                </View>

                </View> 
                

            </View>

            </View>

            <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={"Muddat muvofaqiyatli uzaytirildi"}
          message=""
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Main page"
          confirmButtonColor="#FBC100"
          onCancelPressed={() => {
             SetshowAlert(false)
          }}
          onConfirmPressed={() => {
          
             NavigationService.navigate('PulUndirDashboard')
            
          }}
          alertContainerStyle={{backgroundColor:'rgba(0,0,0,0.7)'}}
          contentContainerStyle={{width: '96%'}}
          titleStyle={{textAlign:'center'}}
        />
            

        </View>
    )

}

const mapStateToProps = (state, ownProps) => {
    return {
        userData: state.user.user,
        currentLangCode: state.language.lang,
        curretMode: state.darkmode.darkmodeset
    }
 }
 
 ChatScreen = connect(mapStateToProps)(ChatScreen)
 export default withTranslation('main')(ChatScreen)