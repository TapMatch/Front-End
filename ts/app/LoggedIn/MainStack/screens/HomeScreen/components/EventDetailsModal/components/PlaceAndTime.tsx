import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform, ToastAndroid} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import openMap from 'react-native-open-maps';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import moment from 'moment';
import makeDayWord from 'ts/utils/makeDayWord';
import Clipboard from '@react-native-community/clipboard';
import callAlert from 'ts/utils/callAlert';

interface PlaceAndTimeProps {
    eventJoinState: 'join' | 'full' | 'joined' | '';
}

const PlaceAndTime = ({eventJoinState}: PlaceAndTimeProps) => {
    const {selectedMarkerData} = useContext(MainStackContext);
    const {address, datetime, coordinates} = selectedMarkerData[0];
    return (
        <View style={_s.container}>
            <TouchableOpacity
                onLongPress={() => {
                    Clipboard.setString(address);
                    if (Platform.OS === 'ios') {
                        callAlert(undefined, 'Copied!');
                    } else {
                        ToastAndroid.showWithGravityAndOffset(
                            "Copied!",
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            0,
                            40
                        );
                    }
                }}
                onPress={() => openMap({
                    ...coordinates,
                    query: address
                })}>
                <Text numberOfLines={1} style={[_s.txt, _s.linkStyle]}>{address}</Text>
            </TouchableOpacity>
            {(eventJoinState === 'join' || eventJoinState === 'full') && <Text numberOfLines={1} style={[_s.txt, _s.time]}>{`${makeDayWord(datetime.date)} ${moment(datetime.date).format('HH:mm a')}`}</Text>}
        </View>
    );
};

export default PlaceAndTime;

const _s = StyleSheet.create({
    container: {
        flex: 0.8,
        minWidth: '100%',
        paddingHorizontal: '22%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        maxWidth: '100%',
        fontSize: _fs.l,
        fontFamily: _f.regularAlt,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    time: {
        marginTop: 3,
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
