/* eslint-disable react-native/no-inline-styles */
import React, {useMemo} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import PropTypes from 'prop-types';

const Spinner = props => {
  const div = useMemo(() => {
    if (props.processing) {
      return (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.darkmode
              ? 'rgba(0,0,0,0.9)'
              : 'rgba(255,255,255,0.9)',
            zIndex: 99999,
          }}>
          <ActivityIndicator size="large" color={'#FBC100'} />
          <Text style={{color: props.darkmode ? '#fff' : '#000', marginTop: 5}}>
            Loading
          </Text>
        </View>
      );
    } else {
      null;
    }
  }, [props]);

  return div;
};
Spinner.propTypes = {
  processing: PropTypes.bool,
};
Spinner.defaultProps = {
  processing: false,
};

export default Spinner;
