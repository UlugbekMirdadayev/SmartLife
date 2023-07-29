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
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import SvgUri from 'react-native-svg-uri';
import NavigationService from '../../navigators/NavigationService';
import axios from 'axios'
import Spinner from '../../components/Spinner';


import { setDarkmode, saveUser } from '../../services/actions'
const height = Dimensions.get('window').height;


function ChatScreen(props) {

   const dispatch = useDispatch()

    const {t} = props

    const darkmode = props.curretMode
    const [Contracts, SetContracts] = useState([])
    const [showSpinner, SetshowSpinner] = useState(false)



    useEffect(() => {

        console.log(props.route.params.buyerId)

        GetContracts()

        props.navigation.addListener('focus', () => {
            GetContracts()
           
        });
      
    },[])

    const GetContracts = () => {
        SetshowSpinner(true)
        const headers = {
           'Content-Type': 'application/json',
           'x-access-token': `${props.userData.token}`
       };
       axios.get('https://app.smart-life.uz/api/v1/user/purchase/'+props.route.params.buyerId+'', { headers })
           .then(response => {
            SetshowSpinner(false)
     
              SetContracts(response.data.purchases)
            // alert(JSON.stringify(response.data.purchases))
             
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

    return(
        <View style={Css(darkmode).container}>
            <Spinner processing={showSpinner}/>
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
                    <TouchableOpacity 
                     
                    style={[Css(darkmode).flex, Css(darkmode).itemscenter, Css(darkmode).mx10]}>
                        <View style={{width: 48, height: 48, borderRadius:56, backgroundColor:'#ededed'}}>
                            <View style={{backgroundColor:'green', width:12, height:12, borderRadius:12, position:'absolute', bottom:1, right:1, borderWidth:1, borderColor:'#fff'}}></View>
                        </View>
                        <View style={Css(darkmode).ml10}>
                             <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>{props.route.params.lastname} {props.route.params.name}</Text>
                             <Text>{props.route.params.phone}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                 </View>
            </View>

            <View style={Css(darkmode).mt20}>
 
 
                
                <View style={Css(darkmode).mt10}>
                    <View style={{marginTop: 10, marginBottom: 10}}>
                         <Text style={Css(darkmode).h4}>{t('xaridlar')}</Text>
                    </View>
                    <ScrollView
                     contentContainerStyle={{flexGrow: 1}}
                     contentInset={{bottom: height / 6}}
                    >

                    {
                     Contracts.map((items,index) => {
                        return(
                     <TouchableOpacity 
                     onPress={() => NavigationService.navigate('MuddatUzaytirishInside', {
                        payments : items,
                        userid: props.route.params.buyerId,
                        name: props.route.params.name,
                        lastname: props.route.params.lastname,
                        id: items._id
                        
                     })}
                     style={[Css(darkmode).flex, {marginVertical: 10}]} key={items._id}>
                         <View style={{backgroundColor:'#F4F4F4', width:117, height: 100, borderRadius: 4, alignItems:'center'}}>
                         <Image
                            source={require('../assests/images/iphone13.png')}
                            style={{width: 70, height: 110}}
                            resizeMode={'contain'}
                          />
                         </View>
                         <View style={{marginLeft: 10}}>
                            {/* <Text>Naqt sotuv</Text> */}
                            <Text style={[Css(darkmode).bold, Css(darkmode).h4]}>{items.productId.name}</Text>
                            <View style={{marginTop: 40}}>
                               
                                  <Text style={{fontSize: 18, fontWeight:'600', color: darkmode ? '#fff' : '#333'}}>${items.productId.price}</Text>
                             
                            </View>
                         </View>
                     </TouchableOpacity>
                        )
                     })
                  } 
 

                     

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