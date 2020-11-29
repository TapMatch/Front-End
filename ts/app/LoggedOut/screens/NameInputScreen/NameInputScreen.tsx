import {useBackHandler} from '@react-native-community/hooks';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import DoneBtn from './components/DoneBtn';
import NameInput from './components/NameInput';
import Subtitle from './components/Subtitle';
import Title from './components/Title';

interface NameInputScreenProps {}

const NameInputScreen = (props: NameInputScreenProps) => {
  const name = useState<string>('');
  const doneBtnDisabled = !name[0].length;
  useBackHandler(() => {
    if (false) {
      // handle it
      return true;
    }
    // let the default thing happen
    return false;
  });
  return (
    <View style={_s.container}>
      <View style={_s.content}>
        <Title />
        <Subtitle />
        <NameInput name={name} />
      </View>
      <DoneBtn disabled={doneBtnDisabled} />
    </View>
  );
};

export default NameInputScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
  },
  content: {
    flex: 1,
    paddingTop: vs(55),
  },
});
