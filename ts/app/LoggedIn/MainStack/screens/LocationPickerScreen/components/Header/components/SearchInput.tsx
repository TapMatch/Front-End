import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import SearchBlack from 'assets/svg/search-black.svg';
import {_c} from 'ts/UIConfig/colors';
import {s, vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';

interface SearchInputProps {
  searchString: [string, (x: string) => void];
}

const SearchInput = ({searchString}: SearchInputProps) => {
  return (
    <View style={_s.container}>
      <SearchBlack
        style={{marginHorizontal: 5}}
        height={_fs.l}
        width={_fs.xl}
      />
      <TextInput
        textContentType={'none'}
        importantForAutofill={'no'}
        autoCapitalize={'none'}
        autoCompleteType={'off'}
        autoCorrect={false}
        autoFocus={true}
        contextMenuHidden={true}
        onChangeText={searchString[1]}
        style={_s.input}
      />
    </View>
  );
};

export default SearchInput;

const _s = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: _c.greyLight,
    height: vs(35),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '5%',
  },
  input: {
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
