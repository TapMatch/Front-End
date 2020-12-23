import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import TitleAndReturn from './components/TitleAndReturn';
import RequestCommunityBtn from './components/RequestCommunityBtn';
import FeedbackBtn from './components/FeedbackBtn';
import {useDimensions} from '@react-native-community/hooks';
import ListItemUnlocked from './components/ListItemUnlocked';
import ListItemLocked from './components/ListItemLocked';
import {getAllCommunities} from './api/getAllCommunities';
import googleMapStyle from "ts/constants/googleMapStyle.json";
import Modal from 'react-native-modal';

interface CommunitiesModalProps {
  modalVisible: [boolean, (x: boolean) => void];
}

const CommunitiesModal = ({modalVisible}: CommunitiesModalProps) => {
  const {top, bottom} = useSafeAreaInsets();
  const {height} = useDimensions().screen;
  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const communities = useState<any>(userProfile[0].communities);

  return (
    <Modal
      animationIn={'fadeIn'}
      animationInTiming={600}
      animationOut={'fadeOut'}
      hasBackdrop={false}
      animationOutTiming={600}
      isVisible={modalVisible[0]}
      style={_s.modal}>
      <View style={[_s.container]}>
        <View style={[_s.content, {paddingTop: 60 + top}]}>
          <TitleAndReturn />
          <View style={_s.middle}>
            <FlatList
              contentContainerStyle={{paddingHorizontal: '7%'}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={communities[0]}
              renderItem={({item, index, separators}) => {
                const c = userProfile[0].communities.find((el: any) => {
                  return el.id === item.id;
                });
                return c ? (
                  <ListItemUnlocked item={{...item, access: c.access}} />
                ) : (
                    <ListItemLocked item={item} />
                  );
              }}
            />
          </View>
          <View
            style={[
              _s.bottom,
              {
                paddingTop: height * 0.02,
                paddingBottom: height * 0.02 + bottom,
              },
            ]}>
            <RequestCommunityBtn />
            <FeedbackBtn />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommunitiesModal;

const _s = StyleSheet.create({
  modal: {margin: 0},
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },

  middle: {
    minWidth: '100%',
    flex: 0.8,
  },
  bottom: {
    flex: 0.2,
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    backgroundColor: _c.modalbackground,
    left: 0,
    bottom: 0,
    zIndex: 100,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
