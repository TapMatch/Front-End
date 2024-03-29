import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import RefreshCircleRed from 'assets/svg/refresh-circle-red.svg';
import TargetWhite from 'assets/svg/target-white.svg';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import ListItem from './components/ListItem';
import {getUpcomingEvents} from 'ts/app/common/api/getUpcomingEvents';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

interface UpcomingEventsProps {
  closeAllWhiteModalWindows: any;
  getMarkers: any;
  focusMapToLatLng: any;
  eventDetailsModalVisible: [boolean, (x: boolean) => void];
  startingPoint: any;
}

const iconSize = '75%';

const UpcomingEvents = ({
  closeAllWhiteModalWindows,
  eventDetailsModalVisible,
  focusMapToLatLng,
  startingPoint,
  getMarkers
}: UpcomingEventsProps) => {

  const locationPermission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const {upcomingEvents, selectedCommunityData, upcomingEventsListIsOpen, eventMarkers, selectedMarkerData, allCommunities} = useContext(MainStackContext);
  const {userToken, userLocation, LoggedIn, user_has_passed_onboarding, userProfile} = useContext(TapMatchContext);
  const locationFocusTrigger = useState<boolean>(false);
  // const txt = useLocalizedTxt();

  const renderList = () => {
    if (upcomingEventsListIsOpen[0]) {
      return (
        <View style={_s.listContainer}>
          {upcomingEvents[0].map((el: any, ind: number, arr: any) => (
            <ListItem
              onPress={(clickedItem: any) => {
                const clickedItemCommunity = allCommunities[0].find((el: any) => el.id === clickedItem.community_id);
                selectedCommunityData[1](clickedItemCommunity);
                // eventMarkers[1]([clickedItem, ...eventMarkers[0]]);
                selectedMarkerData[1](clickedItem);
                eventDetailsModalVisible[1](true);
                upcomingEventsListIsOpen[1](false);
                if (selectedMarkerData[0].coordinates) {
                  const {longitude, latitude} = selectedMarkerData[0].coordinates;
                  focusMapToLatLng({longitude, latitude});
                }
              }}
              item={el}
              key={`${ind}-addIDHereLater`}
              isLast={ind === arr.length - 1}
            />
          ))}
        </View>
      );
    } else {
      return null;
    }
  };
  const borderState = upcomingEventsListIsOpen[0]
    ? _s.eventListOpenerBorderOpen
    : _s.eventListOpenerBorderClosed;

  useEffect(() => {
    getUpcomingEvents({
      communityId: selectedCommunityData[0].id,
      userToken: userToken[0],
      upcomingEvents,
      LoggedIn,
      userProfile,
      user_has_passed_onboarding
    });
  }, [selectedCommunityData[0].id]);


  const setUserLocation = (x: string) => {
    if (x === 'granted') {
      handleGeolocation();
    } else {
      request(locationPermission).then((x) => {
        if (x === 'granted') {
          handleGeolocation();
        }
      });
    }
  };

  const handleGeolocation = () => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        // userLocation[1]({latitude, longitude});
        focusMapToLatLng({latitude, longitude});
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {
        forceRequestLocation: true,
        showLocationDialog: true,
        enableHighAccuracy: false,
        timeout: 150000,
        maximumAge: 10000
      },
    );
  };


  const switchToUserLocation = () => {
    closeAllWhiteModalWindows();
    getMarkers();
    focusMapToLatLng(userLocation[0]);
    check(locationPermission).then((x) => {
      setUserLocation(x);
    });
  };

  // useEffect(() => {
  //   if (locationFocusTrigger[0]) {
  //     focusMapToLatLng(userLocation[0]);
  //     locationFocusTrigger[1](false);
  //   } else {
  //     locationFocusTrigger[1](false);
  //   }
  // }, [locationFocusTrigger[0]]);

  return (
    <View pointerEvents={'box-none'} style={_s.container}>
      <TouchableOpacity onPress={switchToUserLocation} style={_s.side}>
        <TargetWhite
          height={iconSize}
          width={iconSize}
        />
      </TouchableOpacity>
      <View style={[_s.middle, {height: upcomingEventsListIsOpen[0] ? 'auto' : vs(60)}]}>
        {upcomingEvents[0].length > 0 &&
          <View style={_s.shadow}>
            <TouchableOpacity
              onPress={() => upcomingEvents[0].length ? upcomingEventsListIsOpen[1](!upcomingEventsListIsOpen[0]) : null}
              activeOpacity={1}
              style={[_s.eventListOpener, borderState]}>
              <Text style={_s.txt}>{`${upcomingEvents[0].length} ${upcomingEvents[0].length === 1 ? 'upcoming Event' : 'upcoming Events'}`}</Text>
            </TouchableOpacity>
            {renderList()}
          </View>}
      </View>
      <View pointerEvents={'box-none'} style={_s.side}>
        <TouchableOpacity style={_s.resetBtn} onPress={() => {
          getUpcomingEvents({
            communityId: selectedCommunityData[0].id,
            userToken: userToken[0],
            upcomingEvents,
            LoggedIn,
            userProfile,
            user_has_passed_onboarding
          });
          selectedMarkerData[1]({});
          getEventMarkers({
            id: selectedCommunityData[0].id,
            userToken: userToken[0],
            eventMarkers,
            LoggedIn,
            userProfile,
            user_has_passed_onboarding
          });
        }}>
          <RefreshCircleRed
            height={'100%'}
            width={'100%'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpcomingEvents;

const _s = StyleSheet.create({
  container: {
    height: 'auto',
    backgroundColor: _c.invisible,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'absolute',
    paddingHorizontal: '4%',
    paddingTop: 5,
    left: 0,
    top: vs(120),
    zIndex: 100,
    minWidth: '100%',
  },
  middle: {
    width: '70%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: '5%',
  },
  side: {
    height: vs(60),
    flex: 1,
    maxWidth: '15%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  eventListOpener: {
    height: vs(60) * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
    minWidth: '100%',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.black,
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
  },
  shadow: {
    shadowColor: _c.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listContainer: {
    minHeight: vs(60),
    height: 'auto',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
    minWidth: '100%',
  },
  eventListOpenerBorderClosed: {
    borderRadius: 25,
  },
  eventListOpenerBorderOpen: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: _c.grey,
  },
  resetBtn: {
    height: iconSize,
    width: iconSize,
    justifyContent: 'center',
    alignItems: 'center',
  }
});;
