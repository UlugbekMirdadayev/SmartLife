import React, { useEffect, useState, useRef, useCallback } from 'react';
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
    
} from 'react-native';
import { connect, useDispatch } from 'react-redux'
import { withTranslation } from 'react-i18next'
import Css from '../assests/Style/Style'
import Ionic from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import SvgUri from 'react-native-svg-uri';
import { io } from "socket.io-client";
import NavigationService from '../../navigators/NavigationService';
import axios from 'axios'
import { GiftedChat } from 'react-native-gifted-chat'
import { setDarkmode, saveUser, setMainTheme } from '../../services/actions'

function ChatScreen(props) {

    const dispatch = useDispatch()

    const darkmode = props.curretMode
    const [chatList, setChatList] = useState([])
    const [messageText, SetMessageText] = useState('')
    const scrollViewRef = useRef();
    const socket = io.connect('http://185.65.202.117:3077', { transports: ['websocket'] });
    const [messages, setMessages] = useState([]);
    useEffect(() => {

        // setMessages([
        //     {
        //       _id: 1,
        //       text: 'Hello developer',
        //       createdAt: new Date(),
        //       user: {
        //         _id: 2,
        //         name: 'React Native',
        //         avatar: 'https://placeimg.com/140/140/any',
        //       },
        //     },
        //   ])

        console.log('user', props.userData.user._id)

        GetMessage()

        socket.on("connect", () => {

            socket.emit('add-user', props.userData.user._id);

            socket.on('msg-receive', function (data) {
                console.log('recive socker', data)
                GetMessage()
            });

        });

    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

    const GetMessage = () => {
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': `${props.userData.token}`
        };
        axios.get('https://app.smart-life.uz/api/v1/mobile/messages', { headers })
            .then(response => {

                setChatList(response.data)

                    
                        response.data.map((items, index) => {
                            setMessages([
                                {
                                  _id: 1,
                                  text: items.message,
                                  createdAt: new Date(),
                                  user: {
                                    _id: 2,
                                    name: 'React Native',
                                    avatar: 'https://placeimg.com/140/140/any',
                                  },
                                },
                              ])
                        })
                    
                 
                    
                 

                 

            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status == 401) {
                        props.dispatch(saveUser({}));
                    }
                }
            });
    }

    const renderSend = (sendProps) => {
        if (sendProps.text.trim().length > 0) {
          return (
            <TouchableOpacity 
            onPress={() => onSend(sendProps)}
            style={{width: 43, height: 43, borderRadius: 100, alignItems:'center', justifyContent:'center', backgroundColor:'#FBC100'}}>
               <Feather name={'send'} size={22}/>
            </TouchableOpacity>
          );
        }
        else
        {
            <TouchableOpacity
             disabled
            style={{width: 43, height: 43, borderRadius: 100, alignItems:'center', justifyContent:'center', backgroundColor:'#FBC100'}}>
            <Feather name={'send'} size={22}/>
            </TouchableOpacity>
        }
       
      }

    const SendMessage = () => {

        
       
            socket.emit('send-msg', {
                from : props.userData.user._id,
                to: props.route.params.id,
                msg: messageText
            });

       

        

        

        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': `${props.userData.token}`
        };
    
         const data = {
          "message": messageText
        }
    
        axios.post('https://app.smart-life.uz/api/v1/mobile/messages/send', data, { headers })
            .then(response => {
              
               if(response.data.code == 200)
               {
                GetMessage()
                SetMessageText('')
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

    return (
        <View style={Css(darkmode).container}>
            <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />

            <View style={Css(darkmode).content}>

                <View style={Css(darkmode).pageheader}>
                    <View style={[Css(darkmode).flex, Css(darkmode).itemscenter]}>
                        <TouchableOpacity style={Css(darkmode).backto}
                            onPress={() => NavigationService.goBack()}
                        >
                            <Ionic name={'arrow-back'} size={18} />
                        </TouchableOpacity>
                        <View style={Css(darkmode).ml10}>
                            <Text style={Css(darkmode).h3}>{props.route.params.name}</Text>
                        </View>
                    </View>
                </View>

                <View style={Css(darkmode).mt20}>
                    <View style={{ height: '88%' }}>
                    

                    <GiftedChat
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                        
                        renderSend={(props)=>{
                            const {text,messageIdGenerator,user, onSend} = props
                            return(
                              <TouchableOpacity
                              activeOpacity={1}
                              style={{width: 43, height: 43, borderRadius: 100, alignItems:'center', justifyContent:'center', backgroundColor:'#FBC100'}}
                              onPress= {
                                ()=>{
                                   if (text && onSend) {
                                       onSend({ text: text.trim(), user:user,_id:messageIdGenerator()}, true);
                                 }
                                 }
                                } >
                                  <Feather name='send' size={22}/>
                            </TouchableOpacity>
                            )}
                        }
                        // renderSend={renderSend}
                        // alwaysShowSend={true}
                        />

                       

                    </View>


                    {/* <View style={{ backgroundColor: '#F6F6F6', height: 56, position: 'absolute', bottom: 40, zIndex: 999, width: '100%', borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                        <View style={{ backgroundColor: '#FEFEFE', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                            <Feather name='paperclip' size={20} />
                        </View>
                        <View style={{ justifyContent: 'center', width: '70%', height: 50, marginLeft: 10 }}>
                            <TextInput
                                placeholder='Message'
                                placeholderTextColor={'#66707A'}
                                name='messageText'
                                value={messageText}
                                onChangeText={(text) => SetMessageText(text)}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => SendMessage()}
                            style={{ width: 40, height: 40, backgroundColor: '#FBDE78', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <Feather name='send' size={22} />
                        </TouchableOpacity>
                    </View> */}



                </View>

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