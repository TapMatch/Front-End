import React, {useContext} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {useDimensions} from '@react-native-community/hooks';
import CodeInputWindow from './components/CodeInputWindow/CodeInputWindow';
import SuccessMsgWindow from './components/SuccessMsgWindow';

interface CommunitiesScreenProps {
  navigation: any;
  route: any;
}

const CommunityCodeInputScreen = ({
  navigation,
  route,
}: CommunitiesScreenProps) => {
  const {top, bottom} = useSafeAreaInsets();
  const {height} = useDimensions().screen;
  const isFocused = useIsFocused();
  const {userLocation} = useContext(TapMatchContext);
  const coordinates = userLocation[0];
  const renderWindow = () => {
    return true ? <CodeInputWindow /> : <SuccessMsgWindow />;
  };
  if (isFocused) {
    return (
      <View style={[_s.container]}>
        <View style={[_s.content, {paddingTop: 60 + top}]}>
          {renderWindow()}
        </View>
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
      </View>
    );
  } else {
    return null;
  }
};

export default CommunityCodeInputScreen;

const _s = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },

  middle: {
    minWidth: '100%',
    flex: 0.8,
  },
  bottom: {
    flex: 0.2,
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    backgroundColor: _c.modalbackground,
    left: 0,
    bottom: 0,
    zIndex: 100,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
