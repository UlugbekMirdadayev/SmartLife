import {StyleSheet, Platform} from 'react-native';
import { Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const styles = (props) => StyleSheet.create({
    container: {
         
    },


    row:{
        marginTop:15, 
        alignItems: 'center',
        flexDirection: 'row',
        // borderWidth:1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8
         
    } ,

    text:{
        fontSize:16,
        // marginTop:15,
        color:props,
        fontWeight:'600',


    },
    text2:{
        width:'85%',
        fontSize: 18,
        color: '#000',
        paddingTop:0,
        paddingBottom:20,
        // textAlign:'justify',
        lineHeight: 23,
    }

})
export default styles
