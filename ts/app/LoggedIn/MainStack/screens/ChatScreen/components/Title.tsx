import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { _c } from 'ts/UIConfig/colors';
import { _f } from 'ts/UIConfig/fonts';
import { _fs } from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import CoolIcon from 'assets/svg/coolicon.svg';
import MuteVolume from 'assets/svg/volume-slash.svg';
import { useNavigation } from '@react-navigation/native';
import ArrowLeftBlack from 'assets/svg/arrow-left.svg';

interface TitleProps { }

const Title = (props: TitleProps) => {
    const txt = useLocalizedTxt();
    const iconSize = _fs.xxl * 1.8;
    const ic_Size = _fs.xxl * 1.0;

    const { goBack } = useNavigation();
    return (
        <View style={_s.flex_row}>
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={goBack}>
                <ArrowLeftBlack height={ic_Size} width={ic_Size} />
            </TouchableOpacity>
            <View style={[_s.shadow]}>
                <CoolIcon height={ic_Size} width={ic_Size} />
                <Text style={_s.txt_title} numberOfLines={1}>Basket ball at start</Text>
            </View>
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={goBack}>
                <MuteVolume height={iconSize} width={iconSize} />
            </TouchableOpacity>
        </View >
    );
};

export default Title;

const _s = StyleSheet.create({
    flex_row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    txt_title: {
        fontSize: _fs.m,
        marginLeft: 16,
        fontFamily: _f.bold
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    txt: {
        textAlign: 'center',
        alignSelf: "center",
        color: _c.black,
        marginLeft: 6,
        fontFamily: _f.regularAlt,
        fontSize: _fs.xl,
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
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(244, 243, 243, 0.4)",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16
    },
});
