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
        {/* <NameInputView
          style={_s.NameInputView}
          pinCount={4}
          code={name[0]}
          onCodeChanged={name[1]}
          autoFocusOnLoad={true}
          codeInputFieldStyle={_s.underlineStyleBase}
          codeInputHighlightStyle={_s.underlineStyleHighLighted}
          onCodeFilled={(code: string) => {
            console.log(`SENDING CODE TO BACKEND andStart timer`);
          }}
        /> */}
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
  underlineStyleBase: {
    minWidth: '20%',
    height: '100%',
    borderWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: _c.grey,
    color: _c.black,
    fontFamily: _f.eRegular,
    fontSize: _fs.xxl,
  },
  underlineStyleHighLighted: {
    borderColor: _c.grey,
  },
  NameInputView: {
    height: '70%',
    flex: 1,
  },
});