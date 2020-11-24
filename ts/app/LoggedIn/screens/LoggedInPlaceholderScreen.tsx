import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {RFValue} from 'react-native-responsive-fontsize';
import {WebView} from 'react-native-webview';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
interface LoggedInPlaceholderScreenProps {}

const LoggedInPlaceholderScreen = (props: LoggedInPlaceholderScreenProps) => {
  const {LoggedIn} = useContext(TapMatchContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
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
        </View>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Button title={'Log Out'} onPress={() => LoggedIn[1](false)} />
        </View>
        <Text style={{fontSize: RFValue(24, 580)}}>0101010101</Text>
        <WebView
          source={{uri: 'https://blender.org'}}
          style={{marginTop: 20, height: 200, width: '100%'}}
        />
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
