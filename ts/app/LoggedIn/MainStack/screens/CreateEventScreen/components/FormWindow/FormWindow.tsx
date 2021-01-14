import {useKeyboard} from '@react-native-community/hooks';
import React, {useContext} from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {vs} from 'react-native-size-matters';
import {CreateEventScreenContext} from 'ts/app/contexts/CreateEventScreenContext';
import {_c} from 'ts/UIConfig/colors';
import DateTimeInput from './components/DateTimeInput';
import DescriptionInput from './components/DescriptionInput';
import LimitSlider from './components/LimitSlider';
import LocationPickerBtn from './components/LocationPickerBtn';
import NameInput from './components/NameInput';

interface FormWindowProps {}

const FormWindow = (props: FormWindowProps) => {
  const {
    description,
    joinLimit,
    dateTime,
    eventName
  } = useContext(CreateEventScreenContext);

  const k = useKeyboard();
  const pb = definePaddingBottom(k);

  return (
    <View style={_s.container}>
      <View style={_s.window}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: pb}}>
          <View style={_s.content}>
            <NameInput eventName={eventName} />
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
      return 0;
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
