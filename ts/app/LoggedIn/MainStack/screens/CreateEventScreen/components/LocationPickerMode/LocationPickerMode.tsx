import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Header from './components/Header/Header';
import DoneBtn from './components/DoneBtn';
import googleMapStyle from "ts/constants/googleMapStyle.json";
import LocationMarker from './components/LocationMarker';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';

interface LocationPickerModeProps {
}

const LocationPickerMode = (props: LocationPickerModeProps) => {
  const isFocused = useIsFocused();
  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const {coordinates} = useContext(CreateEventScreenContext);

  if (isFocused) {
    return (
      <View style={_s.container}>
        <StatusBar
          animated={true}
          backgroundColor={_c.smoke}
          barStyle={'dark-content'}
        />
        <DoneBtn />
        <MapView
          // onPress={({nativeEvent}) => coordinates[1]({
          //   ...nativeEvent.coordinate,
          //   latitudeDelta: 0.015,
          //   longitudeDelta: 0.0121,
          // })}
          provider={PROVIDER_GOOGLE}
          customMapStyle={googleMapStyle}
          zoomEnabled={true}
          style={_s.map}
          pitchEnabled={true}
          rotateEnabled={true}
          scrollEnabled={true}
          region={coordinates[0]}
        >
          <LocationMarker coordinate={coordinates[0]} />
        </MapView>
        <Header />
      </View>
    );
  } else {
    return null;
  }
};

export default LocationPickerMode;

const _s = StyleSheet.create({
  modal: {margin: 0},
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(50,30,150,0.2)',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
