import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import ContinueBtn from './components/ContinueBtn';
import SwipeBackGuide from './components/SwipeBackGuide';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import PeopleMarker from './components/PeopleMarker';
interface CommunitiesScreenProps {
  navigation: any;
  route: any;
}

const CommunitiesScreen = ({navigation, route}: CommunitiesScreenProps) => {
  const {top, bottom} = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const {userLocation} = useContext(TapMatchContext);
  const coordinates = userLocation[0];
  if (isFocused) {
    return (
      <View style={[_s.container, {paddingTop: top, paddingBottom: bottom}]}>
        <MapView
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          style={_s.map}
          // pitchEnabled={false}
          // rotateEnabled={false}
          // scrollEnabled={false}
          region={{
            ...coordinates,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
        <ContinueBtn />
      </View>
    );
  } else {
    return null;
  }
};

export default CommunitiesScreen;

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
