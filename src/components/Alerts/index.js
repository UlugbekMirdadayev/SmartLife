import React from 'react'
import { ActivityIndicator, View, Text, Image , Dimensions} from "react-native";
import PropTypes from "prop-types";
import AwesomeAlert from 'react-native-awesome-alerts';
const width = Dimensions.get('window').width;

const MyAlerts = (props) => {

    const hideAlert = () => {
         
    }

    if (props.processing)
        return (
            <View>
                <AwesomeAlert
                    show={props.showHide}
                    showProgress={false}
                    // title="AwesomeAlert"
                    message={props.contentmessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={props.confirmYes}
                    cancelText="Ok"
                    confirmText="Yes, delete it"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        props.hideFunction();
                    }}
                    
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                    contentContainerStyle={{width: width/1.2}}
                    cancelButtonColor={'#5D1BB8'}
                    cancelButtonStyle={{width: 80}}
                    cancelButtonTextStyle={{textAlign:'center', padding: 4}}
                    messageStyle={{fontSize: 15}}
                />
            </View>
        );
    else return null
};
MyAlerts.propTypes = {
    processing: PropTypes.bool,
};
MyAlerts.defaultProps = {
    processing: false
};


export default MyAlerts
