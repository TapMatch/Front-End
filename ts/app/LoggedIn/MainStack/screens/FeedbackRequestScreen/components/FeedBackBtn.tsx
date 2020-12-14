import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
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
    <View style={_s.container}>
      <TouchableOpacity
        onPress={() => navigate('WebScreen', {url: 'https://www.blender.org/'})}
        style={[_s.btn, _s.shadow]}>
        <Text style={_s.txt}>Send Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackBtn;

const _s = StyleSheet.create({
  container: {
    width: '100%',
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 20,
    height: vs(60),
    flexDirection: 'row',
    backgroundColor: _c.white,
    minWidth: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: _c.main_red,
    marginLeft: 5,
    fontFamily: _f.regularAlt,
    fontSize: _fs.xl,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  shadow: {
    shadowColor: _c.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
