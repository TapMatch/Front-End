import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import useLocalizedTxt, {
  formatLocalizedTxt,
} from 'ts/localization/useLocalizedTxt';
import {constants} from 'ts/constants/constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';

interface TermsAndConditionsParagraphProps {
  modalVisible: [boolean, (x: boolean) => void];
}

const TermsAndConditionsParagraph = () => {
  const txt = useLocalizedTxt();
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const formatLinks = (url: string) => {
    switch (url) {
      case constants.termsOfUseUrl_EN:
        return txt.termsOfUse;
      case constants.privacyPolicy_EN:
        return txt.privacyPolicy;
      default:
        return url;
    }
  };

  return (
    <View style={[_s.container, {opacity: isFocused ? 1 : 0}]}>
      <Hyperlink
        linkStyle={_s.linkStyle}
        onPress={(url) => {
          navigate('WebScreen', {url});
        }}
        linkText={(url) => formatLinks(url)}>
        <Text style={_s.paragraphTxt}>
          {formatLocalizedTxt(txt.acceptTermsAndPolicy, {
            terms: (key: string) => (
              <Text
                key={key}
                style={
                  _s.linkStyle
                }>{`${` ${constants.termsOfUseUrl_EN} `}`}</Text>
            ),
            policy: (key: string) => (
              <Text
                key={key}
                style={
                  _s.linkStyle
                }>{`${` ${constants.privacyPolicy_EN} `}`}</Text>
            ),
          })}
        </Text>
      </Hyperlink>
    </View>
  );
};

export default TermsAndConditionsParagraph;

const _s = StyleSheet.create({
  container: {},
  linkStyle: {
    textDecorationLine: 'underline',
  },
  paragraphTxt: {
    width: 267,
    color: _c.white,
    fontFamily: _f.regular,
    fontSize: _fs.l,
    textAlign: 'center',
  },
});
