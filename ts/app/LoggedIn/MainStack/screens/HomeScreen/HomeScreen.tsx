import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {LatLng} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Header from './components/Header/Header';
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';
import ProfileModal from './components/ProfileModal/ProfileModal';
import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';
import EventReminder from './components/EventReminder';
import EventDetailsModal from './components/EventDetailsModal/EventDetailsModal';
import TapMatchMap from './components/TapMatchMap/TapMatchMap';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

const HomeScreen = ({navigation, route}: HomeScreenProps) => {
  let _mapRef = useRef<any>()
  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const startingPoint: LatLng = {
    ...userLocation[0],
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }
  const isFocused = useIsFocused();
  const profileModalVisible = useState<boolean>(false);
  const eventDetailsModalVisible = useState<boolean>(false);
  const mapCoordinates = useState<LatLng>(startingPoint);

  useEffect(() => {
    if (profileModalVisible[0]) {
      eventDetailsModalVisible[1](false)
    }
  }, [profileModalVisible, eventDetailsModalVisible])

  const set_mapRef = (x: any) => _mapRef = x

  if (isFocused) {
    return (
      <HomeScreenContext.Provider
        value={{profileModalVisible, eventDetailsModalVisible, mapCoordinates}}>
        <View style={[_s.container]}>
          <StatusBar
            animated={true}
            backgroundColor={_c.smoke}
            barStyle={'dark-content'}
          />
          <Header />
          {!eventDetailsModalVisible[0] && <Fragment>
            <UpcomingEvents resetMap={() =>
              _mapRef?.animateToRegion(startingPoint)
            } />
            { /* <EventReminder /> */}
          </Fragment>}
          <TapMatchMap
            mapCoordinates={mapCoordinates}
            eventDetailsModalVisible={eventDetailsModalVisible}
            set_mapRef={set_mapRef}
          />
          <ProfileModal modalVisible={profileModalVisible} />
          <EventDetailsModal modalVisible={eventDetailsModalVisible} />
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

});
