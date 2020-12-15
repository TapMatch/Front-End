import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingViewBase,
  Slider,
} from 'react-native';
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
  return (
    <View style={_s.container}>
      <View style={_s.window}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={_s.scrollView}>
          <View style={_s.content}>
            <Title />
            <DescriptionInput description={description} />
            <LimitSlider joinLimit={joinLimit} />
            <LocationPickerBtn />
            <DateTimeInput dateTime={dateTime} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default FormWindow;

const _s = StyleSheet.create({
  container: {
    position: 'absolute',
    top: vs(120),
    left: 0,
    height: Dimensions.get('screen').height - vs(120) * 2,
    minWidth: '100%',
    zIndex: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: 50,
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
