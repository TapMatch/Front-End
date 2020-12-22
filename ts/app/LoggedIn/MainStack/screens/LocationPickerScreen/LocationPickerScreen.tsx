import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Header from './components/Header/Header';
import DoneBtn from './components/DoneBtn';
import googleMapStyle from "ts/constants/googleMapStyle.json";

interface LocationPickerScreenProps {
  navigation: any;
  route: any;
}

const LocationPickerScreen = ({
  navigation,
  route,
}: LocationPickerScreenProps) => {
  const isFocused = useIsFocused();
  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const coordinates = userLocation[0];

  if (isFocused) {
    return (
      <View style={_s.container}>
        <StatusBar
          animated={true}
          backgroundColor={_c.smoke}
          barStyle={'dark-content'}
        />
        <Header />
        <DoneBtn />
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={googleMapStyle}
          zoomEnabled={true}
          style={_s.map}
          pitchEnabled={true}
          rotateEnabled={true}
          scrollEnabled={true}
          region={{
            ...coordinates,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    );
  } else {
    return null;
  }
};

export default LocationPickerScreen;

const _s = StyleSheet.create({
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
