import React, { Component } from 'react'
import { View, Text } from 'react-native'
import * as Location from 'expo-location'
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE
} from 'react-native-maps'

class AppGeo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      latitude: 41.3775,
      longitude: 64.5853,
      error: null
    }
  }

  componentDidMount () {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 1
      }
    )
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchId)
  }

  render () {
    return (
      <View>
        <MapView
          style={{ height: 180, borderRadius: 10 }}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          followsUserLocation={true}
          showsCompass={true}
          zoomEnabled={true}
          minZoomLevel={5}
          maxZoomLevel={16}
          showsUserLocation={true}
          loadingEnabled={true}
          loadingIndicatorColor={'#606060'}
          loadingBackgroundColor={'#fff'}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
          />
        </MapView>
      </View>
    )
  }
}

export default AppGeo
