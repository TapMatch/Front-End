import React, {Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import Title from './components/Title';
import AddEventBtn from './components/CloseBtn';
import BlackGradient from 'ts/app/common/components/BlackGradient';

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <Fragment>
      <View style={[_s.container, {paddingTop: top}]}>
        <View style={_s.middle}>
          <Title />
        </View>
        <View style={_s.right}>
          <AddEventBtn />
        </View>
      </View>
      <View pointerEvents={'none'} style={[_s.shadowContainer]}>
        <BlackGradient />
      </View>
    </Fragment>
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
  shadowContainer: {
    position: 'absolute',
    left: 0,
    top: vs(120),
    zIndex: 80,
    height: 60,
    minWidth: '100%',
  },
  middle: {
    flex: 1,
    maxWidth: '70%',
    marginLeft: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
    maxWidth: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // shadow: {
  //   shadowColor: _c.black,
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
});
