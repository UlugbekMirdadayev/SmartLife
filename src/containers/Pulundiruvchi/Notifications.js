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
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import Css from '../assests/Style/Style'
import Ionic from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import SvgUri from 'react-native-svg-uri';
import axios from 'axios';
import NavigationService from '../../navigators/NavigationService';
import Spinner from '../../components/Spinner';

function ChatScreen(props) {

    const darkmode = props.curretMode

    const [listPush, SetListPush] = useState([])
  const [showSpinner, SetshowSpinner] = useState(false)
    const {t} = props

    const GetPushList = () => {
        SetshowSpinner(true)
        const headers = {
           'Content-Type': 'application/json',
           'x-access-token': `${props.userData.token}`
       };
       axios.get('https://app.smart-life.uz/api/v1/notifications?type=notification&status=news&page=0&per_page=50', { headers })
           .then(response => {
              SetshowSpinner(false)
                    // alert(response.data.notifications)
              SetListPush(response.data.notifications)
           
             
           })
           .catch(function (error) {
              SetshowSpinner(false)
              if (error.response) {
                 if(error.response.status == 401)
                 {
                    props.dispatch(saveUser({}));
                 }
              }
            });
       }

    useEffect(() => {
        GetPushList()
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
                        <Text style={Css(darkmode).h3}>{t('eslatmalar')}</Text>
                    </View>
                 </View>
            </View>

            <View style={Css(darkmode).mt20}>
                <View style={{height: '90%'}}>

                <ScrollView
                 contentContainerStyle={{flexGrow: 1}}
                 contentInset={{bottom: 40}}
                 
                >
                <View style={{flex: 1}}> 

                {
                        listPush.map((items, index) => {
                            return(
                                <View style={[Css(darkmode).flex, Css(darkmode).itemscenter, Css(darkmode).border_bottom]}>
                                    <View style={{width: 48, height: 48, borderRadius: 90, backgroundColor:'#999'}}>

                                    </View>
                                    <View style={{marginLeft: 10}}>
                                        <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>{items.name}</Text>
                                        <Text style={Css(darkmode).h4_light}>{items.createDate}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }

                    

                </View>
                

                </ScrollView>

                </View> 
            </View>

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