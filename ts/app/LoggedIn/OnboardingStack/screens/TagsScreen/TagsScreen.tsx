import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import StartBtn from './components/StartBtn';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {formatWidth} from 'ts/utils/format-size';
import BackBtn from './components/BackBtn';

interface TagsScreenProps {
  navigation: any;
}

const TagsScreen = ({navigation}: TagsScreenProps) => {
  const txt = useLocalizedTxt();

  return (
    <View style={_s.container}>
      <BackBtn />
      <StartBtn />
    </View>
  );
};

export default TagsScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
    width: formatWidth(300),
    paddingTop: formatWidth(56),
    paddingLeft: formatWidth(47),
    paddingRight: formatWidth(50),
    paddingBottom: formatWidth(56),
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _c.white,
  },
  txt: {
    color: _c.secondaryText,
    fontSize: _fs.xl,
    fontFamily: _f.bold,
    lineHeight: formatWidth(23),
  },
});
