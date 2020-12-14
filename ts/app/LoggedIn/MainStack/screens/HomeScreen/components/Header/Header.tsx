import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import AvatarBtn from './components/AvatarBtn';
import CommunityBtn from './components/CommunityBtn';
import AddEventBtn from './components/AddEventBtn';

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[_s.container, {paddingTop: top}]}>
      <View style={_s.left}>
        <AvatarBtn />
      </View>
      <View style={_s.middle}>
        <CommunityBtn />
      </View>
      <View style={_s.right}>
        <AddEventBtn />
      </View>
    </View>
  );
};

export default Header;

const _s = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    backgroundColor: _c.smoke,
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row',
    zIndex: 100,
    height: vs(120),
    minWidth: '100%',
  },
  left: {
    flex: 1,
    maxWidth: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
    maxWidth: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
    maxWidth: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
