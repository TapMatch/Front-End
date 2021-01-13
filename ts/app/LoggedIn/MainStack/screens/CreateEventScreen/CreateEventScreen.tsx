import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {NavigationAction, useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Header from './components/Header/Header';
import FormWindow from './components/FormWindow/FormWindow';
import CreateBtn from './components/CreateBtn';
import googleMapStyle from "ts/constants/googleMapStyle.json";
import {createEvent} from './api/createEvent';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import YesNoModal from 'ts/app/common/components/YesNoModal';
import DeepLinkHandler from '../../components/DeepLinkHandler';
import LocationPickerMode from './components/LocationPickerMode/LocationPickerMode';

interface CreateEventScreenProps {
  navigation: any;
  route: any;
}

const CreateEventScreen = ({navigation, route}: CreateEventScreenProps) => {
  const isFocused = useIsFocused();
  const {selectedCommunityData, eventMarkers, upcomingEvents} = useContext(MainStackContext);

  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const description = useState<string>('');
  // const address = useState<string>('');
  // const coordinates = useState<LatLng>(userLocation[0]);
  const eventName = useState<string>('');
  const joinLimit = useState<number>(1);
  const dateTime = useState<Date>(new Date());
  const yesNoModalVisible = useState<boolean>(false);

  const addingLocationOn = useState<boolean>(false);

  const coordinates = useState<any>({
    ...userLocation[0], latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const address = useState<string>('');

  const renderContent = () => {
    if (addingLocationOn[0]) {
      return <LocationPickerMode />;
    } else {
      return (
        <View style={[_s.container]}>
          <Header />
          <FormWindow />
          <CreateBtn disabled={eventName[0].length === 0 || address[0].length === 0 || description[0].length === 0}
            onPress={() => {
              navigation.goBack();
              createEvent({
                eventMarkers,
                upcomingEvents,
                communityId: selectedCommunityData[0].id,
                userToken: userToken[0],
                coordinates: coordinates[0],
                address: address[0],
                description: description[0],
                join_limit: joinLimit[0],
                date: dateTime[0],
                name: eventName[0],
              }).then(() => {
                description[1]('');
                address[1]('');
                eventName[1]('');
                joinLimit[1](1);
                dateTime[1](new Date());
                coordinates[1](userLocation[0]);
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
            initialRegion={{
              ...userLocation[0],
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
          <YesNoModal
            onYesPress={navigation.goBack}
            modalVisible={yesNoModalVisible}
            subtitle={'Note that If you quit,\nno draft Will be saved'}
            title={'Are you sure\nYou want to\nleave create?'}
          />
        </View>
      );
    }
  };
  if (isFocused) {
    return (
      <CreateEventScreenContext.Provider value={{
        description, joinLimit, dateTime, addingLocationOn,
        eventName, address, coordinates, yesNoModalVisible
      }}>
        <DeepLinkHandler navigation={navigation} route={route}>
          <StatusBar
            animated={true}
            backgroundColor={_c.smoke}
            barStyle={'dark-content'}
          />
          {renderContent()}
        </DeepLinkHandler>
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
