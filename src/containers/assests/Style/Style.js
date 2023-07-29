import {StyleSheet, Dimensions} from 'react-native';
import color from './color';
const height = Dimensions.get('window').height;
const SLIDER_WIDTH = Dimensions.get('window').width;

const styles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props ? color.dark : color.backlight,
    },
    disabled: {
      opacity: 0.5,
    },
    w_50: {
      width: Math.round(SLIDER_WIDTH * 0.435),
    },
    content: {
      width: '89%',
      alignSelf: 'center',
    },
    header: {
      height: 220,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    h2: {
      fontSize: 22,
    },
    h3: {
      fontSize: 18,
      color: props ? '#fff' : '#000',
    },
    bold: {
      fontWeight: '700',
    },
    textCenter: {
      textAlign: 'center',
    },
    blackwhite: {
      color: props ? '#fff' : '#000',
    },
    wrapmain: {
      position: 'absolute',
      width: '100%',
      marginTop: -50,
      backgroundColor: props ? color.dark : color.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      top: 220,
      bottom: 0,
      paddingTop: 80,
      paddingHorizontal: 30,
    },
    roundinput: {
      backgroundColor: props ? '#27292b' : '#F6F6F6',
      height: 52,
      borderRadius: 24,
      paddingHorizontal: 20,
      color: props ? '#fff' : '#000',
    },
    mt10: {
      marginTop: 10,
    },
    mt50: {
      marginTop: 50,
    },
    mt20: {
      marginTop: 20,
    },
    mt40: {
      marginTop: 40,
    },
    mx10: {
      marginVertical: 10,
    },
    roundedfull: {
      borderRadius: 25,
    },
    mainbtn: {
      height: 56,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnyellow: {
      height: 56,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FBC100',
      borderRadius: 30,
    },
    lightGreenbtn: {
      height: 56,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props ? '#363a40' : '#005D4D1A',
      borderRadius: 30,
    },
    lightbtn: {
      height: 56,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props ? '#333' : '#ECF1F6',
      borderRadius: 30,
      paddingHorizontal: 20,
    },
    middlelight: {
      backgroundColor: props ? '#333' : '#F4F4F4',
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 20,
      width: 120,
      alignItems: 'center',
    },
    lightgray: {
      color: color.lightGray,
      textDecorationLine: 'none',
    },
    flex: {
      flexDirection: 'row',
    },
    itemscenter: {
      alignItems: 'center',
    },
    between: {
      justifyContent: 'space-between',
    },
    pageheader: {
      marginTop: height / 18,
    },
    ml10: {
      marginLeft: 10,
    },
    ml20: {
      marginLeft: 20,
    },
    proicons: {
      width: 40,
      height: 40,
      backgroundColor: color.lightGray,
      borderRadius: 40,
    },
    sliderimage: {
      width: '100%',
      resizeMode: 'contain',
    },
    item: {
      width: SLIDER_WIDTH / 1.1,
      backgroundColor: props ? color.lightDark : color.white,
      borderRadius: 6,
      padding: 15,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    h4: {
      fontSize: 16,
      color: props ? '#fff' : '#000',
    },
    h4_light: {
      color: '#9CA4AB',
      fontSize: 14,
    },
    h5: {
      fontSize: 14,
      color: props ? '#fff' : '#000',
    },
    border_bottom: {
      borderBottomColor: props ? '#333' : '#E3E7EC',
      borderBottomWidth: 1,
      paddingBottom: 10,
    },
    mainlist: {
      marginVertical: 15,
      flexDirection: 'row',
    },
    backto: {
      backgroundColor: props ? '#161616' : color.gray,
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
    },
    chatanswer: {
      width: '60%',
      marginVertical: 10,
    },
    chatquestion: {
      width: '70%',
      marginVertical: 10,
    },
    answertext: {
      backgroundColor: color.gray,
      padding: 12,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomRightRadius: 24,
    },

    questiontext: {
      backgroundColor: color.lightgreen,
      padding: 12,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderBottomLeftRadius: 24,
    },

    lightText: {
      color: color.lightText,
    },
    f10: {
      fontSize: 11,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#999',
      borderRadius: 6,
      marginTop: 3,
      paddingHorizontal: 8,
    },
    inputin: {
      height: 50,
      fontSize: 15,
      color: props ? '#fff' : '#000',
    },
    inputbg: {
      height: 50,
      borderWidth: 1,
      borderColor: props ? '#82878f' : '#ededed',
      borderRadius: 6,
      marginTop: 3,
      paddingHorizontal: 12,
      backgroundColor: props ? '#27292b' : '#F6F6F6',
      zIndex: 0,
    },
    shadowmd: {
      shadowColor: '#ededed',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 2.39,
      shadowRadius: 2.3,

      elevation: 13,
    },
    roundbtn: {
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 16,
      borderColor: '#E3E7EC',
    },
    roundbtn_selected: {
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 16,
      backgroundColor: color.maincolor,
      borderColor: '#E3E7EC',
    },
    dropdowns: {
      borderColor: '#ededed',
      shadowColor: '#999',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 4.39,
      shadowRadius: 8.3,

      elevation: 22,
      backgroundColor: '#fff',
    },
  });

export default styles;
