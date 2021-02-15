import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import MapView from "react-native-map-clustering";
import {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import googleMapStyle from "ts/constants/googleMaps/googleMapsStyle2.json";
import PeopleMarker from './components/PeopleMarker';
import UserLocationMarker from './components/UserLocationMarker';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';

interface TapMatchMapProps {
    set_mapRef: any;
    mapCoordinates: [LatLng, (x: LatLng) => void];
    eventDetailsModalVisible: [boolean, (x: boolean) => void];
    eventMarkers: any;
}

const TapMatchMap = ({eventMarkers, set_mapRef, mapCoordinates, eventDetailsModalVisible}: TapMatchMapProps) => {
    const {userLocation, userToken, LoggedIn, userProfile, user_has_passed_onboarding} = useContext(TapMatchContext);
    const {selectedCommunityData, selectedMarkerData} = useContext(MainStackContext);
    // const mapKey = useState<number>(0);
    const mapReady = useState<boolean>(false);

    let _mapRef = useRef<any>(null);
    const hideUserLocation = useState<boolean>(false);

    // useEffect(() => {
    //     mapKey[1](mapKey[0] + 1);
    // }, [selectedMarkerData[0]]);

    const setUserLocationVisibility = async () => {
        const {zoom} = await _mapRef.getCamera();
        if (zoom < 14) {
            hideUserLocation[1](false);
        } else {
            hideUserLocation[1](true);
        }
    };

    return (
        <MapView
            // key={mapKey[0]}
            mapRef={(x) => {
                set_mapRef(x);
                _mapRef = x;
            }}
            onMapReady={() => {
                set_mapRef(_mapRef);
                getEventMarkers({
                    id: selectedCommunityData[0].id,
                    userToken: userToken[0],
                    eventMarkers,
                    LoggedIn,
                    userProfile,
                    user_has_passed_onboarding
                });
                setUserLocationVisibility();
                setTimeout(() => mapReady[1](true), 100);
            }}
            onPress={() => {
                if (eventDetailsModalVisible[0]) {
                    eventDetailsModalVisible[1](false);
                }
            }}
            onRegionChangeComplete={setUserLocationVisibility}
            provider={PROVIDER_GOOGLE}
            maxZoom={12}
            customMapStyle={googleMapStyle}
            zoomEnabled={true}
            style={_s.map}
            pitchEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            minPoints={1}
            initialRegion={{
                ...mapCoordinates[0],
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}>
            {eventMarkers[0].map((el: any) => {
                return <PeopleMarker
                    mapReady={mapReady}
                    key={`PeopleMarker-${el.id}-${el.name}-${el.joined}`}
                    item={el}
                    coordinate={el.coordinates}
                    eventDetailsModalVisible={eventDetailsModalVisible}
                />;
            })}
            {hideUserLocation[0] && <UserLocationMarker coordinate={userLocation[0]} />}
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
