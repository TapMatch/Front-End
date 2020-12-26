import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import PhoneIcon from 'assets/svg/phone-black.svg';
import ChevronDownBlack from 'assets/svg/chevron-down-black.svg';
import {_c} from 'ts/UIConfig/colors';
import {s, vs} from 'react-native-size-matters';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';

interface PhoneInputProps {
  callingCode: [string, (x: string) => void];
  countryCode: [CountryCode, (x: CountryCode) => void];
  phoneNumber: [string, (x: string) => void];
}

const PhoneInput = ({
  callingCode,
  countryCode,
  phoneNumber,
}: PhoneInputProps) => {
  const countryCodeSelectorOpen = useState<boolean>(false);

  return (
    <View style={_s.container}>
      <View style={_s.inputContainer}>
        <PhoneIcon
          style={{marginHorizontal: 5}}
          height={_fs.l}
          width={_fs.xl}
        />
        <View style={_s.countryPickerTrigger}>
          <CountryPicker
            containerButtonStyle={_s.containerButtonStyle}
            visible={countryCodeSelectorOpen[0]}
            onOpen={() => countryCodeSelectorOpen[1](true)}
            onClose={() => countryCodeSelectorOpen[1](true)}
            countryCode={countryCode[0]}
            theme={{
              fontFamily: Platform.select({
                ios: _f.eRegular,
                android: _f.eRegular,
                web: 'Arial',
              }),
            }}
            withFilter={true}
            withFlag={true}
            withFlagButton={false}
            withCountryNameButton={false}
            withCallingCode={true}
            withCallingCodeButton={true}
            withAlphaFilter={false}
            withEmoji={true}
            onSelect={(x) => {
              callingCode[1](x.callingCode[0]);
              countryCode[1](x.cca2);
            }}
          />
          <ChevronDownBlack height={s(20)} width={s(10)} />
        </View>
        <TextInput
          textContentType={'none'}
          importantForAutofill={'no'}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          autoFocus={true}
          contextMenuHidden={true}
          keyboardType={'number-pad'}
          onChangeText={phoneNumber[1]}
          maxLength={16}
          style={_s.input}
        />
      </View>
    </View>
  );
};

export default PhoneInput;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
    paddingTop: '15%',
  },
  inputContainer: {
    borderRadius: 4,
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: _c.greyLight,
    height: vs(55),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '10%',
  },
  input: {
    overflow: 'visible',
    paddingLeft: 5,
    height: '60%',
    minHeight: '60%',
    textAlign: 'left',
    textAlignVertical: 'center',
    flex: 1,
    paddingVertical: 0,
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
  },
  countryPickerTrigger: {
    height: '60%',
    paddingHorizontal: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },
  containerButtonStyle: {marginRight: 3},
});
