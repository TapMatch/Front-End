import React, {Fragment, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import TitleAndReturn from './components/TitleAndReturn';
import SearchInput from './components/SearchInput';
import BlackGradient from 'ts/app/common/components/BlackGradient';

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const {top} = useSafeAreaInsets();
  const searchString = useState<string>('');
  return (
    <Fragment>
      <View style={[_s.container, {paddingTop: top}]}>
        <View style={_s.half}>
          <TitleAndReturn />
        </View>
        <View style={_s.half}>
          <SearchInput searchString={searchString} />
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
    zIndex: 100,
    height: vs(150),
    minWidth: '100%',
  },
  shadowContainer: {
    position: 'absolute',
    left: 0,
    top: vs(150),
    zIndex: 80,
    height: 60,
    minWidth: '100%',
  },
  half: {
    flex: 1,
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
