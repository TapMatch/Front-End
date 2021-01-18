import React, {useContext} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import FastImage from 'react-native-fast-image';

interface PeopleProps {}

const People = (props: PeopleProps) => {
    const {selectedMarkerData} = useContext(MainStackContext);
    const {members, organizer} = selectedMarkerData[0];

    if (!members.length) {
        return <View style={[_s.container, {height: 45}]} />;
    } else {
        return (
            <View style={_s.container}>
                {members.map(({id, name, avatar}: any) => {
                    if (id !== organizer.id) {
                        return (<View key={`people-${id}`}
                            style={_s.personContainer}>
                            <View style={[_s.avatarContainer, _s.shadow]}>
                                <FastImage
                                    style={_s.avatar}
                                    source={{
                                        uri: avatar
                                    }}
                                />
                            </View>
                            <Text numberOfLines={2} style={_s.txt}>{name}</Text>
                        </View>);
                    } else {
                        return null;
                    }
                })}
            </View>);
    }

};

export default People;

const _s = StyleSheet.create({
    container: {
        paddingTop: 7,
        height: 85,
        minWidth: '100%',
        flexDirection: 'row',
        backgroundColor: _c.invisible,
        justifyContent: 'space-evenly',
    },
    personContainer: {
        height: '100%',
        maxWidth: _fs.xxs * 12,
        alignItems: 'center',
        backgroundColor: _c.invisible
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 300,
        overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
        backgroundColor: _c.invisible,
        borderWidth: 5,
        borderColor: _c.white,
    },
    avatar: {
        borderRadius: 300,
        height: 40,
        width: 40,
    },
    txt: {
        maxWidth: '100%',
        marginTop: 2,
        fontSize: _fs.xxs,
        fontFamily: _f.regularAlt,
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
        elevation: 4,// 5
    },

});
