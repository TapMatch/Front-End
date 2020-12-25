import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {joinEvent} from '../../../api/joinEvent';
import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';

interface JoinSectionProps {
    eventJoinState: 'join' | 'full' | 'joined';
}

const JoinSection = ({eventJoinState}: JoinSectionProps) => {
    const {eventMarkers, selectedMarkerData} = useContext(MainStackContext);
    const {currentUserIsOrganizer} = useContext(HomeScreenContext);
    const {userToken} = useContext(TapMatchContext);
    const {id, members} = selectedMarkerData[0];
    const defineMessage = () => {
        if (currentUserIsOrganizer[0]) {
            if (members.length) {
                return `You and ${members.length} others are going!`;
            } else {
                return `You and are going!`;
            }
        } else {
            if (members.length - 1) {

                return `You and ${members.length - 1} others are going!`;
            } else {
                return `You and are going!`;
            }
        }
    };

    if (currentUserIsOrganizer[0]) {
        return <View style={[_s.container, _s.center, _s.joinedStateStyle]}>
            <CheckCircleRed height={_fs.xxl} width={_fs.xxl} />
            <Text numberOfLines={1} style={[_s.txt, _s.infoTxt]}>{defineMessage()}</Text>
        </View>;
    } else {
        switch (eventJoinState) {
            case 'join': return (
                <View style={[_s.container, _s.center]}>
                    <TouchableOpacity onPress={() => joinEvent({
                        communityId: id,
                        userToken: userToken[0],
                        eventMarkers,
                        selectedMarkerData
                    })} style={[_s.btn, _s.shadow, _s.center]}>
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
                    <Text numberOfLines={1} style={[_s.txt, _s.infoTxt]}>{defineMessage()}</Text>
                </View>
            );
            default:
                return (
                    <View style={[_s.container, _s.center]} />
                );
        }
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
