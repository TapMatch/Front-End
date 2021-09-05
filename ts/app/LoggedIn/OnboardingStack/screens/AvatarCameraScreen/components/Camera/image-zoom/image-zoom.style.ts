import {Dimensions, ViewStyle} from 'react-native';
import {_c} from 'ts/UIConfig/colors';

export const CircleRatio = 0.86;
const circleRadius = Dimensions.get('screen').width * CircleRatio;
const container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: 'transparent',
};

const cameraMask: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  backgroundColor: 'transparent',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

const circle: ViewStyle = {
  borderWidth: 1,
  borderColor: _c.white,
  borderRadius: circleRadius / 2,
  width: circleRadius,
  height: circleRadius,
};

export default {
  container,
  cameraMask,
  circle,
};
