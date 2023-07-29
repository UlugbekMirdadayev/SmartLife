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
    Switch
} from 'react-native';
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import Css from '../assests/Style/Style'
import Ionic from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SvgUri from 'react-native-svg-uri';
import NavigationService from '../../navigators/NavigationService';
import { SET_LANGUAGE } from "../../services/constants"
import { SET_DARKMODE } from '../../services/constants'
import { useDispatch } from "react-redux";

function SettingScreen(props) {

    const darkmode = props.curretMode
    const dispatch = useDispatch();
    const [showItem, SetShowItem] = useState(false)

    const {t} = props

    useEffect(() => {
 
      
    },[])

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        
        setIsEnabled(previousState => !previousState)
        const ss = true
        dispatch({ type: SET_DARKMODE, ss })
    };

    return(
        <View style={Css(darkmode).container}>
            <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />

            <View style={Css(darkmode).content}>

            <View style={Css(darkmode).pageheader}>
                 <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                    <TouchableOpacity style={Css(darkmode).backto}
                    onPress={() => NavigationService.goBack()}
                    >
                        <Ionic name={'arrow-back'} size={18}/>
                    </TouchableOpacity>
                    <View style={Css(darkmode).ml10}>
                        <Text style={Css(darkmode).h3}>{t('yordam')}</Text>
                    </View>
                 </View>
            </View>

            <View style={Css(darkmode).mt20}>

                <ScrollView>

                        <TouchableOpacity

                        onPress={() => SetShowItem(showItem ? false : true)}
                        style={[Css(darkmode).flex, Css(darkmode).itemscenter, Css(darkmode).between, Css(darkmode).border_bottom ,{marginVertical: 10, borderBottomWidth: 1}]}
                        >
                            <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                                
                                <View style={Css(darkmode).ml10}><Text style={Css(darkmode).h4}>Statuslarning afzalliklari 🥇🥈🥉</Text></View>
                            </View>

                            <View>
                                <Feather name={'chevron-down'} size={20}/>
                            </View>
                            
                        </TouchableOpacity> 
                        {
                            showItem ? (
                                <View>
                                    <Text>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</Text>
                                </View>
                            ) : <></>
                        }
                        

                      

                </ScrollView>
            
            </View>
                 
                 
            </View>
            

        </View>
    )

}

const mapStateToProps = (state, ownProps) => {
    return {
        userData: state.profile.user_data,
        curretMode: state.darkmode.darkmodeset
    }
}

SettingScreen = connect(mapStateToProps)(SettingScreen)
export default withTranslation('main')(SettingScreen)