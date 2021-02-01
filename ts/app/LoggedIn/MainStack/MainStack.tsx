import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import SecretScreen from './screens/SecretScreen';
import WebScreen from './screens/WebScreen/WebScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import FeedbackRequestScreen from './screens/FeedbackRequestScreen/FeedbackRequestScreen';
import CreateEventScreen from './screens/CreateEventScreen/CreateEventScreen';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {patchUserTimeZone} from '../../common/api/patchUserTimeZone';
import * as RNLocalize from "react-native-localize";
import Geocoder from 'react-native-geocoding';

export default function MainStack() {
  const {userProfile, userToken} = useContext(TapMatchContext);
  const selectedCommunityData = useState<any>(userProfile[0].communities[0][0]);
  // const selectedCommunityData = useState<any>({
  //   id: 0,
  //   name: '',
  // });
  const eventMarkers = useState<any>([]);
  const upcomingEvents = useState<any>([]);
  const selectedMarkerData = useState<any>({});
  const upcomingEventsListIsOpen = useState<boolean>(false);
  const eventDetailsModalVisible = useState<boolean>(false);


  const allCommunities = useState<any>([]);

  // for community modal
  const communitiesModalVisible = useState<boolean>(false);
  const communityCodeInputVisible = useState<boolean>(false);
  const communitySelectedForJoin = useState<any>({});


  const requestingEventDetailsInProcess = useState<boolean>(false);


  const Stack = createStackNavigator();
  const {Navigator, Screen} = Stack;
  const insets = Platform.OS === 'ios' ? {} : {safeAreaInsets: {top: 0}};

  const language = useState<string>(RNLocalize.getLocales()[0].languageCode);


  useEffect(() => {
    patchUserTimeZone({
      userToken
    });
  }, []);

  useEffect(() => {
    Geocoder.init('AIzaSyBI-erIASkJmmIjkNGN0_EIsgBVPCSIxng', {language});
  }, []);

  return (
    <MainStackContext.Provider value={{
      selectedCommunityData,
      upcomingEvents,
      requestingEventDetailsInProcess,
      communitySelectedForJoin,
      upcomingEventsListIsOpen,
      eventMarkers,
      selectedMarkerData,
      eventDetailsModalVisible,
      communitiesModalVisible,
      allCommunities,
      communityCodeInputVisible
    }}>
      <Navigator
        mode={'modal'}
        screenOptions={{
          headerTitleAllowFontScaling: false,
          headerBackAllowFontScaling: false,
          headerTitleAlign: 'center',
          // gestureEnabled: false,
          headerStyle: {
            elevation: 0,
            backgroundColor: _c.white,
            borderBottomColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          },
          ...insets,
        }}>
        <Screen
          name="Home"
          component={HomeScreen}
          options={() => {
            return {
              headerShown: false,
            };
          }}
        />

        <Screen
          name="FeedbackRequest"
          component={FeedbackRequestScreen}
          options={() => {
            return {
              headerTitle: '',
            };
          }}
        />

        <Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={() => {
            return {
              headerShown: false,
            };
          }}
        />

        <Screen
          name="WebScreen"
          component={WebScreen}
          options={() => {
            return {
              headerShown: false,
            };
          }}
        />

        <Screen
          name="SecretScreen"
          component={SecretScreen}
          options={{title: 'SecretScreen'}}
        />

      </Navigator>
    </MainStackContext.Provider>
  );
}
