import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar, Platform} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Header from './components/Header/Header';
import FormWindow from './components/FormWindow/FormWindow';
import CreateBtn from './components/CreateBtn';
import googleMapStyle from "ts/constants/googleMaps/googleMapsStyle2.json";
import {createEvent} from './api/createEvent';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import YesNoModal from 'ts/app/common/components/YesNoModal';
import DeepLinkHandler from '../../components/DeepLinkHandler';
import LocationPickerMode from './components/LocationPickerMode/LocationPickerMode';
import moment from 'moment';
import callAlert from 'ts/utils/callAlert';
import Geocoder from 'react-native-geocoding';
import NotificationHandler from '../../components/NotificationHandler';

interface CreateEventScreenProps {
  navigation: any;
  route: any;
}

const CreateEventScreen = ({navigation, route}: CreateEventScreenProps) => {
  const minDate = moment().add(1, 'hour').toDate();
  const isFocused = useIsFocused();
  const {
    selectedCommunityData, eventMarkers, upcomingEvents,
    selectedMarkerData, eventDetailsModalVisible
  } = useContext(MainStackContext);

  const {userLocation, userToken, userProfile, LoggedIn, user_has_passed_onboarding} = useContext(TapMatchContext);
  const description = useState<string>('');
  const eventName = useState<string>('');
  const joinLimit = useState<number>(1);
  const dateTime = useState<Date>(minDate);
  const yesNoModalVisible = useState<boolean>(false);

  const addingLocationOn = useState<boolean>(false);

  const gpaRefState = useState<any>();

  const coordinates = useState<any>({
    ...userLocation[0], latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const address = useState<string>('');

  const setPressedCoordinates = (c: LatLng) => {
    Geocoder.from(c,
    ).then(json => {
      const addressComponent = json.results[0].formatted_address;
      address[1](addressComponent);
    })
      .catch(error => console.log(error));
    coordinates[1]({
      ...c,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  useEffect(() => {
    setPressedCoordinates(userLocation[0]);
  }, []);

  const renderContent = () => {
    if (addingLocationOn[0]) {
      return <LocationPickerMode />;
    } else {
      return (
        <View style={[_s.container]}>
          <Header />
          <FormWindow />
          <CreateBtn disabled={
            eventName[0].length === 0 ||
            address[0].length === 0 ||
            description[0].length === 0
          }
            onPress={() => {

              if (Platform.OS === 'android') {
                const createBtnPressMoment = moment();
                const setTime = moment(dateTime[0]);
                const diff = setTime.diff(createBtnPressMoment, 'minutes');
                if (diff < 59) {
                  callAlert(undefined, `${setTime.format('DD-MM-YYYY HH:mm A')} is not a valis date!`);
                  return;
                }
              }

              createEvent({
                userProfile,
                eventMarkers,
                upcomingEvents,
                selectedMarkerData,
                eventDetailsModalVisible,
                communityId: selectedCommunityData[0].id,
                userToken: userToken[0],
                coordinates: coordinates[0],
                address: address[0],
                description: description[0],
                join_limit: joinLimit[0],
                date: dateTime[0],
                name: eventName[0],
                goBack: () => navigation.goBack(),
                LoggedIn,
                user_has_passed_onboarding
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
            region={coordinates[0]}
          />
          <YesNoModal
            onYesPress={navigation.goBack}
            modalVisible={yesNoModalVisible}
            subtitle={'Note that if you quit,\nno draft will be saved'}
            title={'Are you sure\nYou want to\nleave create?'}
          />
        </View>
      );
    }
  };
  if (isFocused) {
    return (
      <CreateEventScreenContext.Provider value={{
        description, joinLimit, dateTime, addingLocationOn, gpaRefState,
        eventName, address, coordinates, yesNoModalVisible
      }}>
        <DeepLinkHandler route={route}>
          <StatusBar
            animated={true}
            backgroundColor={_c.smoke}
            barStyle={'dark-content'}
          />
          {renderContent()}
          <NotificationHandler
            route={route}
          />
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
