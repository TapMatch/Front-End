import React, {Fragment, useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';
import GestureRecognizer from 'react-native-swipe-gestures';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import JoinedWindowHeader from './components/JoinedWindowHeader';
import JoinSection from './components/JoinSection';
import Paragraph from './components/Paragraph';
import People from './components/People';
import PlaceAndTime from './components/PlaceAndTime';
import StdWindowHeader from './components/StdWindowHeader';

interface EventDetailsModalProps {
  modalVisible: [boolean, (x: boolean) => void];
  eventJoinState: 'join' | 'full' | 'joined' | '';
}

const wh = Dimensions.get('window');

const EventDetailsModal = ({modalVisible, eventJoinState}: EventDetailsModalProps) => {
  const {bottom} = useSafeAreaInsets();
  const {requestingEventDetailsInProcess, selectedMarkerData} = useContext(MainStackContext);
  const renderWindowHeader = () => {
    if (eventJoinState === 'joined') {
      return <JoinedWindowHeader />;
    } else {
      return <StdWindowHeader />;
    }
  };
  const windowHeightParameter = eventJoinState === 'joined' ? 0.565 : 0.545;

  const config = Platform.OS === 'ios' ? {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  } : {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 40
    };
  const renderContent = () => {
    if (eventJoinState === '') {
      return <GestureRecognizer
        onSwipeDown={() => modalVisible[1](false)}
        config={config}
        style={[_s.gestureReconizer, {alignItems: 'center', justifyContent: 'center'}]}
      />;
    } else {
      if (requestingEventDetailsInProcess[0] || !Object.keys(selectedMarkerData[0]).length) {
        return (
          <GestureRecognizer
            onSwipeDown={() => modalVisible[1](false)}
            config={config}
            style={[_s.gestureReconizer, {alignItems: 'center', justifyContent: 'center'}]}
          >
            <ActivityIndicator size="large" color={_c.main_red} />
          </GestureRecognizer>
        );
      } else {
        return (
          <Fragment>
            <GestureRecognizer
              onSwipeDown={() => modalVisible[1](false)}
              config={config}
              style={_s.gestureReconizer}
            >
              {renderWindowHeader()}
              <View style={_s.modalMainContent}>
                <Paragraph />
                <PlaceAndTime eventJoinState={eventJoinState} />
                <JoinSection eventJoinState={eventJoinState} />
              </View>
            </GestureRecognizer>
            <People />
          </Fragment>
        );
      }
    }
  };
  if (modalVisible[0]) {
    return (
      <View
        style={[_s.content, {
          height: (wh.height - vs(120)) * windowHeightParameter,
          bottom: (wh.width * 0.025) + (bottom * 0.5)
        }]}
      >
        {renderContent()}
      </View>

    );
  } else {
    return null;
  }
};

export default EventDetailsModal;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  closeArea: {
    flex: 1,
  },
  content: {
    borderRadius: 40,
    backgroundColor: _c.smoke,
    position: 'absolute',
    paddingTop: '4%',
    paddingHorizontal: '4%',
    left: wh.width * 0.025,
    width: wh.width * 0.95,
    overflow: 'hidden',
  },
  modalMainContent: {
    flex: 1,
    alignItems: 'center'
  },
  gestureReconizer: {flex: 1}
});
