import React, {Fragment, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {vs} from 'react-native-size-matters';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
interface DateTimeInputProps {
  dateTime: [Date, (x: Date) => void];
}

const DateTimeInput = ({dateTime}: DateTimeInputProps) => {
  const dateTimePickerModalVisible = useState<boolean>(false);
  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => {
          dateTimePickerModalVisible[1](true);
        }}
        style={[_s.container]}>
        <Text style={[_s.txt, _s.title]}>Set Time</Text>
        <View style={_s.bottom}>
          <Text style={[_s.txt, _s.time]}>
            {moment(dateTime[0]).format('DD-MM-YYYY HH:mm')}
          </Text>
          <Image
            style={_s.img}
            resizeMode={'contain'}
            source={require('assets/png/up-and-down-arrows.png')}
          />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isDarkModeEnabled={true}
        minimumDate={new Date()}
        isVisible={dateTimePickerModalVisible[0]}
        mode="datetime"
        onConfirm={(val) => {
          dateTimePickerModalVisible[1](false);
          dateTime[1](val);
        }}
        onCancel={() => {
          dateTimePickerModalVisible[1](false);
        }}
      />
    </Fragment>
  );
};

export default DateTimeInput;

const _s = StyleSheet.create({
  container: {
    paddingHorizontal: '6%',
    paddingVertical: '4%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: vs(120),
  },
  img: {
    height: _fs.xl,
    width: _fs.xl,
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: _f.regular,
    color: _c.black,
  },
  title: {
    fontSize: _fs.m,
  },
  time: {
    fontSize: _fs.xl,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});
