import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {LatLng} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import StdHeader from './components/StdHeader/StdHeader';
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';
import ProfileModal from './components/ProfileModal/ProfileModal';
import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';
import EventReminder from './components/EventReminder';
import EventDetailsModal from './components/EventDetailsModal/EventDetailsModal';
import TapMatchMap from './components/TapMatchMap/TapMatchMap';
import EventManageHeader from './components/EventManageHeader/EventManageHeader';
import YesNoModal from 'ts/app/common/components/YesNoModal';
import EventDetailsHeader from './components/EventDetailsHeader/EventDetailsHeader';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

const HomeScreen = ({navigation, route}: HomeScreenProps) => {
  let _mapRef = useRef<any>();
  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const startingPoint: LatLng = {
    ...userLocation[0],
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  const isFocused = useIsFocused();
  const profileModalVisible = useState<boolean>(false);
  const eventDetailsModalVisible = useState<boolean>(false);
  const yesNoModalVisible = useState<boolean>(false);
  const mapCoordinates = useState<LatLng>(startingPoint);
  const yesNoModalMode = useState<'delete_event' | 'leave_event' | 'cancel_create_event'>('leave_event');
  const selectedMarkerData = useState<any>({});
  const closeAllWhiteModalWindows = () => {
    if (eventDetailsModalVisible[0]) {
      eventDetailsModalVisible[1](false);
    }
  };
  const renderHeader = () => {
    if (eventDetailsModalVisible[0] && Object.keys(selectedMarkerData[0])) {
      if (false) {//am watching my event
        return <EventManageHeader eventDetailsModalVisible={eventDetailsModalVisible} />;
      } else {
        return <EventDetailsHeader eventDetailsModalVisible={eventDetailsModalVisible} />;
      }
    } else {
      return <StdHeader />;
    }
  };
  const renderCommandsAndReminders = () => {
    if (eventDetailsModalVisible[0]) {
      return null;
    } else {
      return <Fragment>
        <UpcomingEvents resetMap={() => {
          closeAllWhiteModalWindows();
          focusMapToLatLng(startingPoint);
        }} />
        { /* <EventReminder /> */}
      </Fragment>;
    }
  };
  const set_mapRef = (x: any) => _mapRef = x;
  const focusMapToLatLng = (x: LatLng) => _mapRef?.animateToRegion(x);
  const defineYesNoModalProps = () => {
    switch (yesNoModalMode[0]) {
      case 'delete_event': return ({
        onNoPress: () => console.log('onNoPress'),
        onYesPress: () => console.log('onYesPress'),
        title: 'sfsdfsdf',
        modalVisible: yesNoModalVisible
      });
      case 'cancel_create_event': return ({
        onNoPress: () => console.log('onNoPress'),
        onYesPress: () => console.log('onYesPress'),
        title: 'sfsdfsdf',
        modalVisible: yesNoModalVisible
      });
      case 'leave_event': return ({
        onNoPress: () => console.log('onNoPress'),
        onYesPress: () => console.log('onYesPress'),
        title: 'sfsdfsdf',
        modalVisible: yesNoModalVisible
      });
      default: return ({
        onNoPress: () => console.log('default'),
        onYesPress: () => console.log('default'),
        title: 'default',
        modalVisible: yesNoModalVisible
      });
    }

  };
  useEffect(() => {
    if (profileModalVisible[0]) {
      closeAllWhiteModalWindows();
    }
  }, [profileModalVisible, eventDetailsModalVisible]);

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
          {!yesNoModalVisible[0] && renderHeader()}
          {!yesNoModalVisible[0] && renderCommandsAndReminders()}
          <TapMatchMap
            focusMapToLatLng={focusMapToLatLng}
            mapCoordinates={mapCoordinates}
            eventDetailsModalVisible={eventDetailsModalVisible}
            set_mapRef={set_mapRef}
          />
          <ProfileModal modalVisible={profileModalVisible} />
          <EventDetailsModal
            eventJoinState={'join'}
            modalVisible={eventDetailsModalVisible}
          />
          <YesNoModal
            {...defineYesNoModalProps()}
          />
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
