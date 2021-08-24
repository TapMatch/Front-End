import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ChevronLeftBlack from 'assets/svg/chevron-left-black.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {useNavigation} from '@react-navigation/native';
import {formatHeight, formatWidth} from 'ts/utils/format-size';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LoggedOutScreens} from 'ts/constants/screens';

interface SwipeBackGuideProps {
  playVideo: boolean;
}

const iconSize = _fs.xxl * 1.8;

const SwipeBackGuide = ({playVideo}: SwipeBackGuideProps) => {
  const {top} = useSafeAreaInsets();
  const {navigate} = useNavigation();

  const onPress = () => {
    navigate(LoggedOutScreens.TutorialScreen, {playVideo: playVideo});
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[_s.container, {top: formatHeight(16) + top}]}>
      <ChevronLeftBlack height={iconSize} width={iconSize} />
    </TouchableOpacity>
  );
};

export default SwipeBackGuide;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    left: formatWidth(20),
  },
});
