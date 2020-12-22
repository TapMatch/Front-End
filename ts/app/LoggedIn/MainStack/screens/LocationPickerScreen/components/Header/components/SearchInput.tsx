import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import SearchBlack from 'assets/svg/search-black.svg';
import {_c} from 'ts/UIConfig/colors';
import {vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {NativeModules} from 'react-native'
import * as RNLocalize from "react-native-localize";

interface SearchInputProps {
  searchString: [string, (x: string) => void];
}

// const locale = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale ||
//   NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier

const SearchInput = ({searchString}: SearchInputProps) => {
  const language = useState<string>(RNLocalize.getLocales()[0].languageCode)
  return (
    <View style={_s.container}>
      <SearchBlack
        style={{marginHorizontal: 5}}
        height={_fs.l}
        width={_fs.xl}
      />
      <GooglePlacesAutocomplete
        currentLocationLabel={'Current location'}
        autoFillOnNotFound={true}
        currentLocation={true}
        numberOfLines={1}
        fetchDetails={true}
        listViewDisplayed={true}
        styles={{
          textInput: _s.textInput
        }}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'all',
        }}
        placeholder=''
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: Platform.OS === 'ios' ? 'AIzaSyB53VDwI7HptVIC5M9lecKwi16MTu5vH5M' : 'AIzaSyDFaUgVps-c5tUyWCyQuod4wQs4OWw-zGQ',
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
