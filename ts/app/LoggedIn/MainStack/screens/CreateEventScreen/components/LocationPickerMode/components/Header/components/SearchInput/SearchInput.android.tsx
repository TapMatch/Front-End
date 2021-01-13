import React, {Fragment, useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchBlack from 'assets/svg/search-black.svg';
import {_c} from 'ts/UIConfig/colors';
import {vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AutocompleteModal from './components/AutocompleteModal';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
// import {NativeModules} from 'react-native'

interface SearchInputProps {
}

// const locale = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale ||
//   NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier

const SearchInput = (props: SearchInputProps) => {
    const {address} = useContext(CreateEventScreenContext);

    const modalVisible = useState<boolean>(false);
    return (
        <Fragment>
            <TouchableOpacity onPress={() => modalVisible[1](true)} style={_s.container}>
                <SearchBlack
                    style={{marginHorizontal: 5}}
                    height={_fs.l}
                    width={_fs.xl}
                />
                <View style={_s.textInputPlaceholderContainer} >
                    <Text numberOfLines={1} style={_s.placeholderTxt}>
                        {address[0]}
                    </Text>
                </View>
                <AutocompleteModal modalVisible={modalVisible} />
            </TouchableOpacity>
        </Fragment>
    );
};

export default SearchInput;

const _s = StyleSheet.create({
    container: {
        borderRadius: 4,
        backgroundColor: _c.greyLight,
        paddingHorizontal: 5,
        flexDirection: 'row',
        height: vs(35),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: '5%',
    },
    textInputPlaceholderContainer: {
        backgroundColor: _c.invisible,
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    placeholderTxt: {
        fontSize: _fs.l,
        fontFamily: _f.regularAltBold,
        // lineHeight: _fs.xxl * 1.3,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: _c.black,
    },
    containerButtonStyle: {marginRight: 3},
});
