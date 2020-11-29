import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import ContinueBtn from './components/ContinueBtn';
import {Marker} from 'react-native-maps';
import SwipeBackGuide from './components/SwipeBackGuide';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

interface MapDemoScreenProps {
  navigation: any;
}

const MapDemoScreen = ({navigation}: MapDemoScreenProps) => {
  const {top, bottom} = useSafeAreaInsets();
  const isFocused = useIsFocused();

  if (isFocused) {
    return (
      <View style={[_s.container, {paddingTop: top, paddingBottom: bottom}]}>
        <SwipeBackGuide />
        <MapView
          provider={PROVIDER_GOOGLE}
          zoomEnabled={false}
          style={_s.map}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {[{latlng: {latitude: 37.78825, longitude: -122.4324}}].map(
            (marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={'location'}
                description={'something interesting'}
              />
            ),
          )}
        </MapView>
        <ContinueBtn />
      </View>
    );
  } else {
    return null;
  }
};

export default MapDemoScreen;

const _s = StyleSheet.create({
  container: {
    paddingTop: 60,
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
