import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';

interface UserLocationMarkerProps {
    coordinate: LatLng;
}

const UserLocationMarker = ({coordinate}: UserLocationMarkerProps) => {
    return (
        <Marker
            zIndex={-1000}
            coordinate={coordinate}>
            <View style={_s.container} />
        </Marker>
    );
};



export default UserLocationMarker;

const _s = StyleSheet.create({
    container: {
        height: 18,
        width: 18,
        backgroundColor: _c.linkBlue,
        borderRadius: 100,
        borderColor: _c.white,
        borderWidth: 3
    },



});
