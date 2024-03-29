import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {joinCommunity} from 'ts/app/common/api/joinCommunity';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {CommunityCodeInputContext} from 'ts/app/contexts/CommunityCodeInputContext';

interface CodeInputProps {
  code: [string, (x: string) => void];
  communityId: number;
  errorState: [boolean, (x: boolean) => void];
}

const CodeInput = ({code, communityId, errorState}: CodeInputProps) => {
  const {userProfile, userToken, LoggedIn, user_has_passed_onboarding} = useContext(TapMatchContext);
  const {windowState} = useContext(CommunityCodeInputContext);

  return (
    <View style={_s.container}>
      <View style={_s.inputContainer}>
        <OTPInputView
          style={_s.CodeInputView}
          pinCount={6}
          code={code[0]}
          onCodeChanged={(txt) => {
            code[1](txt);
            if (errorState[0]) {
              errorState[1](false);
            }
          }}
          autoFocusOnLoad={true}
          codeInputFieldStyle={_s.underlineStyleBase}
          codeInputHighlightStyle={_s.underlineStyleHighLighted}
          onCodeFilled={(code: string) => {
            joinCommunity({
              errorState,
              code,
              userProfile,
              communityId,
              userToken: userToken[0],
              windowState,
              LoggedIn,
              user_has_passed_onboarding
            });
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
    // marginHorizontal: _fs.xs,
    // paddingHorizontal: '3%',
  },
  underlineStyleBase: {
    paddingVertical: 0,
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
