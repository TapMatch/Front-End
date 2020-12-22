import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import googleMapStyle from "ts/constants/googleMapStyle.json";
import PeopleMarker from './components/PeopleMarker';
import UserLocationMarker from './components/UserLocationMarker';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
// import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';

interface TapMatchMapProps {
    set_mapRef: any;
    mapCoordinates: [LatLng, (x: LatLng) => void];
    eventDetailsModalVisible: [boolean, (x: boolean) => void];
    eventManagementModalVisible: [boolean, (x: boolean) => void]
}

const TapMatchMap = ({set_mapRef, eventManagementModalVisible, mapCoordinates, eventDetailsModalVisible}: TapMatchMapProps) => {
    const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
    // const {} = useContext(HomeScreenContext);

    return (
        <MapView
            ref={(x) => set_mapRef(x)}
            // onRegionChangeComplete={({latitude, longitude}) => mapCoordinates[1]({latitude, longitude})}
            onMapReady={() => {
                console.log('09090909090900')
            }}
            onPress={() => {
                if (eventDetailsModalVisible[0]) {
                    eventDetailsModalVisible[1](false)
                }
                if (eventManagementModalVisible[0]) {
                    eventManagementModalVisible[1](false)
                }
            }}
            provider={PROVIDER_GOOGLE}
            customMapStyle={googleMapStyle}
            zoomEnabled={true}
            style={_s.map}
            pitchEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            initialRegion={{
                ...mapCoordinates[0],
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}>
            <PeopleMarker
                coordinate={mapCoordinates[0]}
                eventDetailsModalVisible={eventDetailsModalVisible}
            />
            {/* <UserLocationMarker coordinate={userLocation[0]} /> */}
        </MapView>

    );
};

export default React.memo(TapMatchMap);

// function checkRenderCondition(oldProps: any, newProps: any) {
//     const hasChangedLat = oldProps.mapCoordinates[0].latitude !== newProps.mapCoordinates[0].latitude;
//     const hasChangedLong = oldProps.mapCoordinates[0].longitude !== newProps.mapCoordinates[0].longitude;
//     return hasChangedLat || hasChangedLong
// }

const _s = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});
