import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import shareContent from 'ts/app/common/serveces/shareContent';
import FastImage from 'react-native-fast-image';

interface HeaderProps {
}

const JoinedWindowHeader = (props: HeaderProps) => {
    const {selectedMarkerData, selectedCommunityData} = useContext(MainStackContext);
    const {name} = selectedMarkerData[0];

    return (
        <View style={_s.container}>
            <TouchableOpacity onPress={() => shareContent(selectedMarkerData[0], selectedCommunityData)} style={_s.btn}>
                <View style={[_s.side]} />
                <View style={[_s.middle, _s.center]}>
                    <Text numberOfLines={1} style={[_s.title, _s.share]}>Share</Text>
                    <Text numberOfLines={1} style={[_s.title, _s.eventName]}>{name}</Text>
                </View>
                <View style={[_s.side, _s.center, _s.right]}>
                    <FastImage
                        style={_s.img}
                        resizeMode={FastImage.resizeMode.contain}
                        source={require('assets/png/forward-black.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default JoinedWindowHeader;

const _s = StyleSheet.create({
    container: {
        height: '37%',
        minWidth: '100%',
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: _c.white,
        borderRadius: 20,
        borderWidth: StyleSheet.hairlineWidth * 8,
        borderStyle: 'dotted',
        borderColor: _c.main_red
    },
    side: {
        flex: 1,
        maxWidth: '15%',
    },
    middle: {
        flex: 1,
        maxWidth: '70%',
    },
    right: {
        paddingRight: 15
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: _fs.xl,
        width: _fs.xl,
    },
    title: {
        fontFamily: _f.regularAlt,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: _c.black,
    },
    share: {
        fontSize: _fs.xxl,
        lineHeight: _fs.x3l,
    },
    eventName: {
        marginTop: 8,
        fontSize: _fs.x8l,
        lineHeight: _fs.x9l,
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

});
