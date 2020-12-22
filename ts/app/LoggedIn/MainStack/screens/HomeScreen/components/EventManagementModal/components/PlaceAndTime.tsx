import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import openMap from 'react-native-open-maps';

interface PlaceAndTimeProps {
    joinState: 'join' | 'full' | 'joined';
}

const PlaceAndTime = ({joinState}: PlaceAndTimeProps) => {
    return (
        <View style={[_s.container, _s.center]}>
            <TouchableOpacity onPress={() => openMap({latitude: 37.865101, longitude: -119.538330})}>
                <Text numberOfLines={1} style={[_s.txt, _s.linkStyle]}>GeorgenStraße 4</Text>
            </TouchableOpacity>
            {joinState === 'join' && <Text numberOfLines={1} style={[_s.txt, _s.time]}>Tomorrow 10PM</Text>}
        </View>
    );
};

export default PlaceAndTime;

const _s = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: '100%',
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
