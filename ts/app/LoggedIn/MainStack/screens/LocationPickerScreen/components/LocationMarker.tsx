import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import LocationPin from 'assets/svg/location-pin.svg'

interface LocationMarkerProps {
    coordinate: LatLng;
}

const LocationMarker = ({coordinate}: LocationMarkerProps) => {
    return (
        <Marker
            coordinate={coordinate}>
            <View style={_s.container}>
                <LocationPin height={50} width={50} />
            </View>
        </Marker>
    )
}

export default LocationMarker;

const _s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },



});
