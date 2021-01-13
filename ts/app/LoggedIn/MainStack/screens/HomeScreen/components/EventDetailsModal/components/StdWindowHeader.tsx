import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import shareContent from 'ts/app/common/serveces/shareContent';
import FastImage from 'react-native-fast-image';

interface HeaderProps {
    eventJoinState: 'join' | 'full' | 'joined';
}

const StdWindowHeader = ({eventJoinState}: HeaderProps) => {
    const {selectedMarkerData} = useContext(MainStackContext);
    const {name} = selectedMarkerData[0];

    return (
        <View style={_s.container}>
            <View style={[_s.side]} />
            <View style={[_s.middle, _s.center]}>
                <Text numberOfLines={1} style={_s.title}>{name}</Text>
            </View>
            <View style={[_s.side, _s.center, _s.right]}>
                <TouchableOpacity onPress={() => shareContent(selectedMarkerData[0])} style={[_s.btn, _s.shadow, _s.center]}>
                    <FastImage
                        style={_s.img}
                        resizeMode={FastImage.resizeMode.contain}
                        source={require('assets/png/forward-black.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default StdWindowHeader;

const _s = StyleSheet.create({
    container: {
        height: 60,
        minWidth: '100%',
        flexDirection: 'row'
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
    btn: {
        height: _fs.xl + 15,
        width: _fs.xl + 15,
        backgroundColor: _c.white,
        borderRadius: 5,
    },
    title: {
        fontSize: _fs.x3l,
        fontFamily: _f.eRegular,
        lineHeight: _fs.xxl * 1.3,
        textAlign: 'center',
        textAlignVertical: 'center',
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

});
