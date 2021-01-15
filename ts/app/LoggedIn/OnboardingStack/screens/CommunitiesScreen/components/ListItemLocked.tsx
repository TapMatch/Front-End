import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {vs} from 'react-native-size-matters';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_c} from 'ts/UIConfig/colors';
import ChevronRightBlack from 'assets/svg/chevron-right-black.svg'; //
import LockClosedBlack from 'assets/svg/lock-closed-black.svg';
import LockOpenBlack from 'assets/svg/lock-open-black.svg';

interface ListItemProps {
  selectItem: (x: any) => void;
  item: any;
}

const ListItem = ({item, selectItem}: ListItemProps) => {
  const txt = useLocalizedTxt();
  const iconSize = vs(26);
  const {name, members, city} = item;
  const renderIcon = () => {
    if (item?.is_open) {
      return <LockOpenBlack height={iconSize} width={iconSize} />;
    } else {
      return <LockClosedBlack height={iconSize} width={iconSize} />;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => selectItem(item)}
      style={_s.container}>
      <View style={_s.left}>{renderIcon()}</View>
      <View style={_s.middle}>
        <View style={_s.middle_top}>
          <Text numberOfLines={1} style={[_s.title, _s.txt]}>{name}</Text>
          <Text numberOfLines={1} style={[_s.city, _s.txt]}>{city}</Text>
        </View>
        <View style={_s.middle_bottom}>
          <Text
            numberOfLines={1}
            style={[
              _s.users_num,
              _s.txt,
            ]}>{`${members.length} ${txt.users}`}</Text>
        </View>
      </View>
      <View style={_s.right}>
        <ChevronRightBlack height={iconSize} width={iconSize} />
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const _s = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: 8,
    height: vs(90),
    flexDirection: 'row',
    backgroundColor: _c.white,
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
    paddingLeft: '10%',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
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
});
