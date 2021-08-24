import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import TapMatchBetaLogo from 'assets/svg/TapMatchBetaLogo-red.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FeedBackBtn from './components/FeedBackBtn';
import MsgParagraph from './components/MsgParagraph';
import {useNavigation} from '@react-navigation/native';
import {_c} from 'ts/UIConfig/colors';
import DeepLinkHandler from '../../components/DeepLinkHandler';
import NotificationHandler from '../../components/NotificationHandler';

interface FeedbackRequestScreenProps {
  route: any;
}

const FeedbackRequestScreen = ({route}: FeedbackRequestScreenProps) => {
  const {top, bottom} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const {goBack} = useNavigation();
  const logoSize = width * 0.6;

  return (
    <DeepLinkHandler route={route}>
      <View style={[_s.container, {paddingTop: top, paddingBottom: bottom}]}>
        <View style={_s.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={goBack}
            style={_s.middle}>
            <TapMatchBetaLogo height={logoSize} width={logoSize} />
          </TouchableOpacity>
          <MsgParagraph />
          <FeedBackBtn />
        </View>
      </View>
      <NotificationHandler route={route} />
    </DeepLinkHandler>
  );
};

export default FeedbackRequestScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
  },
  middle: {
    width: '100%',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
  },
});
