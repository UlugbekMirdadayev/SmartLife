import React, { useEffect, useState } from 'react';
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

    const [open, SetOpen] = useState(0)

    const { t } = props

    useEffect(() => {

    }, [])

    return (
        <View style={Css(darkmode).container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor={'transparent'} />

            <View style={Css(darkmode).content}>

                <View style={Css(darkmode).pageheader}>
                    <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                        <TouchableOpacity style={Css(darkmode).backto}
                            onPress={() => NavigationService.goBack()}
                        >
                            <Ionic name={'arrow-back'} size={18} style={Css(darkmode).blackwhite} />
                        </TouchableOpacity>
                        <View style={Css(darkmode).ml10}>
                            <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>{t('payments_history')}</Text>
                        </View>
                    </View>
                </View>

                <ScrollView style={Css(darkmode).mt20}
                 contentContainerStyle={{flexGrow:1, paddingBottom: 100}}
                 contentInset={{bottom:50}}
                 showsVerticalScrollIndicator={false}
                >

                    <View style={{ height: 180, backgroundColor: '#FBC100', borderRadius: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                            <Image
                                source={require('../assests/images/iphone13.png')}
                                style={{ width: 90, height: 110 }}
                                resizeMode={'contain'}
                            />
                        </View>
                    </View>

                    <View style={Css(darkmode).mt10}>
                        <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>{props.route.params.payments.productId.name}</Text>
                        <Text style={Css(darkmode).blackwhite}>Smart Phone</Text>
                    </View>

                    <View style={Css(darkmode).mt20}>

                        {
                            props.route.params.payments.loanDetails.map((items, index) => {
                                return (

                                    <>

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => SetOpen(open == items.payId ? 0 : items.payId)}
                                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                                
                                                {
                                                    items.paid ? (
                                                        <View style={{ width: 40, height: 40, backgroundColor: '#B2E7DD', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Feather name={'check'} size={30} color={'#005D4D'} />
                                                        </View>
                                                    ) : (
                                                        <View style={{ width: 40, height: 40, backgroundColor: '#FFD6D6', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Feather name={'x'} size={30} color={'#FF3535'} />
                                                        </View>
                                                    )
                                                }

                                                <View>
                                                    <View style={{ width: '90%', marginLeft: 10 }}>
                                                        <Text style={Css(darkmode).blackwhite}><Text style={[Css(darkmode).blackwhite, { fontWeight: '600' }]}>{moment(items.paymentDate).format('ll')}</Text> uchun to’lov amalga {items.paid ? 'oshirildi' : 'oshirilmadi'}</Text>
                                                    </View>
                                                </View>

                                            </View>

                                            <View>
                                                <Feather name={open ? 'chevron-up' : 'chevron-down'} size={25} style={Css(darkmode).blackwhite} />
                                            </View>

                                        </TouchableOpacity>

                                        {
                                            open == items.payId ? (
                                                <View style={Css(darkmode).mt10}>

                                                    <View style={[Css(darkmode).mx10, Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter]}>
                                                        <View>
                                                            <Text style={Css(darkmode).blackwhite}>{t('date_')}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>{moment(items.paymentDate).format('LL')}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={[Css(darkmode).mx10, Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter]}>
                                                        <View>
                                                            <Text style={Css(darkmode).blackwhite}>{t('kim_toladi')}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>Sadulla Kobiljonov</Text>
                                                        </View>
                                                    </View>

                                                    <View style={[Css(darkmode).mx10, Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter]}>
                                                        <View>
                                                            <Text style={Css(darkmode).blackwhite}>{t('which_month')}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>{moment(items.paymentDate).format('LL')}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={[Css(darkmode).mx10, Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter]}>
                                                        <View>
                                                            <Text style={Css(darkmode).blackwhite}>{t('qanch_toladi')}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>${items.paymentAmount}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={[Css(darkmode).mx10, Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter]}>
                                                        <View>
                                                            <Text style={Css(darkmode).blackwhite}>{t('status_')}</Text>
                                                        </View>
                                                        <View>
                                                            {/* <Text style={[Css(darkmode).bold, Css(darkmode).blackwhite]}>O’z vaqtida to’landi</Text> */}
                                                        </View>
                                                    </View>

                                                    <View style={{ marginTop: 10, marginBottom: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                                        <View>


                                                        </View>
                                                        <View style={{ alignItems: 'center', flexDirection: 'row', alignContent: 'center', marginLeft: 20 }}>
                                                            <Feather name='download' size={18} />
                                                            <Text style={{ color: '#005D4D', marginLeft: 10 }}>Download PDF</Text>
                                                        </View>

                                                    </View>

                                                </View>
                                            ) : <></>
                                        }



                                    </>

                                )
                            })
                        } 

                    </View>

                </ScrollView>

            </View>


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