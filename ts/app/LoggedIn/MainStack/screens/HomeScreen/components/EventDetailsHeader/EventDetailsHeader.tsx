import React, {Fragment} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import LeaveeEventBtn from './components/LeaveeEventBtn';
import BlackGradient from 'ts/app/common/components/BlackGradient';
import ChevronLeftBlack from 'assets/svg/chevron-left-black.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';

interface EventDetailsHeaderProps {
  eventDetailsModalVisible: [boolean, (x: boolean) => void];
  setupLeaveEventUI: () => void;
}

const iconSize = _fs.xxl * 1.5;
const EventDetailsHeader = ({eventDetailsModalVisible, setupLeaveEventUI}: EventDetailsHeaderProps) => {
  const {top} = useSafeAreaInsets();

  return (
    <Fragment>
      <View style={[_s.container, {paddingTop: top}]}>
        <TouchableOpacity onPress={() => eventDetailsModalVisible[1](false)} style={_s.left}>
          <ChevronLeftBlack height={iconSize} width={iconSize} />
        </TouchableOpacity>
        <View style={_s.middle}>
          <View style={_s.middleTop}>
            <Text style={_s.topMiddleTxt}>Get Ready for</Text>
            <Text style={_s.topMiddleTxt}>{`Ball Time`}.</Text>
          </View>
          <View style={_s.middleBottom}>
            <Text style={_s.bottomMiddleTxt}>{`13.10.20 at 10 pm`}</Text>
          </View>
        </View>
        <View style={_s.right}>
          <LeaveeEventBtn setupLeaveEventUI={setupLeaveEventUI} />
        </View>
      </View>
      <View pointerEvents={'none'} style={[_s.shadowContainer]}>
        <BlackGradient />
      </View>
    </Fragment>
  );
};

export default EventDetailsHeader;

const _s = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    backgroundColor: _c.smoke,
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row',
    zIndex: 100,
    height: vs(145),
    minWidth: '100%',
  },
  shadowContainer: {
    position: 'absolute',
    left: 0,
    top: vs(145),
    zIndex: 80,
    height: 60,
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
  topMiddleTxt: {
    fontSize: _fs.xl,
    fontFamily: _f.regularAltBold,
    lineHeight: _fs.xxl,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.black,
  },
  bottomMiddleTxt: {
    fontSize: _fs.l,
    fontFamily: _f.regularAlt,
    lineHeight: _fs.xl,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.black,
  },

  middleTop: {
    flex: 0.65,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  middleBottom: {
    flex: 0.35,
    justifyContent: 'center',
    alignSelf: 'center',

  }
});
