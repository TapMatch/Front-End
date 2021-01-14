import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';
import GestureRecognizer from 'react-native-swipe-gestures';
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
  eventJoinState: 'join' | 'full' | 'joined';
}

const wh = Dimensions.get('window');

const EventDetailsModal = ({modalVisible, eventJoinState}: EventDetailsModalProps) => {
  const {bottom} = useSafeAreaInsets();
  const renderWindowHeader = () => {
    if (eventJoinState === 'joined') {
      return <JoinedWindowHeader />;
    } else {
      return <StdWindowHeader eventJoinState={eventJoinState} />;
    }
  };
  const windowHeightParameter = eventJoinState === 'joined' ? 0.565 : 0.545;

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  if (modalVisible[0]) {
    return (
      <GestureRecognizer
        onSwipeDown={() => modalVisible[1](false)}
        config={config}
        style={[_s.content, {
          height: (wh.height - vs(120)) * windowHeightParameter,
          bottom: (wh.width * 0.025) + (bottom * 0.5)
        }]}
      >

        {renderWindowHeader()}
        <View style={_s.modalMainContent}>
          <Paragraph />
          <PlaceAndTime eventJoinState={eventJoinState} />
          <JoinSection eventJoinState={eventJoinState} />
        </View>
        <People />
      </GestureRecognizer>

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
  }
});
