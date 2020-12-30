import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
interface TitleProps {}

const Title = (props: TitleProps) => {
  return (
    <View style={[_s.container]}>
      <View style={_s.txtContainer}>
        <Text style={[_s.txt, _s.title]}>Set up your Event!</Text>
        <Text style={[_s.txt, _s.eg]}>Pimp out your event</Text>
      </View>
    </View>
  );
};

export default Title;

const _s = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '80%',
    borderRadius: 20,
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    marginBottom: 5,
    fontFamily: _f.eRegular,
    fontSize: _fs.x3l,
    color: _c.black,
  },
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eg: {
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
    color: _c.main_red,
  },
});
