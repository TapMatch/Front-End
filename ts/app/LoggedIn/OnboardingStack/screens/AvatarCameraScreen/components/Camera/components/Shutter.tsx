import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';

interface ShutterProps {
  onPress: any;
  uploadToServer: () => void;
  pictureURI: [string, (x: string) => void];
}

const Shutter = ({onPress, pictureURI, uploadToServer}: ShutterProps) => {
  if (pictureURI[0].length) {
    return (
      <View style={_s.container}>
        <TouchableOpacity onPress={() => pictureURI[1]('')} style={_s.btn}>
          <Text style={_s.btnTxt}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={uploadToServer} style={_s.btn}>
          <Text style={_s.btnTxt}>Use Photo</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={_s.container}>
        <TouchableOpacity onPress={onPress} style={[_s.shutterBtn, _s.shadow]}>
          <View style={_s.redCircle} />
        </TouchableOpacity>
      </View>
    );
  }
};

export default Shutter;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: _c.white,
    alignItems: 'center',
  },
  shutterBtn: {
    backgroundColor: _c.white,
    borderRadius: 120,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  btn: {
    height: '50%',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: _c.black,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: _f.regular,
    fontSize: _fs.l,
  },
  redCircle: {
    height: '100%',
    width: '100%',
    borderRadius: 120,
    backgroundColor: _c.main_red,
  },
  shadow: {
    shadowColor: _c.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
