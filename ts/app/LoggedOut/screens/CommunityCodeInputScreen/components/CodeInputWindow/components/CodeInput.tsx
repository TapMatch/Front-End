import React from 'react';
import {View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';

interface CodeInputProps {
  code: [string, (x: string) => void];
}

const CodeInput = ({code}: CodeInputProps) => {
  return (
    <View style={_s.container}>
      <View style={_s.inputContainer}>
        <OTPInputView
          style={_s.CodeInputView}
          pinCount={5}
          code={code[0]}
          onCodeChanged={code[1]}
          autoFocusOnLoad={true}
          codeInputFieldStyle={_s.underlineStyleBase}
          codeInputHighlightStyle={_s.underlineStyleHighLighted}
          onCodeFilled={(code: string) => {
            console.log(`SENDING CODE TO BACKEND andStart timer`);
          }}
        />
      </View>
    </View>
  );
};

export default CodeInput;

const _s = StyleSheet.create({
  container: {
    minWidth: '100%',
  },
  inputContainer: {
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: _c.greyLight,
    height: vs(55),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: _fs.xs,
    paddingHorizontal: '3%',
  },
  underlineStyleBase: {
    height: '100%',
    borderWidth: 0,
    borderBottomWidth: 0,
    borderColor: _c.grey,
    color: _c.black,
    fontFamily: _f.eRegular,
    fontSize: _fs.xxl,
  },
  underlineStyleHighLighted: {
    borderColor: _c.grey,
  },
  CodeInputView: {
    height: '70%',
    flex: 1,
  },
});
