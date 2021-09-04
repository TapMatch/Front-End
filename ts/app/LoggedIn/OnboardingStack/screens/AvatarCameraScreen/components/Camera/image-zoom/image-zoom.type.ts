import {
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';

export interface ICenterOn {
  x: number;
  y: number;
  scale: number;
  duration: number;
}

export interface IOnMove {
  type: string;
  positionX: number;
  positionY: number;
  scale: number;
  zoomCurrentDistance: number;
}

export interface IOnClick {
  locationX: number;
  locationY: number;
  pageX: number;
  pageY: number;
}

export class ImageZoomProps {
  public cropWidth: number = 100;

  public cropHeight: number = 100;

  public imageWidth: number = 100;

  public imageHeight: number = 100;

  public panToMove?: boolean = true;

  public pinchToZoom?: boolean = true;

  public enableDoubleClickZoom?: boolean = true;

  public clickDistance?: number = 10;

  public maxOverflow?: number = 100;

  public longPressTime?: number = 800;

  public doubleClickInterval?: number = 175;

  /**
   * If provided this will cause the view to zoom and pan to the center point
   * Duration is optional and defaults to 300 ms.
   */
  public centerOn?: ICenterOn;

  public style?: ViewStyle = {};

  /**
   * threshold for firing swipe down function
   */
  public swipeDownThreshold?: number = 230;

  /**
   * for enabling vertical movement if user doesn't want it
   */
  public enableSwipeDown?: boolean = false;

  /**
   * for disabling focus on image center if user doesn't want it
   */
  public enableCenterFocus?: boolean = true;

  /**
   * for disabling rendering to hardware texture on Android
   */
  public useHardwareTextureAndroid?: boolean = true;

  /**
   * minimum zoom scale
   */
  public minScale?: number = 0.6;

  /**
   * maximum zoom scale
   */
  public maxScale?: number = 10;

  /**
   * Whether to use native code to perform animations.
   */
  public useNativeDriver?: boolean = false;

  public onClick?: (eventParams: IOnClick) => void = () => {
    //
  };
  public onDoubleClick?: (eventParams: IOnClick) => void = () => {
    //
  };

  public onLongPress?: (eventParams: IOnClick) => void = () => {
    //
  };

  public horizontalOuterRangeOffset?: (offsetX: number) => void = () => {
    //
  };

  public onDragLeft?: () => void = () => {
    //
  };

  public responderRelease?: (vx: number, scale: number) => void = () => {
    //
  };

  /**
   * If provided, this will be called everytime the map is moved
   */
  public onMove?: (position: IOnMove) => void = () => {
    //
  };

  /**
   * If provided, this method will be called when the onLayout event fires
   */
  public layoutChange?: (event: LayoutChangeEvent) => void = () => {
    //
  };

  /**
   * function that fires when user swipes down
   */
  public onSwipeDown?: () => void = () => {
    //
  };

  /**
   * Allows defining the onMoveShouldSetResponder behavior.
   */
  public onMoveShouldSetPanResponder?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => boolean;

  /**
   * Allows overriding the default onStartShouldSetPanResponder behavior.
   * By default, always becomes the responder
   */
  public onStartShouldSetPanResponder?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => boolean = () => true;

  /**
   * Allows overriding the default onPanResponderTerminationRequest behavior.
   * By default, doesn't terminate until the press ends
   */
  public onPanResponderTerminationRequest?: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => boolean = () => false;
}

export class ImageZoomState {
  public centerX?: number = 0.5;

  public centerY?: number = 0.5;
}
