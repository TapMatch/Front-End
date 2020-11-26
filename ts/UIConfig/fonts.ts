import {Platform} from 'react-native';
const isAndroid = Platform.OS === 'android';
export const _f = {
  // font names
  bold: isAndroid ? 'D-DIN-Bold' : 'D-DIN-Bold',
  italic: isAndroid ? 'D-DIN-Italic' : 'D-DIN-Italic',
  regular: isAndroid ? 'D-DIN' : 'D-DIN',
  cBold: isAndroid ? 'D-DINCondensed-Bold' : 'D-DINCondensed-Bold',
  cRegular: isAndroid ? 'D-DINCondensed' : 'D-DINCondensed',
  eBold: isAndroid ? 'D-DINExp-Bold' : 'D-DINExp-Bold',
  eItalic: isAndroid ? 'D-DINExp-Italic' : 'D-DINExp-Italic',
  eRegular: isAndroid ? 'D-DINExp' : 'D-DINExp',
  regularAltBold: isAndroid ? 'DIN Alternate Bold' : 'DIN Alternate Bold',
  regularAlt: isAndroid ? 'DINRegularAlternate' : 'DIN-BoldAlternate',
};
