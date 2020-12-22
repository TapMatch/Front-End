import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import RefreshCircleRed from 'assets/svg/refresh-circle-red.svg';
import TargetWhite from 'assets/svg/target-white.svg';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import ListItem from './components/ListItem';

interface UpcomingEventsProps {
  resetMap: () => void
}

const iconSize = '75%';

const UpcomingEvents = ({resetMap}: UpcomingEventsProps) => {
  const listIsOpen = useState<boolean>(false);
  const txt = useLocalizedTxt();
  const renderList = () => {
    if (listIsOpen[0]) {
      return (
        <View style={_s.listContainer}>
          {[0, 1, 2, 3, 4].map((el, ind, arr) => (
            <ListItem
              key={`${ind}-addIDHereLater`}
              isLast={ind === arr.length - 1}
            />
          ))}
        </View>
      );
    } else {
      return null;
    }
  };
  const borderState = listIsOpen[0]
    ? _s.eventListOpenerBorderOpen
    : _s.eventListOpenerBorderClosed;
  return (
    <View pointerEvents={'box-none'} style={_s.container}>
      <TouchableOpacity onPress={resetMap} style={_s.side}>
        <TargetWhite
          height={iconSize}
          width={iconSize}
        />
      </TouchableOpacity>
      <View style={[_s.middle, {height: listIsOpen[0] ? 'auto' : vs(60)}]}>
        <View style={_s.shadow}>
          <TouchableOpacity
            onPress={() => listIsOpen[1](!listIsOpen[0])}
            activeOpacity={1}
            style={[_s.eventListOpener, borderState]}>
            <Text style={_s.txt}>{`5 ${txt.upcomingEvents}`}</Text>
          </TouchableOpacity>
          {renderList()}
        </View>
      </View>
      <View pointerEvents={'box-none'} style={_s.side}>
        <RefreshCircleRed
          height={iconSize}
          width={iconSize}
          onPress={() => console.log('get new upcoming events')}
        />
      </View>
    </View>
  );
};

export default UpcomingEvents;

const _s = StyleSheet.create({
  container: {
    height: 'auto',
    backgroundColor: _c.invisible,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'absolute',
    paddingHorizontal: '4%',
    paddingTop: 5,
    left: 0,
    top: vs(120),
    zIndex: 100,
    minWidth: '100%',
  },
  middle: {
    maxWidth: '70%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: '5%',
  },
  side: {
    height: vs(60),
    flex: 1,
    maxWidth: '15%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  eventListOpener: {
    height: vs(60) * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
    minWidth: '100%',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.black,
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
  },
  shadow: {
    shadowColor: _c.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listContainer: {
    minHeight: vs(60),
    height: 'auto',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
    minWidth: '100%',
  },
  eventListOpenerBorderClosed: {
    borderRadius: 25,
  },
  eventListOpenerBorderOpen: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: _c.grey,
  },
});
