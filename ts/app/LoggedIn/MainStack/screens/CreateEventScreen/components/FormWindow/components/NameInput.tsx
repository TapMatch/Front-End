import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, TextInput, Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {vs} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import capitalizeString from 'ts/utils/capitalizeString';
import {RFValue} from 'react-native-responsive-fontsize';

interface NameInputProps {
  eventName: [string, (x: string) => void];
}

const NameInput = ({eventName}: NameInputProps) => {
  const inputOnScreen = useState<boolean>(false);
  const nameInputRef = useRef(null);
  const renderInput = () => {
    if (inputOnScreen[0]) {
      return (
        <TextInput
          ref={nameInputRef}
          value={eventName[0]}
          onBlur={() => inputOnScreen[1](false)}
          textContentType={'none'}
          importantForAutofill={'no'}
          autoCapitalize={'none'}
          underlineColorAndroid={"transparent"}
          autoCompleteType={'off'}
          autoCorrect={false}
          keyboardType={Platform.OS === 'android' ? "visible-password" : 'default'}
          autoFocus={true}
          numberOfLines={1}
          contextMenuHidden={true}
          onChangeText={(txt) => eventName[1](capitalizeString(txt))}
          onEndEditing={() => eventName[1](eventName[0].trim())}
          maxLength={15}
          multiline={false}
          style={[_s.txt, _s.title, _s.input]}
        />);
    } else {
      return (
        <TouchableOpacity activeOpacity={1} onPress={() => inputOnScreen[1](true)}>
          <Text style={[_s.txt, _s.title]}>
            {eventName[0].length ? eventName[0] : 'Event Name'}
          </Text>
        </TouchableOpacity>);
    }
  };
  return (
    <TouchableOpacity style={[_s.container]} activeOpacity={1} onPress={() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
      inputOnScreen[1](true);
    }}>
      <View style={_s.txtContainer}>
        {renderInput()}
      </View>
    </TouchableOpacity>
  );
};

export default NameInput;

const _s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: vs(85),
    borderBottomColor: _c.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    marginBottom: 5,
    fontFamily: _f.bold,
    fontSize: _fs.x4l,
    color: _c.black,
  },
  txtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    overflow: 'visible',
    width: '100%',
    fontSize: RFValue(24.5),
    marginBottom: -RFValue(2)
  }
});
