import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {_c} from 'ts/UIConfig/colors';

interface AvatarImgProps {}

const AvatarImg = (props: AvatarImgProps) => {
  return (
    <View style={_s.container}>
      <Image
        resizeMode={'cover'}
        style={_s.avatar}
        source={{
          uri:
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        }}
      />
    </View>
  );
};

export default AvatarImg;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.white,
    borderRadius: 300,
    borderWidth: 5,
    borderColor: _c.white,
    height: 50,
    width: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 300,
    height: 50,
    width: 50,
  },
});
