import {PermissionsAndroid} from 'react-native';

async function requestLocationPermission(onSuccess, onFailure) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'TANTANA',
        message: 'TANTANA access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      navigator.geolocation.getCurrentPosition(
        position => {
          // console.warn(JSON.stringify(position))
          onSuccess(position);
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      console.log('Location permission denied');
      onFailure();
    }
  } catch (err) {
    console.warn(err);
    onFailure();
  }
}

function Location(onSuccess = () => {}, onFailure = () => {}) {
  requestLocationPermission(onSuccess, onFailure);
}

export default {
  Location,
};
