import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {_c} from 'ts/UIConfig/colors';
import CloseButton from './components/CloseButton';
import TutorialVideo from 'assets/video/V1.1 Improved.mov';

const TutorialScreen = ({navigation, route}: any) => {
  const {top, bottom} = useSafeAreaInsets();
  const loadComplete = useState<boolean>(false);

  return (
    <View style={[_s.container, {paddingTop: top, paddingBottom: bottom}]}>
      {loadComplete[0] && <CloseButton onPress={() => navigation.goBack()} />}
      <StatusBar
        animated={true}
        backgroundColor={_c.white}
        barStyle={'dark-content'}
      />
      <Video source={TutorialVideo} style={_s.video} />
    </View>
  );
};

export default TutorialScreen;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.white,
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
