import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import {useNavigation} from '@react-navigation/native';
import ChevronRightBlack from 'assets/svg/chevron-right-black.svg'; //
import LockOpenBlack from 'assets/svg/lock-open-black.svg'; //

interface ListItemProps {}

const ListItemUnlocked = (props: ListItemProps) => {
  const {navigate} = useNavigation();
  const txt = useLocalizedTxt();
  const iconSize = vs(26);

  return (
    <TouchableOpacity
      onPress={() => navigate('CommunityCodeInput', {community: 'LALALALALA'})}
      style={_s.container}>
      <View style={_s.left}>
        <LockOpenBlack height={iconSize} width={iconSize} />
      </View>
      <View style={_s.middle}>
        <View style={_s.middle_top}>
          <Text style={[_s.title, _s.txt]}>Harvard</Text>
          <Text style={[_s.city, _s.txt]}>Boston</Text>
        </View>
        <View style={_s.middle_bottom}>
          <Text style={[_s.users_num, _s.txt]}>Access Code</Text>
          <Text style={[_s.users_num, _s.txt, _s.code]}>00007</Text>
        </View>
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
    flex: 0.2,
  },
  middle: {
    paddingVertical: vs(12),
    flex: 0.5,
    minHeight: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  middle_top: {
    flex: 0.7,
    justifyContent: 'flex-start',
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
