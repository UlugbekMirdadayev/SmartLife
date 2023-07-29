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
import axios from 'axios'
import { setDarkmode, saveUser } from '../../services/actions'


function ChatScreen(props) {

    const dispatch = useDispatch()
    const {t} = props
    const [userList, SetUserList] = useState([])
    const [searchType, SetSearchType] = useState(1)
    const [searchParams, SetSearchParams] = useState('')

    const Type = [
        {
            id: 1,
            type: 'Ism'
        },
        {
            id: 2,
            type: 'Raqam'
        },
        {
            id: 3,
            type: 'Pasport'
        }
    ]

    const GetUsers = () => {
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': `${props.userData.token}`
        };
        axios.get('https://app.smart-life.uz/api/v1/contact/search', { headers })
            .then(response => {
      
                SetUserList(response.data)
              
            })
            .catch(function (error) {
               if (error.response) {
                  if(error.response.status == 401)
                  {
                     props.dispatch(saveUser({}));
                  }
               }
             });
    }

    const SearchUser = (params) => {
        SetSearchParams(params)
        if(params.length > 2)
        {
            const headers = {
                'Content-Type': 'application/json',
                'x-access-token': `${props.userData.token}`
            };

            var search_param = ''
            if(searchType == 1)
            {
                search_param = 'first_name'
            }
            if(searchType == 2)
            {
                search_param = 'phone'
            }
            if(searchType == 3)
            {
                search_param = 'pasport'
            }

            // alert('https://app.smart-life.uz/api/v1/contact/search?'+search_param+'='+params+'')

            axios.get('https://app.smart-life.uz/api/v1/contact/search?'+search_param+'='+params+'', { headers })
                .then(response => {
                     
                    if(response.data.length > 0)
                    {
                        SetUserList(response.data)
                    }
          
                    
                  
                })
                .catch(function (error) {
                   if (error.response) {
                      if(error.response.status == 401)
                      {
                         props.dispatch(saveUser({}));
                      }
                   }
                 });
        }
        else
        {
            GetUsers()
        }

        
    }

    const darkmode = props.curretMode

    useEffect(() => {
        GetUsers()
        props.navigation.addListener('focus', () => {
            GetUsers()
        });
    },[])

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
                        <Text style={[Css(darkmode).h3, Css(darkmode).bold]}>{t('foydalanuvchilar')}</Text>
                    </View>
                 </View>
            </View>

            <View style={Css(darkmode).mt20}>  

              <View> 
                 <View style={{borderWidth:1, height: 45, borderRadius: 6, flexDirection:'row', alignItems:'center',  paddingHorizontal: 10, borderColor: darkmode ? '#fff' : '#000'}}>
                     <View>
                         <Feather name={'search'} size={20} style={Css(darkmode).blackwhite}/>
                     </View>
                     <View style={{alignItems:'flex-start', alignContent:'flex-start', width:'80%'}}>
                         <View>
                         <TextInput
                           placeholder='Search'
                           onChangeText={(e) => SearchUser(e)}
                           value={searchParams}
                           style={[Css(darkmode).blackwhite, {marginLeft: 10, fontSize: 14}]}
                         />
                         </View>
                     </View>
                     <View style={{position:'absolute', right: 8}}>
                        {
                            searchParams != '' ? (
                                <TouchableOpacity onPress={() => SetSearchParams('')}>
                                    <Feather name='x' size={20}/>
                                </TouchableOpacity>
                                
                            ) : (
                                <></>
                            )
                        }
                         
                     </View>
                 </View>
              </View>

              <View style={Css(darkmode).mt10}>
                    <ScrollView
                     horizontal
                     contentContainerStyle={{flexGrow:1}}
                     showsHorizontalScrollIndicator={false}
                    >

                         {
                            Type.map((items, index) => {
                                return(
                                    searchType == items.id ? (
                                        <TouchableOpacity 
                                        activeOpacity={1}
                                        style={[Css(darkmode).roundbtn_selected, {marginHorizontal: 5}]}>
                                        <Text style={Css(darkmode).h5}>{items.type}</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity 
                                        onPress={() => SetSearchType(items.id)}
                                        style={[Css(darkmode).roundbtn, {marginHorizontal: 5}]}>
                                            <Text style={[Css(darkmode).blackwhite, Css(darkmode).h5]}>{items.type}</Text>
                                        </TouchableOpacity>
                                    )
                                    
                                )
                            })
                         } 
                       

                    </ScrollView>
              </View>

              <View style={Css(darkmode).mt20}>
                <ScrollView
                 contentContainerStyle={{flexGrow:1}}
                >

                     {
                        userList.map((items, index) => {
                            return(

                                <TouchableOpacity 
                                    onPress={() => NavigationService.navigate('UserTovar', {
                                        buyerId: items._id,
                                        name: items.first_name,
                                        lastname: items.last_name,
                                        phone: items.phone
                                    })}
                                    style={[Css(darkmode).flex, Css(darkmode).itemscenter, Css(darkmode).mx10]}>
                                        <View style={{width: 56, height: 56, borderRadius:56, backgroundColor:'#ededed'}}>
                                            <View style={{backgroundColor:'green', width:12, height:12, borderRadius:12, position:'absolute', bottom:1, right:1, borderWidth:1, borderColor:'#fff'}}></View>
                                        </View>
                                        <View style={Css(darkmode).ml10}>
                                            <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>{items.last_name} {items.first_name}</Text>
                                            <Text style={Css(darkmode).h5}>{items.phone}</Text>
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