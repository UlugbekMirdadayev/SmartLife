import { StyleSheet } from 'react-native';
 

const styles = (props) => StyleSheet.create({
    spinnerWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.darkmode ? ('rgba(255,255,255,0.9)') : ('rgba(0,0,0,0.9)'),
        // backgroundColor: props.darkmode ? ('red') : ('green'),
        zIndex: 99999
        }
})

export default styles
