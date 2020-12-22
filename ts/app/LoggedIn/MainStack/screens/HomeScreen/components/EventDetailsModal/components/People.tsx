import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';

interface PeopleProps { }

const People = (props: PeopleProps) => {
    return (
        <View style={_s.container}>
            {[0, 1, 2, 3, 4].map((el) => <View key={`people-${el}`}
                style={[_s.avatarContainer, _s.shadow]}>
                <Image
                    resizeMode={'contain'}
                    style={_s.avatar}
                    source={{
                        uri:
                            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
                    }}
                />
                <Text numberOfLines={1} style={_s.txt}>Human {el}</Text>
            </View>)}
        </View>
    );
};

export default People;

const _s = StyleSheet.create({
    container: {
        height: 80,
        minWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    avatarContainer: {
        height: '100%',
        maxWidth: 50,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: _c.invisible
    },
    avatar: {
        borderRadius: 300,
        borderWidth: 5,
        borderColor: _c.white,
        height: 50,
        width: 50,
    },
    txt: {
        maxWidth: '100%',
        marginTop: 5,
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
        elevation: 5,
    },

});
