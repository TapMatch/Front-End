import React, {useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface NameInputProps {
  name: [string, (x: string) => void];
}

const NameInput = ({name}: NameInputProps) => {
  let nameInputRef = useRef();
  return (
    <View style={_s.container}>
      <TouchableOpacity onPress={() => {
        if (typeof nameInputRef.current.focus === 'function') {
          nameInputRef.current.focus();
        }
      }} activeOpacity={1} style={_s.inputContainer}>
        <TextInput
          ref={nameInputRef}
          autoCompleteType={'off'}
          autoCorrect={false}
          autoFocus={false}
          maxLength={12}
          style={_s.input}
          value={name[0]}
          onChangeText={name[1]}
        />
      </TouchableOpacity>
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
    justifyContent: 'center',
    marginHorizontal: '10%',
  },
  input: {
    height: '70%',
    width: '70%',
    overflow: 'visible',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 0,
    fontFamily: _f.eRegular,
    fontSize: _fs.xl,
  },
});
