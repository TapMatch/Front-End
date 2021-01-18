import React, {Fragment, useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, StatusBar, AppState} from 'react-native';
import {LatLng} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import StdHeader from './components/StdHeader/StdHeader';
import UpcomingEvents from './components/UpcomingEvents/UpcomingEvents';
import ProfileModal from './components/ProfileModal/ProfileModal';
import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';
// import EventReminder from './components/EventReminder';
import EventDetailsModal from './components/EventDetailsModal/EventDetailsModal';
import TapMatchMap from './components/TapMatchMap/TapMatchMap';
import EventManageHeader from './components/EventManageHeader/EventManageHeader';
import YesNoModal from 'ts/app/common/components/YesNoModal';
import EventDetailsHeader from './components/EventDetailsHeader/EventDetailsHeader';
import CommunitiesModal from './components/CommunitiesModal/CommunitiesModal';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {deleteEvent} from './api/deleteEvent';
import {leaveEvent} from './api/leaveEvent';
import {getUpcomingEvents} from 'ts/app/common/api/getUpcomingEvents';
import DeepLinkHandler from '../../components/DeepLinkHandler';
import cities from 'ts/constants/cities';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

const HomeScreen = ({navigation, route}: HomeScreenProps) => {
  let _mapRef = useRef<any>(null);
  const set_mapRef = (x: any) => _mapRef = x;

  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const {
    selectedCommunityData, eventDetailsModalVisible,
    eventMarkers, selectedMarkerData, upcomingEvents,
    communitiesModalVisible
  } = useContext(MainStackContext);

  const startingPoint: LatLng = {
    ...userLocation[0],
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  const isFocused = useIsFocused();
  const profileModalVisible = useState<boolean>(false);
  const yesNoModalVisible = useState<boolean>(false);
  const yesNoModalMode = useState<'delete_event' | 'leave_event'>('leave_event');
  const eventJoinState = useState<'join' | 'full' | 'joined'>('join');
  const mapCoordinates = useState<LatLng>(startingPoint);
  const hasJoinedCurrentSelectedEvent = useState<boolean>(false);
  const currentUserIsOrganizer = useState<boolean>(false);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (profileModalVisible[0] || communitiesModalVisible[0]) {
      closeAllWhiteModalWindows();
    }
  }, [profileModalVisible, eventDetailsModalVisible, communitiesModalVisible]);

  useEffect(() => {
    if (Object.keys(selectedMarkerData[0]).length) {
      currentUserIsOrganizer[1](userProfile[0].id === selectedMarkerData[0].organizer.id);
    }
  }, [selectedMarkerData]);

  useEffect(() => {
    if (eventDetailsModalVisible[0]) {
      eventJoinState[1](defineJoinState());
    }

  }, [eventDetailsModalVisible]);

  useEffect(() => {
    if (selectedMarkerData[0].coordinates) {
      focusMapToLatLng(selectedMarkerData[0].coordinates);
    }
  }, [selectedMarkerData[0].id]);

  useEffect(() => {
    if (selectedCommunityData[0].name) {
      if (selectedCommunityData[0].name === 'Open World') {
        focusMapToLatLng({
          ...userLocation[0],
          latitudeDelta: 0.100,
          longitudeDelta: 0.0121,
        });
      } else {
        const city: any = cities.find((el: any) => el.name === selectedCommunityData[0].city);
        if (city) {
          focusMapToLatLng({
            ...city.latlng,
            latitudeDelta: 0.100,
            longitudeDelta: 0.0121,
          });
        }

      }
    }
  }, [selectedCommunityData[0].id]);

  useEffect(() => {
    getMarkers();
  }, [selectedCommunityData[0].id]);

  useEffect(() => {
    const ind = userProfile[0].events.findIndex((el: any) => el.id === selectedMarkerData[0].id);
    const hasJoined = ind > -1;
    hasJoinedCurrentSelectedEvent[1](hasJoined);
  }, [selectedMarkerData, userProfile[0].events, eventDetailsModalVisible]);

  const _handleAppStateChange = (appState: string) => {
    if (appState === 'background') {
      getUpcomingEvents({
        communityId: selectedCommunityData[0].id,
        userToken: userToken[0],
        upcomingEvents
      });
      getEventMarkers({
        id: selectedCommunityData[0].id,
        userToken: userToken[0],
        eventMarkers
      });
    }
  };

  const closeAllWhiteModalWindows = () => {
    if (eventDetailsModalVisible[0]) {
      eventDetailsModalVisible[1](false);
    }
  };

  const renderCommandsAndReminders = () => {
    if (eventDetailsModalVisible[0]) {
      return null;
    } else {
      return (
        <Fragment>
          <UpcomingEvents focusMapToLatLng={focusMapToLatLng} eventDetailsModalVisible={eventDetailsModalVisible} resetMap={() => {
            closeAllWhiteModalWindows();
            getMarkers();
            focusMapToLatLng(startingPoint);
          }} />
          { /* <EventReminder /> */}
        </Fragment>);
    }
  };

  const focusMapToLatLng = (x: LatLng) => {
    return typeof _mapRef?.animateToRegion === 'function' ? _mapRef?.animateToRegion(x) : null;
  };

  const defineYesNoModalProps = () => {
    switch (yesNoModalMode[0]) {
      case 'delete_event':
        return ({
          onNoPress: () => console.log('onNoPress -delete'),
          onYesPress: () => deleteEvent({
            eventDetailsModalVisible,
            currentUserIsOrganizer: currentUserIsOrganizer[0],
            selectedCommunityData: selectedCommunityData,
            userToken: userToken[0],
            selectedMarkerData,
            eventMarkers,
            userProfile
          }),
          title: 'Are you sure\nYou want to\nDelete this event?',
          modalVisible: yesNoModalVisible
        });
      case 'leave_event':
        return ({
          onYesPress: () =>
            leaveEvent({
              userProfile,
              eventDetailsModalVisible,
              selectedCommunityData: selectedCommunityData,
              userToken: userToken[0],
              selectedMarkerData,
              eventMarkers
            }),
          title: 'Are you sure\nYou want to\nleave this event?',
          modalVisible: yesNoModalVisible
        });
      default:
        return ({
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
      if (eventDetailsModalVisible[0] && Object.keys(selectedMarkerData[0]).length) {
        if (currentUserIsOrganizer[0]) {//am watching my event
          return <EventManageHeader setupDeleteEventUI={() => setupDeleteEventUI()} eventDetailsModalVisible={eventDetailsModalVisible} />;
        } else {
          if (hasJoinedCurrentSelectedEvent[0]) {
            return <EventDetailsHeader setupLeaveEventUI={() => setupLeaveEventUI()} eventDetailsModalVisible={eventDetailsModalVisible} />;
          } else {
            return <StdHeader />;
          }
        }
      } else {
        return <StdHeader />;
      }
    } else {
      return null;
    }
  };

  const getMarkers = () => getEventMarkers({
    userToken: userToken[0],
    id: selectedCommunityData[0].id,
    eventMarkers
  });

  const defineJoinState = () => {
    const {join_limit, members} = selectedMarkerData[0];
    if (members) {
      if (join_limit === members.length) {
        return 'full';
      } else {
        return hasJoinedCurrentSelectedEvent[0] ? 'joined' : 'join';
      }
    } else {
      return 'join';
    }
  };

  if (isFocused) {
    return (
      <HomeScreenContext.Provider
        value={{
          profileModalVisible,
          currentUserIsOrganizer,
          eventDetailsModalVisible,
          mapCoordinates,
          communitiesModalVisible
        }}>
        <View style={[_s.container]}>
          <StatusBar
            animated={true}
            backgroundColor={_c.smoke}
            barStyle={'dark-content'}
          />
          {!yesNoModalVisible[0] && renderHeader()}
          {!yesNoModalVisible[0] && renderCommandsAndReminders()}
          <TapMatchMap
            eventMarkers={eventMarkers}
            mapCoordinates={mapCoordinates}
            eventDetailsModalVisible={eventDetailsModalVisible}
            set_mapRef={set_mapRef}
          />
          {!yesNoModalVisible[0] &&
            <Fragment>
              <ProfileModal modalVisible={profileModalVisible} />
              <EventDetailsModal
                eventJoinState={eventJoinState[0]}
                modalVisible={eventDetailsModalVisible}
              />
              <CommunitiesModal selectedCommunityData={selectedCommunityData} />
            </Fragment>}
          <YesNoModal
            {...defineYesNoModalProps()}
          />
          <DeepLinkHandler
            focusMapToLatLng={focusMapToLatLng}
            eventDetailsModalVisible={eventDetailsModalVisible}
            navigation={navigation}
            route={route}
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
