import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
import {add} from 'react-native-reanimated';

interface SearchInputProps {
}

// const locale = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale ||
//   NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier

const SearchInput = (props: SearchInputProps) => {
  let _gpaRef = useRef();
  const {coordinates, address, gpaRefState} = useContext(CreateEventScreenContext);
  const {width, height} = useDimensions().screen;
  const {keyboardHeight} = useKeyboard();
  const language = useState<string>(RNLocalize.getLocales()[0].languageCode);

  useEffect(() => {
    gpaRefState[1](_gpaRef);
  });

  return (
    <View style={_s.container}>
      <SearchBlack
        style={{marginHorizontal: 5}}
        height={_fs.l}
        width={_fs.xl}
      />
      <GooglePlacesAutocomplete
        ref={_gpaRef}
        onFail={(e) => console.log(e)}
        minLength={3}
        numberOfLines={1}
        autoFillOnNotFound={true}
        enablePoweredByContainer={false}
        fetchDetails={true}
        listViewDisplayed={true}
        styles={{
          textInput: _s.textInput,
          listView: {
            backgroundColor: _c.white,
            position: 'absolute',
            top: vs(49),
            left: -width * 0.19,
            maxHeight: height - keyboardHeight - vs(49) - 180,
            minWidth: width,
            zIndex: 500000
          },
        }}
        placeholder={''}
        onPress={(data, details: any = null) => {
          const {formatted_address, geometry} = details;
          address[1](formatted_address);
          coordinates[1]({
            longitude: geometry.location.lng,
            latitude: geometry.location.lat,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
        }}
        query={{
          key: 'AIzaSyBI-erIASkJmmIjkNGN0_EIsgBVPCSIxng',
          language,
        }}
      // GoogleReverseGeocodingQuery={{
      //   region: `${coordinates[0].latitude},${coordinates[0].longitude}`,
      // }}
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
