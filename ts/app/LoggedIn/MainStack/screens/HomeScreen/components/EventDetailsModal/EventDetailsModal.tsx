import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from 'react-native-size-matters';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import JoinSection from './components/JoinSection';
import Paragraph from './components/Paragraph';
import People from './components/People';
import PlaceAndTime from './components/PlaceAndTime';
import WindowHeader from './components/WindowHeader';

interface EventDetailsModalProps {
  modalVisible: [boolean, (x: boolean) => void];
}

const wh = Dimensions.get('screen');

const EventDetailsModal = ({modalVisible}: EventDetailsModalProps) => {
  const {bottom} = useSafeAreaInsets()
  if (modalVisible[0]) {
    return (
      <View style={[_s.content, {bottom: (wh.width * 0.025) + (bottom * 0.75)}]}>
        <WindowHeader />
        <View style={_s.modalMainContent}>
          <Paragraph />
          <PlaceAndTime joinState={'join'} />
          <JoinSection joinState={'full'} />
        </View>
        <People />
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
    borderRadius: 30,
    backgroundColor: _c.smoke,
    position: 'absolute',
    left: wh.width * 0.025,
    width: wh.width * 0.95,
    overflow: 'hidden',
    height: (wh.height - vs(120)) * 0.54,
    // height: (wh.height - vs(120)) * 0.56,
  },
  modalMainContent: {
    flex: 1,
    alignItems: 'center'
  }
});
