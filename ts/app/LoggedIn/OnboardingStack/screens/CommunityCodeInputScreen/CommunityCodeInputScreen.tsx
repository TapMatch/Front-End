import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import CodeInputWindow from './components/CodeInputWindow/CodeInputWindow';
import SuccessMsgWindow from './components/SuccessMsgWindow';
import {CommunityCodeInputScreenContext} from 'ts/app/contexts/CommunityCodeInputScreenContext';
import {joinCommunity} from './api/joinCommunity';
import googleMapStyle from "ts/constants/googleMapStyle.json";

interface CommunitiesScreenProps {
  navigation: any;
  route: any;
}

const CommunityCodeInputScreen = ({
  navigation,
  route,
}: CommunitiesScreenProps) => {
  const {top} = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const {userLocation} = useContext(TapMatchContext);
  const windowState = useState<boolean>(!route.params.is_open);
  const coordinates = userLocation[0];
  const {userProfile, userToken} = useContext(TapMatchContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params.is_open) {
        joinCommunity({
          userProfile,
          communityId: route.params.community.id,
          userToken: userToken[0],
          windowState,
        });
      }
    });
    return unsubscribe;
  }, []);

  const renderWindow = () => {
    return windowState[0] ? (
      <CodeInputWindow community={route.params.community} />
    ) : (
        <SuccessMsgWindow community={route.params.community} />
      );
  };
  if (isFocused) {
    return (
      <CommunityCodeInputScreenContext.Provider value={{windowState}}>
        <View style={[_s.container]}>
          <View style={[_s.content, {paddingTop: 60 + top}]}>
            {renderWindow()}
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            customMapStyle={googleMapStyle}
            zoomEnabled={false}
            style={_s.map}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            region={{
              ...coordinates,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        </View>
      </CommunityCodeInputScreenContext.Provider>
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
