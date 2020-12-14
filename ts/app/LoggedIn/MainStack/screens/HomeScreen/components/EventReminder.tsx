import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';

interface EventReminderProps {}

const EventReminder = (props: EventReminderProps) => {
  const txt = useLocalizedTxt();

  return (
    <View pointerEvents={'box-none'} style={_s.container}>
      <View style={_s.middle}>
        <View style={_s.shadow}>
          <TouchableOpacity
            disabled={true}
            activeOpacity={1}
            style={[_s.eventListOpener, _s.eventListOpenerBorderClosed]}>
            <Text style={_s.txt}>{`Ball Time coming up soon...`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventReminder;

const _s = StyleSheet.create({
  container: {
    height: 'auto',
    backgroundColor: _c.invisible,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    height: vs(60),
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
