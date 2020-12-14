import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Header from './components/Header/Header';
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';
import ProfileModal from './components/ProfileModal/ProfileModal';
import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';
import EventReminder from './components/EventReminder';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

const HomeScreen = ({navigation, route}: HomeScreenProps) => {
  const isFocused = useIsFocused();
  const listIsOpen = useState<boolean>(false);
  const modalVisible = useState<boolean>(false);
  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const coordinates = userLocation[0];

  if (isFocused) {
    return (
      <HomeScreenContext.Provider value={{modalVisible}}>
        <View style={[_s.container]}>
          <StatusBar
            animated={true}
            backgroundColor={_c.smoke}
            barStyle={'dark-content'}
          />
          <Header />
          <UpcomingEvents listIsOpen={listIsOpen} />
          {/* <EventReminder /> */}

          {/* <View style={[_s.content, {paddingTop: 60 + top}]}></View> */}
          <MapView
            provider={PROVIDER_GOOGLE}
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
          <ProfileModal modalVisible={modalVisible} />
        </View>
      </HomeScreenContext.Provider>
    );
  } else {
    return null;
  }
};

export default HomeScreen;

const _s = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(50,30,150,0.2)',
  },

  content: {
    position: 'absolute',
    backgroundColor: _c.modalbackground,
    left: 0,
    bottom: 0,
    zIndex: 100,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
