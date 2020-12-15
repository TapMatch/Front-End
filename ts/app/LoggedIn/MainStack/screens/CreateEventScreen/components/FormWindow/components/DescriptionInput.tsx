import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {vs} from 'react-native-size-matters';
interface DescriptionInputProps {
  description: [string, (x: string) => void];
}

const DescriptionInput = ({description}: DescriptionInputProps) => {
  return (
    <View style={[_s.container]}>
      <Text style={_s.title}>Description</Text>
      <TextInput
        value={description[0]}
        textContentType={'none'}
        importantForAutofill={'no'}
        autoCapitalize={'none'}
        autoCompleteType={'off'}
        autoCorrect={false}
        autoFocus={false}
        contextMenuHidden={true}
        onChangeText={description[1]}
        multiline={true}
        style={_s.input}
      />
    </View>
  );
};

export default DescriptionInput;

const _s = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    minHeight: vs(100),
    height: 'auto',
    borderBottomColor: _c.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: '6%',
    paddingVertical: '4%',
  },
  input: {
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: _f.eRegular,
    lineHeight: _fs.l + 3,
    fontSize: _fs.l,
    color: _c.black,
    overflow: 'visible',
    paddingLeft: 5,
    minHeight: _fs.l + 3,
    height: 'auto',
    textAlign: 'left',
    textAlignVertical: 'center',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: _f.eRegular,
    fontSize: _fs.xl,
    color: _c.grey,
  },
});
