import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useNavigation} from '@react-navigation/native';
import CaptionBubble from 'assets/svg/caption-bubble.svg';
interface FeedbackBtnProps {}

const FeedbackBtn = (props: FeedbackBtnProps) => {
  const {navigate} = useNavigation();
  const txt = useLocalizedTxt();

  return (
    <TouchableOpacity
      onPress={() => navigate('WebScreen', {url: 'https://www.blender.org/'})}
      style={_s.container}>
      <CaptionBubble height={_fs.m} width={_fs.m} />
      <Text style={_s.txt}>{txt.giveUsYourFeedback}</Text>
    </TouchableOpacity>
  );
};

export default FeedbackBtn;

const _s = StyleSheet.create({
  container: {
    marginTop: 15,
    borderRadius: 15,
    height: vs(45),
    flexDirection: 'row',
    backgroundColor: _c.main_red,
    minWidth: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: _c.black,
    marginLeft: 5,
    fontFamily: _f.regularAlt,
    fontSize: _fs.m,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
