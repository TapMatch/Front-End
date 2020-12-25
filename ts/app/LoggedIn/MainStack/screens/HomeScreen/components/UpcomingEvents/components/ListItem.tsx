import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import moment from 'moment';

interface ListItemProps {
  isLast: boolean;
  item: any;
}

const ListItem = ({isLast, item}: ListItemProps) => {
  return (
    <TouchableOpacity onPress={() => console.log(item.id)} style={_s.container}>
      <View style={_s.iconContainer}>
        <CheckCircleRed height={_fs.l} width={_fs.l} />
      </View>
      <View
        style={[
          _s.txtContainer,
          {borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth},
        ]}>
        <Text numberOfLines={2} style={_s.txt}>{item.name} - {moment(item.datetime.date).format('ddd HH:mm')}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const _s = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    minWidth: '100%',
    flexDirection: 'row',
    height: vs(60) * 0.75,
    alignItems: 'center',
  },
  txtContainer: {
    width: '80%',
    borderBottomColor: _c.grey,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '10%',
  },
  iconContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '8%',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.black,
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
  },
});
