import React, {useEffect} from 'react';
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
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import Css from '../assests/Style/Style'
import Ionic from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import SvgUri from 'react-native-svg-uri';
import NavigationService from '../../navigators/NavigationService';
import moment from 'moment';

function ChatScreen(props) {

    const darkmode = props.curretMode

    const {t} = props

    const PayData = props.route.params.payments

    useEffect(() => {

        // alert(JSON.stringify(props.route.params.payments))
      
    },[])

    console.log('details', PayData)

    return(
        <View style={Css(darkmode).container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor={'transparent'} />

            <View style={Css(darkmode).content}>

            <View style={Css(darkmode).pageheader}>
                 <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                    <TouchableOpacity style={Css(darkmode).backto}
                    onPress={() => NavigationService.goBack()}
                    >
                        <Ionic name={'arrow-back'} size={18} style={Css(darkmode).blackwhite}/>
                    </TouchableOpacity>
                    <View style={Css(darkmode).ml10}>
                        <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>{t('pay_details')}</Text>
                    </View>
                 </View>
            </View>

            <ScrollView style={Css(darkmode).mt20}> 

              <View style={{height: 180, backgroundColor:'#FBC100', borderRadius: 10}}>
              <View style={{position:'absolute', bottom: 0, justifyContent:'center', alignSelf:'center'}}>
                          <Image
                            source={require('../assests/images/iphone13.png')}
                            style={{width: 90, height: 110}}
                            resizeMode={'contain'}
                          />
                          </View>
              </View>

              <View style={Css(darkmode).mt10}>
              <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>{PayData.productId.name}</Text>
              {/* <Text>Smart Phone</Text> */}
              </View>

              <View style={Css(darkmode).mt20}>
                <View>
                    <Text>{t('narx_detallari')}</Text>
                </View>
                <View style={[Css(darkmode).mt10, {backgroundColor:darkmode ? '#333' : '#F8F9F9', padding: 8, borderRadius: 6}]}>
                    
                    <View style={[Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter, Css(darkmode).mx10]}>
                        <View>
                             <Text style={Css(darkmode).blackwhite}>{t('date_')}</Text>
                        </View>
                        <View>
                            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>{moment(PayData.createdAt).format('LL')}</Text>
                        </View>
                    </View>

                    <View style={[Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter, Css(darkmode).mx10]}>
                        <View>
                             <Text style={Css(darkmode).blackwhite}>{t('boshlangich_tolov')}</Text>
                        </View>
                        <View>
                            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>${PayData.prepayment}</Text>
                        </View>
                    </View>

                    <View style={[Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter, Css(darkmode).mx10]}>
                        <View>
                             <Text style={Css(darkmode).blackwhite}>{t('muddat')}</Text>
                        </View>
                        <View>
                            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>{PayData.term} oy</Text>
                        </View>
                    </View>

                    <View style={[Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter, Css(darkmode).mx10]}>
                        <View>
                             <Text style={Css(darkmode).blackwhite}>{t('price_')}</Text>
                        </View>
                        <View>
                            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>${PayData.monthlyPayment} oyiga</Text>
                        </View>
                    </View>

                    <View style={[Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter, Css(darkmode).mx10]}>
                        <View>
                             <Text style={Css(darkmode).blackwhite}>{t('sana_gacha')}</Text>
                        </View>
                        <View>
                            {
                                props.la
                            }
                            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>Oyning {PayData.loanDetails[0].startDate}-kuni</Text>
                        </View>
                    </View>

                    <View style={[Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter, Css(darkmode).mx10]}>
                        <View>
                             <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>{t('jami')}</Text>
                        </View>
                        <View>
                        <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>${PayData.debt}</Text>
                           
                        </View>
                    </View>

                </View>

                <View style={Css(darkmode).mt20}>
                    <TouchableOpacity style={[Css(darkmode).btnyellow]}
                    onPress={() => NavigationService.navigate('ClientPayHistory', {
                        payments: PayData
                    })}
                    >
                         <Text style={[Css(darkmode).bold]}>{t('payments_history')}</Text>
                    </TouchableOpacity>
                </View>

              </View>

            </ScrollView>

            </View>
            

        </View>
    )

}
 
const mapStateToProps = (state, ownProps) => {
    return {
        userData: state.user.user,
        curretMode: state.darkmode.darkmodeset        
    }
}

ChatScreen = connect(mapStateToProps)(ChatScreen)
export default withTranslation('main')(ChatScreen)