import {clamp} from 'lodash-es';
import {Dimensions} from 'react-native';

const basicScreenWidth = 408;
const basicScreenHeight = 897;
const maxLayoutScale = 1.1;
export const layoutScaleWidth = clamp(
  Dimensions.get('screen').width / basicScreenWidth,
  maxLayoutScale,
);

export const layoutScaleHeight = clamp(
  Dimensions.get('screen').height / basicScreenHeight,
  maxLayoutScale,
);

export const fullCoverHeight = basicScreenHeight * layoutScaleWidth;
