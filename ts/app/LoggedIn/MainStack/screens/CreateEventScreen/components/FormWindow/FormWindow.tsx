import {useKeyboard} from '@react-native-community/hooks';
import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import DateTimeInput from './components/DateTimeInput';
import DescriptionInput from './components/DescriptionInput';
import LimitSlider from './components/LimitSlider';
import LocationPickerBtn from './components/LocationPickerBtn';
import Title from './components/Title';

interface FormWindowProps {}

const FormWindow = (props: FormWindowProps) => {
  const description = useState<string>('');
  const joinLimit = useState<number>(1);
  const dateTime = useState<Date>(new Date());
  const k = useKeyboard();
  const pb = definePaddingBottom(k);

  return (
    <View style={_s.container}>
      <View style={_s.window}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: pb}}>
          <View style={_s.content}>
            <Title />
            <DescriptionInput description={description} />
            <LocationPickerBtn />
            <LimitSlider joinLimit={joinLimit} />
            <DateTimeInput dateTime={dateTime} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};
function definePaddingBottom({keyboardHeight, keyboardShown}: any) {
  if (Platform.OS === 'ios') {
    if (keyboardShown) {
      return keyboardHeight;
    } else {
      return 50;
    }
  } else {
    return keyboardHeight;
  }
}
export default FormWindow;

const q = Platform.OS === 'ios' ? 2 : 2.5;
const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    top: vs(120),
    left: 0,
    height: Dimensions.get('screen').height - vs(120) * q,
    minWidth: '100%',
    zIndex: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  window: {
    height: '95%',
    width: '90%',
    backgroundColor: _c.white,
    borderRadius: 20,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'stretch',
  },
});
