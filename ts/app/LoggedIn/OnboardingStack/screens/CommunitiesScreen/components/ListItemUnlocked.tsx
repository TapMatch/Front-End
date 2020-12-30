import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import LockOpenBlack from 'assets/svg/lock-open-black.svg';

interface ListItemProps {
  item: any;
}

const ListItemUnlocked = ({item}: ListItemProps) => {
  const txt = useLocalizedTxt();
  const iconSize = vs(26);
  const {name, id, city, access, is_open} = item;
  console.log(is_open, '0909090090');
  return (
    <TouchableOpacity
      disabled={true}
      style={_s.container}>
      <View style={_s.left}>
        <LockOpenBlack height={iconSize} width={iconSize} />
      </View>
      <View style={_s.middle}>
        <View style={!is_open ? _s.middle_top : _s.middle_top_full}>
          <Text style={[_s.title, _s.txt]}>{name}</Text>
          {!!city && <Text style={[_s.city, _s.txt]}>{city}</Text>}
        </View>
        {!is_open && <View style={_s.middle_bottom}>
          <Text style={[_s.users_num, _s.txt]}>{txt.accessCode}</Text>
          <Text style={[_s.users_num, _s.txt, _s.code]}>{access}</Text>
        </View>}
      </View>
      <View style={_s.right} />
    </TouchableOpacity>
  );
};

export default ListItemUnlocked;

const _s = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: _c.main_red,
    marginVertical: 10,
    height: vs(110),
    flexDirection: 'row',
    backgroundColor: _c.unlockedCommunityBtn,
    minWidth: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    flex: 0.3,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    flex: 0.3,
    maxWidth: '30%',
  },
  middle: {
    paddingVertical: vs(12),
    flex: 0.6,
    minHeight: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  middle_top: {
    flex: 0.7,
    minWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  middle_top_full: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle_bottom: {
    flex: 0.3,
    justifyContent: 'center',
    minWidth: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: _fs.xl,
  },
  city: {
    fontSize: _fs.l,
  },
  users_num: {
    fontSize: _fs.m,
  },
  txt: {
    fontFamily: _f.regularAlt,
    color: _c.black,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  code: {
    color: _c.main_red,
    marginLeft: 8,
  },
});
