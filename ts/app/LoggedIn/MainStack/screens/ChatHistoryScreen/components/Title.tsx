import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import ChatIcon from 'assets/svg/chat.svg';
import {useNavigation} from '@react-navigation/native';
import ArrowLeftBlack from 'assets/svg/arrow-left.svg';

interface TitleProps {}

const Title = (props: TitleProps) => {
  const txt = useLocalizedTxt();
  const iconSize = _fs.xxl * 1.4;
  const {goBack} = useNavigation();
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <TouchableOpacity onPress={goBack}>
        <ArrowLeftBlack height={iconSize} width={iconSize} />
      </TouchableOpacity>
      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
        <ChatIcon height={iconSize} width={iconSize} />
        <Text numberOfLines={1} style={_s.txt}>
          {txt.chats}
        </Text>
      </View>
      <View style={{width: iconSize}} />
    </View>
  );
};

export default Title;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txt: {
    textAlign: 'center',
    alignSelf: 'center',
    color: _c.black,
    marginLeft: 6,
    fontFamily: _f.regularAlt,
    fontSize: _fs.xl,
  },
});
