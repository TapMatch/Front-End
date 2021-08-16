import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {_c} from 'ts/UIConfig/colors';
import CloseButton from './components/CloseButton';
import TutorialVideo from 'assets/video/tutorial.mp4';
import WebLoader from './components/WebLoader';
import {useNavigation} from '@react-navigation/native';
import LoggedOutScrees from 'ts/constants/screens';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {setStorageData} from 'ts/utils/asyncStorage';
import StorageKeys from 'ts/constants/storage';

const TutorialScreen = ({navigation, route}: any) => {
  const {top, bottom} = useSafeAreaInsets();
  const loadComplete = useState<boolean>(false);
  const {navigate} = useNavigation();
  const txt = useLocalizedTxt();

  const onTutorialEnd = async () => {
    await setStorageData(StorageKeys.PassedTutorial, '1');
    navigate(LoggedOutScrees.PhoneInput);
  };

  return (
    <View style={[_s.container, {paddingTop: top, paddingBottom: bottom}]}>
      {/*{loadComplete[0] && (*/}
      {/*  <CloseButton onPress={() => navigate(LoggedOutScrees.PhoneInput)} />*/}
      {/*)}*/}
      <StatusBar
        animated={true}
        backgroundColor={_c.white}
        barStyle={'dark-content'}
      />
      {!loadComplete[0] && <WebLoader message={txt.startTutorial} />}
      <Video
        source={TutorialVideo}
        style={_s.video}
        onEnd={onTutorialEnd}
        resizeMode={'contain'}
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
