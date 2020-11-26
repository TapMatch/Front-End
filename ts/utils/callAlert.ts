import {Alert} from 'react-native';

const btns = [
  {
    text: 'Ok',
    onPress: () => console.log('OK Pressed'),
  },
];

export default function callAlert(
  title: string,
  txt: string,
  buttons: Array<{}> = btns,
  cancelable: boolean = false,
) {
  Alert.alert(title, txt, buttons, {
    cancelable,
  });
}
