import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';

interface ListItemProps {
  isLast: boolean;
}

const ListItem = ({isLast}: ListItemProps) => {
  return (
    <TouchableOpacity style={_s.container}>
      <View style={_s.iconContainer}>
        <CheckCircleRed height={_fs.l} width={_fs.l} />
      </View>
      <View
        style={[
          _s.txtContainer,
          {borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth},
        ]}>
        <Text style={_s.txt}>Ball Time - Tue 19:00</Text>
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
    alignItems: 'flex-end',
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
