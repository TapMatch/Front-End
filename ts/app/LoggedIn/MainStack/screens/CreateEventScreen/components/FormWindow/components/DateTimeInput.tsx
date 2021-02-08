import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Platform} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {vs} from 'react-native-size-matters';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
interface DateTimeInputProps {
  dateTime: [Date, (x: Date) => void];
}

const DateTimeInput = ({dateTime}: DateTimeInputProps) => {
  const md = moment().add(1, 'hour').toDate();
  const minDate = useState<Date>(md);
  const dateTimePickerModalVisible = useState<boolean>(false);


  useEffect(() => {
    const condition = Platform.OS === 'ios' ? true : dateTimePickerModalVisible[0];
    if (condition) {
      const modalCallTimeMoment = moment().add(1, 'hour');
      const modalCallTime = modalCallTimeMoment.toDate();
      minDate[1](modalCallTime);

      if (modalCallTimeMoment > moment(dateTime[0])) {
        dateTime[1](modalCallTime);
      }
    }
  }, [dateTimePickerModalVisible[0]]);


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
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={_s.img}
            source={require('assets/png/up-and-down-arrows.png')}
          />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        customCancelButtonIOS={({onPress}) => <CustomPickerButton txt={'Cancel'} onPress={onPress} />}
        customConfirmButtonIOS={({onPress}) => <CustomPickerButton txt={'Confirm'} onPress={onPress} />}
        isDarkModeEnabled={false}
        date={dateTime[0]}
        minimumDate={minDate[0]}
        isVisible={dateTimePickerModalVisible[0]}
        mode="datetime"
        onConfirm={(val) => {
          minDate[1](moment().add(1, 'hour').toDate());
          dateTimePickerModalVisible[1](false);
          dateTime[1](val);
        }}
        onCancel={(val) => {
          // minDate[1](moment().add(1, 'hour').toDate());
          dateTimePickerModalVisible[1](false);
        }}
      />
    </Fragment>
  );
};

export default DateTimeInput;

const CustomPickerButton = ({onPress, txt}: any) => {
  const notCancel = txt !== 'Cancel';
  const br = 14;

  return (
    <TouchableOpacity style={{
      borderTopWidth: notCancel ? StyleSheet.hairlineWidth : 0,
      borderColor: _c.greyLight,
      backgroundColor: _c.white,
      height: 57,
      minWidth: '100%',
      borderBottomRightRadius: br,
      borderBottomLeftRadius: br,
      borderTopRightRadius: notCancel ? 0 : br,
      borderTopLeftRadius: notCancel ? 0 : br,
      justifyContent: 'center',
      alignItems: 'center',
    }} onPress={onPress}>
      <Text style={{
        color: '#007AFF',
        fontFamily: 'System',
        fontWeight: notCancel ? '600' : 'normal',
        fontSize: _fs.xl
      }}>{txt}</Text>
    </TouchableOpacity>);
};

const _s = StyleSheet.create({
  container: {
    paddingHorizontal: '6%',
    paddingVertical: '4%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: vs(85),
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
