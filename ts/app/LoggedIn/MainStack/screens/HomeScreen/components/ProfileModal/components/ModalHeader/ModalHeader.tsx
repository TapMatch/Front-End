import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import AvatarImg from './components/AvatarImg';

interface ModalHeaderProps {}

const ModalHeader = (props: ModalHeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[_s.container, {paddingTop: top}]}>
      <View style={_s.left}>
        <AvatarImg />
      </View>
    </View>
  );
};

export default ModalHeader;

const _s = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row',
    zIndex: 8,
    height: vs(120),
    minWidth: '100%',
  },
  left: {
    flex: 1,
    maxWidth: '15%',
    marginRight: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
