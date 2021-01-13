import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useNavigation} from '@react-navigation/native';
import {constants} from 'ts/constants/constants';
interface RequestCommunityBtnProps {}

const RequestCommunityBtn = (props: RequestCommunityBtnProps) => {
  const {navigate} = useNavigation();
  const txt = useLocalizedTxt();

  return (
    <TouchableOpacity
      onPress={() => navigate('WebScreen', {url: constants.feedbackURL})}
      style={_s.container}>
      <View style={_s.circle} />
      <Text style={_s.txt}>{txt.requestACommunity}</Text>
    </TouchableOpacity>
  );
};

export default RequestCommunityBtn;

const _s = StyleSheet.create({
  container: {
    borderRadius: 15,
    height: vs(45),
    flexDirection: 'row',
    backgroundColor: _c.main_red,
    minWidth: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: _fs.m,
    height: _fs.m,
    borderRadius: 200,
    backgroundColor: _c.black,
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
