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
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios';
import { setDarkmode, saveUser } from '../../services/actions'

function SettingScreen(props) {

    const darkmode = props.curretMode
    const dispatch = useDispatch();

    const [ProfileInfo, SetProfileInfo] = useState('')
    const [oldPass, SetOldPass] = useState('')

    useEffect(() => {
 
        AboutMe()
    },[])

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        
        setIsEnabled(previousState => !previousState)
        const ss = true
        dispatch({ type: SET_DARKMODE, ss })
    };

    const AboutMe = () => {
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': `${props.userData.token}`
         };
        axios.get('https://app.smart-life.uz/api/v1/me', { headers })
         .then(response => { 
            SetProfileInfo(response.data)
         
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

    const choosePhotoFromLibrary = (setFieldValue) => {
        ImagePicker.openPicker({
          
          mediaType: 'photo'
    
          // writeTempFile: false
        })
        .then((callbackimages) => {
          console.log("Imagesssssss:", callbackimages) 
       
          SetOldPass(callbackimages)
          FileUploadTo(callbackimages)
           
        }).catch(e => {
          if (e.code !== 'E_PICKER_CANCELLED') {
             
             
          }
        });
         
      }

      const FileUploadTo = (img) => {
 
        const uri =
      Platform.OS === "android"
        ? img.path
        : img.path.replace("file://", "");
    const filename = img.path.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;

        bodyFormData.append('file', {
            uri,
            name: `image.${ext}`,
            type,
          }); 

          axios({
            method: "post",
            url: 'https://app.smart-life.uz/api/v1/upload/document',
            data: bodyFormData,
            headers: { 
                "Content-Type": "multipart/form-data",
                'Authorization': `${props.userData.token}`
             },
          })
            .then(function (response) {
              //handle success
              console.log("Profile", response.data);
            //   SetfileNamePasportOld(response.data.data.filename)
               
              

            })
            .catch(function (response) {
              //handle error
              console.log(response);

            });
        
}

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
                        <Text style={Css(darkmode).h3}>Sozlamalar</Text>
                    </View>
                 </View>
            </View>

            <View style={Css(darkmode).mt20}>
                 
                 <View style={{alignItems:'center',justifyContent:'center', position:'relative'}}>
                    <View style={{width: 100, height: 100, backgroundColor:'#ededed', borderRadius: 100, justifyContent:'center', alignItems:'center'}}>
                        

                        {
                             oldPass != '' ? (
                                <View style={{width: 55, height: 55}}>
                                    <Image source={{uri: oldPass.path}}
                                     style={{width: 50, height: 50}}
                                     resizeMode={'contain'}
                                    />
                                </View>
                            ) : <><FontAwesome name={'user-alt'} size={50}/></>
                        }

                        <TouchableOpacity 
                        onPress={() => choosePhotoFromLibrary()}
                        style={{backgroundColor:'#005D4D', width: 34, height: 34, borderRadius: 32, borderWidth: 4, borderColor:'#fff', position:'absolute', right: 1, bottom: -2, justifyContent:'center', alignItems:'center'}}>
                                <FontAwesome name='pen' size={14} color={'#fff'}/>
                        </TouchableOpacity>
                    </View>
                    
                 </View>

                 <View style={Css(darkmode).mt20}>
                    <ScrollView>
                        <View>
                            <View>
                                 <Text style={Css(darkmode).label}>First Name</Text>
                            </View>
                            <View style={Css(darkmode).input}>
                                <TextInput/>
                            </View>
                        </View>
                        <View style={Css(darkmode).mt10}>
                            <View>
                                 <Text style={Css(darkmode).label}>Last Name</Text>
                            </View>
                            <View style={Css(darkmode).input}>
                                <TextInput/>
                            </View>
                        </View>
                        <View style={Css(darkmode).mt10}>
                            <View>
                                 <Text style={Css(darkmode).label}>Telefon Raqam</Text>
                            </View>
                            <View style={Css(darkmode).input}>
                                <TextInput/>
                            </View>
                        </View>
                        <View style={Css(darkmode).mt10}>
                            <View>
                                 <Text style={Css(darkmode).label}>Gender</Text>
                            </View>
                            <View style={Css(darkmode).input}>
                                <TextInput/>
                            </View>
                        </View>
                        <View style={Css(darkmode).mt10}>
                            <View>
                                 <Text style={Css(darkmode).label}>Status 🥇</Text>
                            </View>
                            <View style={Css(darkmode).input}>
                                <TextInput/>
                            </View>
                        </View>
                        <View style={Css(darkmode).mt10}>
                            <View style={{padding: 8, borderWidth:1, borderColor:'#999', borderRadius: 6}}>
                                <Text>Sining statusingiz hozirda Gold
siz 0% ustama bilan muddatli to’lovga 
narsa xarid qilishingiz mumkin
Batafsil: Bu yerda</Text>
                            </View>
                        </View>
                        <View style={Css(darkmode).mt10}>
                            <TouchableOpacity style={Css(darkmode).lightbtn}>
                                <Text>Save Changes</Text>
                            </TouchableOpacity>
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
        curretMode: state.darkmode.darkmodeset  
    }
}

SettingScreen = connect(mapStateToProps)(SettingScreen)
export default withTranslation('main')(SettingScreen)