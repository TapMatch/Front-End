import {CountryCode} from 'react-native-country-picker-modal';
// @ts-ignore
import LibPhoneNumber from 'google-libphonenumber';
export default function validatePhoneNumber(
  phoneNumber: string,
  countryCode: CountryCode,
) {
  const re = /^[0-9]*$/im;
  const phoneUtil = LibPhoneNumber.PhoneNumberUtil.getInstance();
  const number = phoneUtil.parse(phoneNumber, countryCode);
  return phoneUtil.isValidNumberForRegion(number, countryCode);
}
