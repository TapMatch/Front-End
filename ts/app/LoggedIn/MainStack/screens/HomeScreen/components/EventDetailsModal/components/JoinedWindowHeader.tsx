import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Share} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import shareContent from 'ts/app/common/serveces/shareContent';

interface HeaderProps {
    // eventJoinState: 'join' | 'full' | 'joined';
}

const JoinedWindowHeader = (props: HeaderProps) => {
    const {selectedMarkerData} = useContext(MainStackContext);
    const {name} = selectedMarkerData[0];

    return (
        <View style={_s.container}>
            <TouchableOpacity onPress={() => shareContent(selectedMarkerData[0])} style={_s.btn}>
                <View style={[_s.side]} />
                <View style={[_s.middle, _s.center]}>
                    <Text numberOfLines={1} style={_s.title}>Share</Text>
                    <Text numberOfLines={1} style={_s.title}>{name}</Text>
                </View>
                <View style={[_s.side, _s.center, _s.right]}>
                    <Image
                        style={_s.img}
                        resizeMode={'contain'}
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
        height: 90,
        minWidth: '100%',
        paddingHorizontal: '8%',
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: _c.white,
        borderRadius: 20,
        borderWidth: StyleSheet.hairlineWidth * 4,
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
        fontSize: _fs.xl,
        fontFamily: _f.eRegular,
        lineHeight: _fs.xl * 1.3,
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
