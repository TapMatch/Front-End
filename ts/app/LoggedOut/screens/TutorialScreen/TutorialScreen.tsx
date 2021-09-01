import React, {useEffect, useState, useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// @ts-ignore
import Video from 'react-native-video';
import {_c} from 'ts/UIConfig/colors';
import SkipButton from './components/SkipButton';
import TutorialVideo from 'assets/video/tutorial.mp4';
import WebLoader from './components/WebLoader';
import {useNavigation} from '@react-navigation/native';
import {LoggedOutScreens} from 'ts/constants/screens';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {SystemRootState} from 'ts/store/system/state';

const TutorialScreen = ({navigation, route}: any) => {
  const {playVideo} = route.params;
  const videoRef = useRef(null);
  const {top, bottom} = useSafeAreaInsets();
  const loadComplete = useState<boolean>(false);
  const videoPaused = useState<boolean>(false);
  const {navigate} = useNavigation();
  const txt = useLocalizedTxt();
  const {muteTutorial} = useSelector<SystemRootState>(({system}) => system);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      videoRef?.current?.presentFullscreenPlayer();
    }
  }, []);

  useEffect(() => {
    videoRef?.current?.seek(0);
    videoPaused[1](false);
    if (Platform.OS === 'ios') {
      videoRef?.current?.presentFullscreenPlayer();
    }
  }, [playVideo]);

  const onTutorialEnd = async () => {
    // await setStorageData(StorageKeys.PassedTutorial, '1');
    videoPaused[1](true);
    navigate(LoggedOutScreens.PhoneInput, {playVideo: !playVideo});
  };

  return (
    <View style={[_s.container, {paddingTop: top, paddingBottom: bottom}]}>
      {loadComplete[0] && <SkipButton onPress={onTutorialEnd} />}
      {!loadComplete[0] && <WebLoader message={txt.startTutorial} />}
      <Video
        ref={videoRef}
        source={TutorialVideo}
        style={_s.video}
        repeat={false}
        fullscreen={true}
        muted={videoPaused[0]}
        onEnd={onTutorialEnd}
        resizeMode={'stretch'}
        paused={videoPaused[0]}
        onReadyForDisplay={() => loadComplete[1](true)}
      />
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
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
