import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';

interface JoinSectionProps {
    eventJoinState: 'join' | 'full' | 'joined';
}

const JoinSection = ({eventJoinState}: JoinSectionProps) => {
    switch (eventJoinState) {
        case 'join': return (
            <View style={[_s.container, _s.center]}>
                <TouchableOpacity onPress={() => console.log('joininig event ...')} style={[_s.btn, _s.shadow, _s.center]}>
                    <Text numberOfLines={1} style={[_s.txt, _s.btnTxt]}>Join</Text>
                </TouchableOpacity>
            </View>
        );
        case 'full': return (
            <View style={[_s.container, _s.center]}>
                <View style={[_s.full, _s.center]}>
                    <Text numberOfLines={1} style={[_s.txt, _s.fullTitle]}>Full</Text>
                    <Text numberOfLines={1} style={[_s.txt, _s.fullTxt]}>Tap Faster Next Time 😉</Text>
                </View>
            </View>

        );
        case 'joined': return (
            <View style={[_s.container, _s.center, _s.joinedStateStyle]}>
                <CheckCircleRed height={_fs.xxl} width={_fs.xxl} />
                <Text numberOfLines={1} style={[_s.txt, _s.infoTxt]}>You and 12 others are going!</Text>
            </View>
        );
        default:
            return (
                <View style={[_s.container, _s.center]} />
            );
    }
};

export default JoinSection;

const _s = StyleSheet.create({
    container: {
        height: 55,
        minWidth: '100%',
    },
    btn: {
        width: '60%',
        minWidth: '60%',
        height: 50,
        backgroundColor: _c.main_red,
        borderRadius: 20
    },
    full: {
        width: '60%',
        minWidth: '60%',
        height: 50,
        backgroundColor: _c.greyLight,
        borderRadius: 20
    },
    btnTxt: {
        color: _c.white,
        fontSize: _fs.xl,
    },
    infoTxt: {
        color: _c.main_red,
        fontSize: _fs.l,
        marginLeft: 10
    },
    joinedStateStyle: {
        flexDirection: 'row',
        height: 'auto',
        paddingBottom: 5,
    },
    txt: {
        maxWidth: '100%',
        fontFamily: _f.regularAlt,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    fullTitle: {
        color: _c.black,
        fontSize: _fs.l,
    },
    fullTxt: {
        color: _c.black,
        fontSize: _fs.xs,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
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
