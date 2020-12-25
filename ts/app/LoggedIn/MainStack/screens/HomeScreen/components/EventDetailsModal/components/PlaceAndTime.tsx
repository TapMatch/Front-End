import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import openMap from 'react-native-open-maps';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import moment from 'moment';

interface PlaceAndTimeProps {
    eventJoinState: 'join' | 'full' | 'joined';
}

const PlaceAndTime = ({eventJoinState}: PlaceAndTimeProps) => {
    const {selectedMarkerData} = useContext(MainStackContext);
    const {address, datetime, coordinates} = selectedMarkerData[0];
    return (
        <View style={_s.container}>
            <TouchableOpacity onPress={() => openMap({
                // {latitude: 37.865101, longitude: -119.538330}
                ...coordinates,
                query: address
            })}>
                <Text numberOfLines={1} style={[_s.txt, _s.linkStyle]}>{address}</Text>
            </TouchableOpacity>
            {eventJoinState === 'join' && <Text numberOfLines={1} style={[_s.txt, _s.time]}>{moment(datetime.date).format('DD/MM/YYYY HH:mm')}</Text>}
        </View>
    );
};

export default PlaceAndTime;

const _s = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: '100%',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        maxWidth: '100%',
        fontSize: _fs.m,
        fontFamily: _f.regularAlt,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    time: {
        marginTop: 2,
        color: _c.black,
    },
    shadow: {
        shadowColor: _c.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    linkStyle: {
        textDecorationLine: 'underline',
        color: _c.linkBlue
    },
    paragraphTxt: {
        height: 'auto',
        width: '75%',
        color: _c.black,
        fontFamily: _f.regular,
        fontSize: _fs.l,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingBottom: '5%',
    },

});
