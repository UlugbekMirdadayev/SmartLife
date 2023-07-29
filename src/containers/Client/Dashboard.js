import React, {useEffect, useRef, useState} from 'react';
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
import i18next from 'i18next';
import Css from '../assests/Style/Style'
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import SvgUri from 'react-native-svg-uri';
import Carousel, { ParallaxImage, Pagination} from 'react-native-snap-carousel'
import Swiper from 'react-native-swiper'
import NavigationService from '../../navigators/NavigationService';
import axios from 'axios'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'

const SLIDER_WIDTH = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 2 / 5);
import Spinner from '../../components/Spinner';
import { setDarkmode, saveUser } from '../../services/actions'

import ignoreWarnings from 'ignore-warnings';

ignoreWarnings('warn',['ViewPropTypes','[react-native-gesture-handler]'])

function ClientDashboard(props) {

   const dispatch = useDispatch()

   const {t} = props

  const darkmode = props.curretMode

  const lengthData = Object.keys(props.userData).length

  const [Contracts, SetContracts] = useState([])
  const [NewsList, SetNewsList] = useState([])
  const [showSpinner, SetshowSpinner] = useState(false)
  const [chatAdminId, setChatAdminId] = useState(0)


  useEffect(() => {

   

   // alert(JSON.stringify(props.userData))
   console.log(props.userData.token)
   GetContracts()
 
   // alert(props.userData.user._id)
   props.navigation.addListener('focus', () => {
      GetContracts()
      GetNews()

      
       
      
  });
  },[])

  const GetChatAdmin = () => {

         const headers = {
            'Content-Type': 'application/json',
            'x-access-token': `${props.userData.token}`
         };
        axios.get('https://app.smart-life.uz/api/v1/chat/to/admin', { headers })
         .then(response => {

            if(response.data[0]._id != "")
            { 
               NavigationService.navigate('Chat', {
                  id: response.data[0]._id,
                  name: response.data[0].first_name
               })
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

  const GetNews = () => {
   const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`
  };
  axios.get('https://app.smart-life.uz/api/v1/news', { headers })
      .then(response => {

         SetNewsList(response.data)
        
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

  const GetContracts = () => {
   // SetshowSpinner(true)
   const headers = {
      'Content-Type': 'application/json',
      'x-access-token': `${props.userData.token}`
  };
  axios.get('https://app.smart-life.uz/api/v1/user/purchase/'+props.userData.user._id+'', { headers })
      .then(response => {
         SetshowSpinner(false)
         // alert(JSON.stringify(response.data))
         SetContracts(response.data.purchases)
         console.log('token', props.userData.token)
        
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

  

  const scrollViewRef = useRef();

  const entries  = [
    {
        title: 'Push mavzusi',
        subtitle: 'Sizning balansingiz',
        illustration: require('../assests/images/getmoney.png'),

    },
    {
        title: 'Obod uy',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: require('../assests/images/unisavdo.png'),

    }
]

const renderitem = ({item, index, darkmode}) =>{
  return(
    <View style={Css(darkmode).item}>
    <Pagination
              dotsLength={2}
              activeDotIndex={1}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />

    

    </View>
  )
}
 

  useEffect(() => {
    
  },[])

  const styles = StyleSheet.create({
    wrapper: {},
   
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })
   
    return (
      <View style={{flex: 1}}>

<Spinner processing={showSpinner}/>
  
        <View style={Css(darkmode).container}>
          <StatusBar barStyle='dark-content' translucent backgroundColor={'transparent'} />
          <View style={Css(darkmode).content}>

          <View style={Css(darkmode).pageheader}>

            <View style={[Css(darkmode).flex, Css(darkmode).itemscenter, Css(darkmode).between]}>

            <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
               
               <TouchableOpacity style={Css(darkmode).proicons}
               onPress={() => NavigationService.navigate('ClientSetting')}
               >

               </TouchableOpacity>

                <View style={Css(darkmode).ml10}>
                <Text style={[Css(darkmode).bold, Css(darkmode).h3]}>{lengthData > 0 ? props.userData.user.last_name : ''} {lengthData > 0 ? props.userData.user.first_name : ''}</Text>
                <Text style={{color:'#AEAEAE'}}>Client</Text>
                </View>
                
             </View>

             <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                <TouchableOpacity
                onPress={() => NavigationService.navigate('ClientNotifications')}
                >
                  <Octicons name='bell' size={24} style={Css(darkmode).blackwhite}/>
                
                {/* <View style={{backgroundColor:'#F7060B', width:11, height:11, borderRadius:10, position:'absolute', right: -1, top: -2}}></View> */}
                </TouchableOpacity>

                <TouchableOpacity style={Css(darkmode).ml10}
                onPress={() => GetChatAdmin()}
                >
                 <Feather name='message-square' size={23} style={Css(darkmode).blackwhite}/>
                
                {/* <View style={{backgroundColor:'#F7060B', width:11, height:11, borderRadius:10, position:'absolute', right: -1, top: -2}}></View> */}

                </TouchableOpacity>
             </View>

            </View>
             

          </View>


          <View style={{height: 210, marginTop: 20}}>

            {
               Contracts.length > 0 ? (
                  <Swiper style={styles.wrapper} showsButtons={true}
                  activeDotStyle={{width: 50, height: 4}}
                  activeDotColor={'#FFCD38'}
                  buttonWrapperStyle={{display:'none'}}
                  dotStyle={{width: 20, height: 4}}
                  loop={false}
                  paginationStyle={{position:'absolute', top: 200, backgroundColor:'#FEFEFE'}}
                  >

                     {
                        Contracts.map((items, index) => {
                           return(
                              <>
                                 <View>
                                       <View style={{backgroundColor:'#715400', height: 38, borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingHorizontal: 18, paddingVertical: 10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                          <View style={[Css(darkmode).flex, Css(darkmode).between, Css(darkmode).itemscenter]}>
                                             <View style={{width: 12, height: 12, borderRadius: 20, backgroundColor:'#fff'}}></View>
                                             <View style={{marginLeft: 10}}>
                                                <Text style={{fontSize: 13, color:'#fff'}}>Bu oy to’langan</Text>
                                             </View>
                                          </View>
                                          <View>
                                             <View>
                                                <Text style={{fontSize: 13, color:'#fff'}}>Keyingi to’lov: 20.02.2023</Text>
                                             </View>
                                          </View>
                                       </View>
                                       <View>
                                          <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={['#FFCD38', '#FBDE78']} style={{height: 147, paddingVertical: 10, paddingHorizontal: 20, borderBottomRightRadius: 12, borderBottomLeftRadius: 12}}>
                                             <View style={[Css(darkmode).flex, Css(darkmode).between]}>
                                                <View>
                                                   <View>
                                                      <Text style={[Css(darkmode).h2, Css(darkmode).bold]}>{items.productId.name}</Text>
                                                   </View>
                                                   <View style={{marginTop: 5}}>
                                                      <Text>Mobile Phone</Text>
                                                   </View>
                              
                                                   <View style={{marginTop: 40}}>
                                                      <TouchableOpacity 
                                                      onPress={() => NavigationService.navigate('ClientPayDetails', {
                                                         'payments' : items
                                                      })}
                                                      style={{backgroundColor:'#FFE895', height: 35, justifyContent:'center', alignItems:'center', borderRadius: 30}}>
                                                         <Text>{t('about_pay')}</Text>
                                                      </TouchableOpacity>
                                                   </View>
                                                </View>
                              
                                                <Image
                                                   source={require('../assests/images/iphone13.png')}
                                                   style={{width: 200, height: 140}}
                                                   resizeMode={'contain'}
                                                />
                              
                                             </View>
                                          </LinearGradient>
                                          </View>
                                       </View>    
                              </>
                           )
                        })
                     }
                
               
                
              </Swiper>
               ) : <></>
            }

          

          </View>

          <View>

          <ScrollView
           contentContainerStyle={{flexGrow: 1, paddingBottom: height / 1.2}}
           contentInset={{bottom: height / 2}}
           showsVerticalScrollIndicator={false}
          >

          <View style={[Css(darkmode).mt40, {paddingBottom: 40}]}>
            {
               Contracts.length > 0 ? (
                  <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>{t('xaridlar')}</Text>
               ) : <></>
            }
             

             {
                     Contracts.map((items,index) => {
                        return(
                     <TouchableOpacity 
                     onPress={() => NavigationService.navigate('ClientPayDetails', {
                        'payments' : items
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
                               
                                  <Text style={[Css(darkmode).blackwhite, {fontSize: 18, fontWeight:'600'}]}>${items.productId.price}</Text>
                             
                            </View>
                         </View>
                     </TouchableOpacity>
                        )
                     })
                  } 

            {/* <TouchableOpacity style={Css(darkmode).mainlist}
             onPress={() => NavigationService.navigate('ClientPayDetails')}
             activeOpacity={1}
            >
               <View>
                   <Image
                     source={require('../assests/images/itemimg.png')}
                     style={{width: 114, height: 93}}
                   />
               </View>

               <View style={[Css(darkmode).ml10]}>

                  <View>
                      <Text style={[Css(darkmode).h4, Css(darkmode).bold]}>iPhone 14 Pro</Text>
                  </View>
                  <View style={{marginTop: 5, flexDirection:'row', justifyContent: 'space-between', alignItems:'center', flexWrap: 'wrap', width:'72%',flexShrink:1}}>
                      <Text style={{fontSize:14, fontWeight:'700'}}>$500</Text>
                      <Text style={{color:'#005D4D'}}>$200</Text>
                      <Text style={{color:'#005D4D'}}>$200</Text>
                      <Text style={{color:'#F41F52'}}>$200</Text>
                  </View>
                  <View style={{marginTop: 5, flexDirection:'row', justifyContent: 'space-between', alignItems:'center', flexWrap: 'wrap', width:'72%',flexShrink:1}}>
                      <Text style={{fontSize:14, fontWeight:'700'}}>$500</Text>
                      <Text style={{color:'#005D4D'}}>$200</Text>
                      <Text style={{color:'#005D4D'}}>$200</Text>
                      <Text style={{color:'#F41F52'}}>$200</Text>
                  </View>
                  <View style={{marginTop: 5, flexDirection:'row', justifyContent: 'space-between', alignItems:'center', flexWrap: 'wrap', width:'72%',flexShrink:1}}>
                      <Text style={{fontSize:14, fontWeight:'700'}}>$500</Text>
                      <Text style={{color:'#005D4D'}}>$200</Text>
                      <Text style={{color:'#005D4D'}}>$200</Text>
                      <Text style={{color:'#F41F52'}}>$200</Text>
                  </View>
               </View>

            </TouchableOpacity> */} 
            

          </View>
          
          </ScrollView>    

          </View>  

          


          </View>
             
        </View>
      
      </View>
    );
  }
 
  const mapStateToProps = (state, ownProps) => {
    return {
        userData: state.user.user,
        curretMode: state.darkmode.darkmodeset        
    }
}

ClientDashboard = connect(mapStateToProps)(ClientDashboard)
export default withTranslation('main')(ClientDashboard)