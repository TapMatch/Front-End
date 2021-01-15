import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Header from './components/Header/Header';
import DoneBtn from './components/DoneBtn';
import googleMapStyle from "ts/constants/googleMapStyle.json";
import LocationMarker from './components/LocationMarker';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
import TargetWhite from 'assets/svg/target-white.svg';
import {vs} from 'react-native-size-matters';
import UserLocationMarker from './components/UserLocationMarker';
import Geocoder from 'react-native-geocoding';
import * as RNLocalize from "react-native-localize";

interface LocationPickerModeProps {
}

const LocationPickerMode = (props: LocationPickerModeProps) => {
  const isFocused = useIsFocused();
  const {userLocation} = useContext(TapMatchContext);
  const {coordinates, address, gpaRefState} = useContext(CreateEventScreenContext);
  const language = useState<string>(RNLocalize.getLocales()[0].languageCode);

  useEffect(() => {
    Geocoder.init('AIzaSyBI-erIASkJmmIjkNGN0_EIsgBVPCSIxng', {language});
  }, []);

  const setPressedCoordinates = (c: LatLng) => {
    Geocoder.from(c,
    ).then(json => {
      const addressComponent = json.results[0].formatted_address;
      address[1](addressComponent);
      gpaRefState[0].current.setAddressText(addressComponent);
    })
      .catch(error => console.log(error));
    coordinates[1]({
      ...c,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

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
          onPress={({nativeEvent}) => setPressedCoordinates(nativeEvent.coordinate)}
          provider={PROVIDER_GOOGLE}
          customMapStyle={googleMapStyle}
          zoomEnabled={true}
          style={_s.map}
          pitchEnabled={true}
          rotateEnabled={true}
          scrollEnabled={true}
          region={coordinates[0]}
        >
          <UserLocationMarker coordinate={userLocation[0]} />
          <LocationMarker coordinate={coordinates[0]} />
        </MapView>
        <TouchableOpacity onPress={() => setPressedCoordinates(userLocation[0])} style={_s.userLocatioBtn}>
          <TargetWhite
            height={vs(45)}
            width={vs(45)}
          />
        </TouchableOpacity>
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
  userLocatioBtn: {
    position: 'absolute',
    left: 10,
    top: vs(160),
  }
});
