import React, {useContext} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {tapMatchServerUrl} from 'ts/constants/constants';

interface AvatarBtnProps { }

const AvatarBtn = (props: AvatarBtnProps) => {
  const {profileModalVisible} = useContext(HomeScreenContext);
  const {userProfile} = useContext(TapMatchContext);
  return (
    <View style={[_s.container, _s.shadow]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => profileModalVisible[1](!profileModalVisible[0])}
        style={_s.btn}>
        <Image
          resizeMode={'cover'}
          style={_s.avatar}
          source={{
            uri:
              // `${tapMatchServerUrl}${userProfile[0].avatar}`,
              `${userProfile[0].avatar}`,
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
    backgroundColor: _c.invisible,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: _c.invisible,
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
