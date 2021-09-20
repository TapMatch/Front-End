import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { _c } from 'ts/UIConfig/colors';
import { _f } from 'ts/UIConfig/fonts';
import { _fs } from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import UsersIcon from 'assets/svg/users.svg';

interface TitleProps { }

const Title = (props: TitleProps) => {
    const txt = useLocalizedTxt();
    const iconSize = _fs.xxl * 1.4;

    return (
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <UsersIcon height={iconSize} width={iconSize} />
            <Text numberOfLines={1} style={_s.txt}>
                {txt.tappers}
            </Text>
        </View>
    );
};

export default Title;

const _s = StyleSheet.create({
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
});
