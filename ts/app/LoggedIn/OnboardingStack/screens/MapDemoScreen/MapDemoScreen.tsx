import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import ContinueBtn from './components/ContinueBtn';
import BackBtn from './components/BackBtn';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import PeopleMarker from './components/PeopleMarker';
import googleMapStyle from "ts/constants/googleMapStyle.json";


interface MapDemoScreenProps {
  navigation: any;
  route: any;
}

const MapDemoScreen = ({navigation, route}: MapDemoScreenProps) => {
  const {base64} = route.params;
  const {top, bottom} = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const {userLocation} = useContext(TapMatchContext);
  const coordinates = userLocation[0];
  if (isFocused) {
    return (
      <View
        style={[_s.container, {paddingTop: 60 + top, paddingBottom: bottom}]}>
        <BackBtn />
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={googleMapStyle}
          // zoomEnabled={false}
          style={_s.map}
          // pitchEnabled={false}
          // rotateEnabled={false}
          // scrollEnabled={false}
          region={{
            ...coordinates,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <PeopleMarker coordinate={coordinates} base64={base64} />
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
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
