import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {vs} from 'react-native-size-matters';
import capitalizeString from 'ts/utils/capitalizeString';

interface DescriptionInputProps {
  description: [string, (x: string) => void];
}

const DescriptionInput = ({description}: DescriptionInputProps) => {
  const inputOnScreen = useState<boolean>(false);
  const descriptionInputRef = useRef();

  const renderInput = () => {
    if (inputOnScreen[0]) {
      return (
        <TextInput
          ref={descriptionInputRef}
          value={description[0]}
          onBlur={() => inputOnScreen[1](false)}
          textContentType={'none'}
          importantForAutofill={'no'}
          autoCapitalize={'sentences'}
          autoCompleteType={'off'}
          keyboardType={Platform.OS === 'android' ? "visible-password" : 'default'}
          autoCorrect={false}
          autoFocus={true}
          maxLength={30}
          contextMenuHidden={true}
          onChangeText={(txt) => description[1](capitalizeString(txt))}
          onEndEditing={() => description[1](description[0].trim())}
          multiline={false}
          style={_s.input}
        />);
    } else {
      return (
        <TouchableOpacity activeOpacity={1} onPress={() => {
          if (descriptionInputRef.current) {
            descriptionInputRef.current.focus();
          }
          inputOnScreen[1](true);
        }}>
          <Text style={_s.input}>
            {description[0].length ? description[0] : 'Description'}
          </Text>
        </TouchableOpacity>);
    }
  };
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => inputOnScreen[1](true)} style={[_s.container]}>
      {renderInput()}
    </TouchableOpacity>
  );
};

export default DescriptionInput;

const _s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: vs(85),
    height: 'auto',
    borderBottomColor: _c.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: '5%',
  },
  input: {
    paddingVertical: 0,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: _f.eRegular,
    lineHeight: _fs.l,
    fontSize: _fs.l,
    color: _c.black,
    overflow: 'visible',
    paddingLeft: 5,
    minHeight: _fs.l,
    height: 'auto',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
  },
});
