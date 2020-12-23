import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {vs} from 'react-native-size-matters';
import PenBlue from 'assets/svg/pen-blue.svg';
import {useNavigation} from '@react-navigation/native';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
interface LocationPickerBtnProps { }

const LocationPickerBtn = (props: LocationPickerBtnProps) => {
  const {
    eventAddress
  } = useContext(CreateEventScreenContext);
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate('LocationPicker')}
      style={[_s.container]}>
      <Text style={[_s.txt, _s.title]}>Place</Text>
      <View style={_s.bottom}>
        <Text style={[_s.txt, _s.address]}>{eventAddress[0]}</Text>
        <PenBlue height={_fs.x3l} width={_fs.x3l} />
      </View>
    </TouchableOpacity>
  );
};

export default LocationPickerBtn;

const _s = StyleSheet.create({
  container: {
    paddingHorizontal: '6%',
    paddingVertical: '4%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: vs(120),
    borderBottomColor: _c.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: _f.regular,
    color: _c.black,
  },
  title: {
    fontSize: _fs.m,
  },
  address: {
    fontSize: _fs.xl,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});
