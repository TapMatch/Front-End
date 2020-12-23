import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import TapMatchBetaLogo from 'assets/svg/TapMatchBetaLogo-red.svg';
import {_f} from 'ts/UIConfig/fonts';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

interface ProfileBubbleProps { }

const ProfileBubble = (props: ProfileBubbleProps) => {
  const txt = useLocalizedTxt();
  const {userProfile} = useContext(TapMatchContext);
  const {name, phone} = userProfile[0];
  return (
    <View style={_s.container}>
      <View style={_s.triangleContainer}>
        <View style={_s.triangle} />
      </View>
      <View style={_s.content}>
        <ImageBackground
          resizeMode={'cover'}
          style={_s.background}
          source={require('assets/png/holding-hands.png')}>
          <View style={_s.top}>
            <View style={_s.topLeft}>
              <Text style={_s.name}>{name}</Text>
              <Text style={_s.phoneNum}>{phone}</Text>
            </View>
            <View style={_s.topRight}>
              <TapMatchBetaLogo height={_fs.x9l * 2} width={_fs.x9l * 2} />
            </View>
          </View>
          <View style={_s.bottom}>
            <Text style={_s.bottomTxt}>
              To edit your profile You must delete the app and sign Up again as
              we do not store your information. Sorry for the Inconvenience. We
              are still in our infancy.
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ProfileBubble;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '2.5%',
    zIndex: 20,
    top: vs(105),
    height: '50%',
    width: '95%',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 20,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    borderColor: 'transparent',
    borderBottomColor: _c.white,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 25,
    backgroundColor: _c.white,
  },
  background: {
    padding: 20,
    flex: 1,
  },
  triangleContainer: {
    height: 22,
    marginLeft: Dimensions.get('screen').width * 0.025 + 11,
    marginBottom: -4,
  },
  top: {
    flexDirection: 'row',
    height: '60%',
    width: '100%',
  },
  topLeft: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topRight: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    width: '100%',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.black,
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
  },
  bottomTxt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.grey,
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
  },
  phoneNum: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.grey,
    fontFamily: _f.eRegular,
    fontSize: _fs.l,
  },
  name: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.black,
    fontFamily: _f.eRegular,
    fontSize: _fs.x8l,
  },
});
