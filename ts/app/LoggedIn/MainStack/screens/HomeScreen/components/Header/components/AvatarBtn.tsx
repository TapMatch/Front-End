import React, {useContext} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';

interface AvatarBtnProps {}

const AvatarBtn = (props: AvatarBtnProps) => {
  const {modalVisible} = useContext(HomeScreenContext);
  return (
    <View style={[_s.container, _s.shadow]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => modalVisible[1](!modalVisible[0])}
        style={_s.btn}>
        <Image
          resizeMode={'contain'}
          style={_s.avatar}
          source={{
            uri:
              'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AvatarBtn;

const _s = StyleSheet.create({
  container: {
    borderRadius: 300,
    borderWidth: 5,
    borderColor: _c.white,
    height: 50,
    width: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: _c.white,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 300,
    borderWidth: 5,
    borderColor: _c.white,
    height: 50,
    width: 50,
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
