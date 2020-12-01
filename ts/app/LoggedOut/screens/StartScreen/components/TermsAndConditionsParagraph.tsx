import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {constants} from 'ts/constants/constants';
import {useNavigation} from '@react-navigation/native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';

interface TermsAndConditionsParagraphProps {}

const TermsAndConditionsParagraph = (
  props: TermsAndConditionsParagraphProps,
) => {
  const txt = useLocalizedTxt();
  const {navigate} = useNavigation();

  const formatLinks = (url: string) => {
    switch (url) {
      case constants.termsOfUseUrl_EN.trim():
        return txt.termsOfUse;
      case constants.privacyPolicy_EN.trim():
        return txt.privacyPolicy;
      default:
        return url;
    }
  };

  return (
    <View style={_s.container}>
      <Hyperlink
        linkStyle={_s.linkStyle}
        onPress={(url) => navigate('WebScreen', {url})}
        linkText={(url) => formatLinks(url)}>
        <Text
          numberOfLines={3}
          style={
            _s.paragraphTxt
          }>{`${txt.termsAndConditionsParagraph1}${constants.termsOfUseUrl_EN}${txt.termsAndConditionsParagraph2}${constants.privacyPolicy_EN}`}</Text>
      </Hyperlink>
    </View>
  );
};

export default TermsAndConditionsParagraph;

const _s = StyleSheet.create({
  container: {
    // backgroundColor: 'indigo',
    paddingVertical: '10%',
    width: '100%',
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkStyle: {
    textDecorationLine: 'underline',
  },
  paragraphTxt: {
    height: 'auto',
    width: '75%',
    color: _c.black,
    fontFamily: _f.regular,
    fontSize: _fs.l,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: '5%',
  },
});
