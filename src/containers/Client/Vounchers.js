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
import axios from 'axios';
import Spinner from '../../components/Spinner';

function ChatScreen(props) {

    const darkmode = props.curretMode
   const dispatch = useDispatch()
  const [showSpinner, SetshowSpinner] = useState(false)
  const [listVouncher, SetlistVouncher] = useState([])

 
    const GetVounchersLists = () => {
        SetshowSpinner(true)
        const headers = {
           'Content-Type': 'application/json',
           'x-access-token': `${props.userData.token}`
       };
       axios.get('https://app.smart-life.uz/api/v1/me', { headers })
           .then(response => {
              SetshowSpinner(false)
              SetlistVouncher(response.data.voucher)
            //   alert(JSON.stringify(response.data.voucher))
             
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
        GetVounchersLists()
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
                        <Text style={Css(darkmode).h3}>Voucher</Text>
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
                        listVouncher.map((items, index) => {
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