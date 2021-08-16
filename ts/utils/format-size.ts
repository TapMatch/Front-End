import {Dimensions} from 'react-native';
import {
  fullCoverHeight,
  layoutScaleHeight,
  layoutScaleWidth,
} from '../UIConfig/sizes';

export const formatWidth = (size: number): number => size * layoutScaleWidth;

export const formatHeight = (size: number): number => size * layoutScaleHeight;

export const formatCoverSize = (size: number): number =>
  size * layoutScaleWidth -
  (fullCoverHeight - Dimensions.get('screen').height) / 2;
