import React, {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {_c} from 'ts/UIConfig/colors';

interface AvatarImgProps { }

const AvatarImg = (props: AvatarImgProps) => {
  const {userProfile} = useContext(TapMatchContext);

  return (
    <View style={_s.container}>
      <Image
        resizeMode={'cover'}
        style={_s.avatar}
        source={{
          uri:
            userProfile[0].avatar,
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
