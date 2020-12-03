import React from 'react';
import {
  View,
  StyleSheet,
  // Image,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import TapMatchBetaLogo from 'assets/svg/TapMatchBetaLogo-red.svg';
// import HoldingHands from 'assets/svg/holding-hands.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomBtn from './components/BottomBtn';
import TermsAndConditionsParagraph from './components/TermsAndConditionsParagraph';
import {useNavigation} from '@react-navigation/native';
import {_c} from 'ts/UIConfig/colors';

interface StartScreenProps {}

const StartScreen = (props: StartScreenProps) => {
  const {top, bottom} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation();
  const logoSize = width * 0.6;

  return (
    <View style={[_s.container, {paddingTop: top}]}>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigate('PhoneInput')}
        style={_s.middle}>
        <TapMatchBetaLogo height={logoSize} width={logoSize} />
        {/* <Image
          width={30}
          height={50}
          style={{width: 300, height: 500}}
          source={require('assets/png/holding-hands.png')}
        /> */}
      </TouchableOpacity>
      <TermsAndConditionsParagraph />
      <BottomBtn />
    </View>
  );
};

export default StartScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
  },
  middle: {
    width: '100%',
    // backgroundColor: 'blue',
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '5%',
  },
});
