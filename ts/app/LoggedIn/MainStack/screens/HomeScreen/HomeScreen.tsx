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
import CommunitiesModal from './components/CommunitiesModal/CommunitiesModal';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

const HomeScreen = ({navigation, route}: HomeScreenProps) => {
  let _mapRef = useRef<any>(null);
  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const {selectedCommunityData, eventMarkers, selectedMarkerData} = useContext(MainStackContext);
  const startingPoint: LatLng = {
    ...userLocation[0],
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  console.log(userProfile, 'userProfile');
  const isFocused = useIsFocused();
  const profileModalVisible = useState<boolean>(false);
  const eventDetailsModalVisible = useState<boolean>(false);
  const yesNoModalVisible = useState<boolean>(false);
  const communitiesModalVisible = useState<boolean>(false);
  const yesNoModalMode = useState<'delete_event' | 'leave_event'>('leave_event');
  const mapCoordinates = useState<LatLng>(startingPoint);

  const closeAllWhiteModalWindows = () => {
    if (eventDetailsModalVisible[0]) {
      eventDetailsModalVisible[1](false);
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
  const focusMapToLatLng = (x: LatLng) => typeof _mapRef?.animateToRegion === 'function' ? _mapRef?.animateToRegion(x) : null;
  const defineYesNoModalProps = () => {
    switch (yesNoModalMode[0]) {
      case 'delete_event': return ({
        onNoPress: () => console.log('onNoPress -delete'),
        onYesPress: () => console.log('onYesPress'),
        title: 'Are you sure\nYou want to\nDelete this event?',
        modalVisible: yesNoModalVisible
      });
      case 'leave_event': return ({
        onNoPress: () => console.log('onNoPress -leave'),
        title: 'Are you sure\nYou want to\nleave this event?',
        modalVisible: yesNoModalVisible
      });
      default: return ({
        onNoPress: () => console.log('default'),
        title: 'default',
        modalVisible: yesNoModalVisible
      });
    }

  };

  const setupLeaveEventUI = () => {
    yesNoModalVisible[1](true);
    yesNoModalMode[1]('leave_event');
  };
  const setupDeleteEventUI = () => {
    yesNoModalVisible[1](true);
    yesNoModalMode[1]('delete_event');
  };

  const renderHeader = () => {
    if (!yesNoModalVisible[0]) {
      if (eventDetailsModalVisible[0] && Object.keys(selectedMarkerData[0])) {
        if (true) {//am watching my event
          return <EventManageHeader setupDeleteEventUI={() => setupDeleteEventUI()} eventDetailsModalVisible={eventDetailsModalVisible} />;
        } else {
          return <EventDetailsHeader setupLeaveEventUI={() => setupLeaveEventUI()} eventDetailsModalVisible={eventDetailsModalVisible} />;
        }
      } else {
        return <StdHeader />;
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (profileModalVisible[0] || communitiesModalVisible[0]) {
      closeAllWhiteModalWindows();
    }
  }, [profileModalVisible, eventDetailsModalVisible, communitiesModalVisible]);

  useEffect(() => {
    getEventMarkers({userToken: userToken[0], id: selectedCommunityData[0].id, eventMarkers});
  }, [selectedCommunityData]);

  if (isFocused) {
    return (
      <HomeScreenContext.Provider
        value={{profileModalVisible, selectedCommunityData, eventDetailsModalVisible, mapCoordinates, communitiesModalVisible}}>
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
          {!yesNoModalVisible[0] && <Fragment>
            <ProfileModal modalVisible={profileModalVisible} />
            <EventDetailsModal
              eventJoinState={'join'}
              modalVisible={eventDetailsModalVisible}
            />
            <CommunitiesModal selectedCommunityData={selectedCommunityData} modalVisible={communitiesModalVisible} />
          </Fragment>}
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
