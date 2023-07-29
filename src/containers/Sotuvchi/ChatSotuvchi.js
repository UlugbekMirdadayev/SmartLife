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

function ChatScreen(props) {

    const darkmode = props.curretMode

    useEffect(() => {
      
    },[])

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
                        <Text style={Css(darkmode).h3}>Ibrohimjon Eminov (Admins)</Text>
                    </View>
                 </View>
            </View>

            <View style={Css(darkmode).mt20}>
                <View style={{height: '85%'}}>

                <ScrollView
                 contentContainerStyle={{flexGrow: 1}}
                 contentInset={{bottom: 40}}
                 
                >
                <View style={{flex: 1}}>

                <View style={Css(darkmode).chatanswer}>
                    <View style={[Css(darkmode).flex]}>
                        <View style={[Css(darkmode).proicons, {marginTop: 2}]}>
                        </View>
                        <View>
                        <View style={[Css(darkmode).ml10, Css(darkmode).answertext]}>
                            <Text>Lorem ipsum dolor sit et, consectetur adipiscing. Lorem ipsum dolor sit et, consectetur adipiscing</Text>
                        </View>
                        <View style={{marginTop: 10, marginLeft: 10}}>
                        <Text style={[Css(darkmode).lightText, Css(darkmode).f10]}>15:42 PM</Text>
                        </View>
                        
                        </View>
                       
                    </View>
                </View> 

                

                <View style={{alignItems:'flex-end', width:'100%'}}>

                <View style={[Css(darkmode).chatquestion]}>
                    <View style={[Css(darkmode).flex]}>
                        
                        <View style={{width:'80%'}}>
                        <View style={[Css(darkmode).questiontext]}>
                            <Text>Lorem ipsum dolor  Lorem ipsum dolor  Lorem ipsum dolor  Lorem ipsum dolor</Text>
                        </View>
                        <View style={{marginTop: 10, marginLeft: 10}}>
                        <Text style={[Css(darkmode).lightText, Css(darkmode).f10]}>15:49 PM</Text>
                        </View>
                        
                        </View>

                        <View style={[Css(darkmode).proicons, {marginTop: 2, marginLeft: 10}]}>
                        </View>
                       
                    </View>
                </View>

                </View>

                <View style={{alignItems:'flex-end', width:'100%'}}>

                <View style={[Css(darkmode).chatquestion]}>
                    <View style={[Css(darkmode).flex]}>
                        
                        <View style={{width:'80%'}}>
                        <View style={[Css(darkmode).questiontext]}>
                            <Text>Lorem ipsum dolor  Lorem ipsum dolor  Lorem ipsum dolor  Lorem ipsum dolor</Text>
                        </View>
                        <View style={{marginTop: 10, marginLeft: 10}}>
                        <Text style={[Css(darkmode).lightText, Css(darkmode).f10]}>15:49 PM</Text>
                        </View>
                        
                        </View>

                        <View style={[Css(darkmode).proicons, {marginTop: 2, marginLeft: 10}]}>
                        </View>
                       
                    </View>
                </View>

                </View>



                </View>
                

                </ScrollView>

                </View>
                

                <View style={{backgroundColor:'#F6F6F6', height: 56, position:'absolute', bottom: 40, zIndex: 999, width:'100%', borderRadius: 100, alignItems:'center', justifyContent:'center', flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                    <View style={{backgroundColor:'#FEFEFE', width: 40, height: 40, justifyContent:'center', alignItems:'center', borderRadius: 50}}>
                        <Feather name='paperclip' size={20}/>
                    </View>
                    <View style={{justifyContent:'center', width:'70%', height: 50, marginLeft: 10}}>
                        <TextInput
                         placeholder='Message'
                         placeholderTextColor={'#66707A'}
                        />
                    </View>
                    <View style={{width: 40, height: 40, backgroundColor:'#FBDE78', borderRadius: 50, alignItems:'center', justifyContent:'center'}}>
                    <SvgUri width="20" height="20" source={require('../assests/images/send.svg')} />
                    </View>
                </View>
                
                

            </View>

            </View>
            

        </View>
    )

}

export default ChatScreen