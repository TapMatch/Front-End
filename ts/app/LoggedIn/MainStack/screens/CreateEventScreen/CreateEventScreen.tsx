import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Header from './components/Header/Header';
import FormWindow from './components/FormWindow/FormWindow';
import CreateBtn from './components/CreateBtn';
import googleMapStyle from "ts/constants/googleMapStyle.json";
import {createEvent} from './api/createEvent';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';

interface CreateEventScreenProps {
  navigation: any;
  route: any;
}

const CreateEventScreen = ({navigation, route}: CreateEventScreenProps) => {
  const isFocused = useIsFocused();
  const {selectedCommunityData, eventMarkers} = useContext(MainStackContext);

  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const coordinates = userLocation[0];
  const description = useState<string>('');
  const address = useState<string>('');
  const evetnCoordinates = useState<LatLng>(userLocation[0]);
  const eventName = useState<string>('');
  const joinLimit = useState<number>(1);
  const dateTime = useState<Date>(new Date());

  if (isFocused) {
    return (
      <CreateEventScreenContext.Provider value={{description, joinLimit, dateTime, eventName}}>
        <View style={[_s.container]}>
          <StatusBar
            animated={true}
            backgroundColor={_c.smoke}
            barStyle={'dark-content'}
          />
          <Header />
          <FormWindow />
          <CreateBtn onPress={() => {
            navigation.goBack();
            createEvent({
              eventMarkers,
              communityId: selectedCommunityData[0].id,
              coordinates: evetnCoordinates[0],
              address: address[0],
              description: description[0],
              join_limit: joinLimit[0],
              date: dateTime[0],
              name: eventName[0],
              userToken: userToken[0]
            });
          }} />
          <MapView
            provider={PROVIDER_GOOGLE}
            customMapStyle={googleMapStyle}
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
        </View>
      </CreateEventScreenContext.Provider>
    );
  } else {
    return null;
  }
};

export default CreateEventScreen;

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
