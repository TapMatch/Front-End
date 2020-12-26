import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';

interface NameInputProps {
  name: [string, (x: string) => void];
}

const NameInput = ({name}: NameInputProps) => {
  return (
    <View style={_s.container}>
      <View style={_s.inputContainer}>
        <TextInput
          autoCompleteType={'off'}
          autoCorrect={false}
          autoFocus={false}
          maxLength={40}
          style={_s.input}
          value={name[0]}
          onChangeText={name[1]}
        />
      </View>
    </View>
  );
};

export default NameInput;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
    paddingTop: '15%',
  },
  inputContainer: {
    borderRadius: 4,
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: _c.greyLight,
    height: vs(55),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '10%',
  },
  input: {
    height: '70%',
    flex: 1,
    overflow: 'visible',
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingVertical: 0,
    fontFamily: _f.eRegular,
    fontSize: _fs.m,
  },
});
