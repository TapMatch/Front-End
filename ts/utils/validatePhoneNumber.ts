export default function validatePhoneNumber(phoneNumber: string) {
  const re = /^[0-9]*$/im;
  return re.test(phoneNumber);
}
