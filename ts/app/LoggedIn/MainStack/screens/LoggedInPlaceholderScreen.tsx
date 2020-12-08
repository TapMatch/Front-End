import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import {request, PERMISSIONS} from 'react-native-permissions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {RFValue} from 'react-native-responsive-fontsize';
import {WebView} from 'react-native-webview';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import deleteUserToken from 'ts/tools/extensions/deleteUserToken';
import {restartApp} from 'ts/tools/extensions/restartApp';
interface LoggedInPlaceholderScreenProps {}

const LoggedInPlaceholderScreen = (props: LoggedInPlaceholderScreenProps) => {
  const {
    LoggedIn,
    userProfile,
    userToken,
    user_has_passed_onboarding,
  } = useContext(TapMatchContext);
  // useEffect(() => {
  //   const location =
  //     Platform.OS === 'ios'
  //       ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //       : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  //   request(location).then((x) => {
  //     if (x === 'granted') {
  //       Geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log(position);
  //         },
  //         (error) => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     }
  //   });
  // }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {/* <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            zoomEnabled={true}
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}></MapView>
        </View> */}
        <View style={{flex: 1, backgroundColor: 'red', marginVertical: 150}}>
          <Button
            title={'Log Out and reset app'}
            onPress={() => {
              restartApp({
                userProfile,
                userToken: userToken[0],
                LoggedIn,
                user_has_passed_onboarding,
              });
            }}
          />
        </View>
        {/* <Text style={{fontSize: RFValue(24, 580)}}>0101010101</Text>
        <WebView
          source={{uri: 'https://blender.org'}}
          style={{marginTop: 20, height: 200, width: '100%'}}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoggedInPlaceholderScreen;

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 200,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
