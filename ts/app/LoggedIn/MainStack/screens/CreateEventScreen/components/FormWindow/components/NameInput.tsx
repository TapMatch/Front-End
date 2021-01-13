import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {vs} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface NameInputProps {
  eventName: [string, (x: string) => void];
}

const NameInput = ({eventName}: NameInputProps) => {
  const inputOnScreen = useState<boolean>(false);

  const renderInput = () => {
    if (inputOnScreen[0]) {
      return (
        <TextInput
          value={eventName[0]}
          onBlur={() => inputOnScreen[1](false)}
          textContentType={'none'}
          importantForAutofill={'no'}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          autoFocus={true}
          numberOfLines={1}
          contextMenuHidden={true}
          onChangeText={eventName[1]}
          maxLength={12}
          multiline={false}
          style={[_s.txt, _s.title]}
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
    <View style={[_s.container]}>
      <View style={_s.txtContainer}>
        {renderInput()}
        {/* <Text style={[_s.txt, _s.eg]}>e.g. Beer Pong</Text> */}
      </View>
    </View>
  );
};

export default NameInput;

const _s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: vs(100),
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  eg: {
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
    color: _c.main_red,
  },
});
