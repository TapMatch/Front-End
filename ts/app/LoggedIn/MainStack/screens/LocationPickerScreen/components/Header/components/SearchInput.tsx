import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchBlack from 'assets/svg/search-black.svg';
import {_c} from 'ts/UIConfig/colors';
import {vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {NativeModules} from 'react-native'
import * as RNLocalize from "react-native-localize";
import {useDimensions, useKeyboard} from '@react-native-community/hooks';
import {LocationPickerScreenContext} from 'ts/app/contexts/LocationPickerScreenContext';

interface SearchInputProps {
}

// const locale = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale ||
//   NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier

const SearchInput = (props: SearchInputProps) => {
  const {coordinates, address} = useContext(LocationPickerScreenContext);
  const {width, height} = useDimensions().screen;
  const {keyboardHeight} = useKeyboard();
  const language = useState<string>(RNLocalize.getLocales()[0].languageCode);
  return (
    <View style={_s.container}>
      <SearchBlack
        style={{marginHorizontal: 5}}
        height={_fs.l}
        width={_fs.xl}
      />
      <GooglePlacesAutocomplete
        onFail={(e) => console.log(e)}
        autoFillOnNotFound={true}
        enablePoweredByContainer={false}
        numberOfLines={1}
        fetchDetails={true}
        listViewDisplayed={false}
        styles={{
          textInput: _s.textInput,
          listView: {
            backgroundColor: _c.white,
            position: 'absolute',
            top: vs(49),
            left: -width * 0.19,
            maxHeight: height - keyboardHeight - vs(49) - 180,
            minWidth: width,
            zIndex: 1000000
          },
        }}
        placeholder=''
        onPress={(data, details: any = null) => {
          const {formatted_address, geometry} = details;
          address[1](formatted_address);
          coordinates[1]({
            longitude: geometry.location.long,
            latitude: geometry.location.lat,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
        }}
        query={{
          key: 'AIzaSyBI-erIASkJmmIjkNGN0_EIsgBVPCSIxng',
          language,
        }}
      />
    </View>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '5%',
  },
  textInput: {
    backgroundColor: _c.invisible,
    overflow: 'visible',
    paddingLeft: 5,
    height: '100%',
    minHeight: '60%',
    textAlign: 'left',
    textAlignVertical: 'center',
    flex: 1,
  },
  countryPickerTrigger: {
    height: '60%',
    paddingHorizontal: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },
  containerButtonStyle: {marginRight: 3},
});
