import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import ChevronLeftBlack from 'assets/svg/chevron-left-black.svg';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

interface TitleAndReturnProps {}

const TitleAndReturn = (props: TitleAndReturnProps) => {
  const {
    addingLocationOn,
    address,
    coordinates,
  } = useContext(CreateEventScreenContext);
  const {userLocation} = useContext(TapMatchContext);
  return (
    <View style={[_s.container]}>
      <TouchableOpacity onPress={() => {
        coordinates[1]({
          ...userLocation[0], latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
        address[1]('');
        addingLocationOn[1](false);
      }} style={_s.btn}>
        <ChevronLeftBlack height={_fs.x9l} width={_fs.x9l} />
      </TouchableOpacity>
      <Text style={[_s.txt, _s.title]}>Pin point your Event</Text>
    </View>
  );
};

export default TitleAndReturn;

const _s = StyleSheet.create({
  container: {
    paddingRight: _fs.x9l,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '80%',
    borderRadius: 20,
    flexDirection: 'row',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btn: {
    alignItems: 'center',
    marginTop: 5,
    paddingVertical: '3%',
    paddingLeft: '3%',
    paddingRight: 8,
    justifyContent: 'center',
  },
  title: {
    fontFamily: _f.eRegular,
    fontSize: _fs.x3l,
    color: _c.black,
  },
});
