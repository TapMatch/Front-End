import React, {Fragment, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import TitleAndReturn from './components/TitleAndReturn';
import RequestCommunityBtn from './components/RequestCommunityBtn';
import FeedbackBtn from './components/FeedbackBtn';
import {useDimensions} from '@react-native-community/hooks';
import ListItemUnlocked from './components/ListItemUnlocked';
import Modal from 'react-native-modal';
import {getUpcomingEvents} from 'ts/app/common/api/getUpcomingEvents';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import {getAllCommunities} from 'ts/app/common/api/getAllCommunities';
import ListItemLocked from './components/ListItemLocked';
import CommunityCodeInput from './components/CommunityCodeInput/CommunityCodeInput';

interface CommunitiesModalProps {
  modalVisible: [boolean, (x: boolean) => void];
  selectedCommunityData: any;
}

const CommunitiesModal = ({modalVisible, selectedCommunityData}: CommunitiesModalProps) => {
  const {top, bottom} = useSafeAreaInsets();
  const {height} = useDimensions().screen;
  const {userToken, userProfile} = useContext(TapMatchContext);
  const myCommunities = useState<any>([]);
  const allCommunities = useState<any>([]);
  const codeInputVisible = useState<boolean>(false);
  const selectedCommunity = useState<any>({});

  const {upcomingEvents, eventMarkers, upcomingEventsListIsOpen} = useContext(MainStackContext);

  const selectItem = (item: any) => {
    selectedCommunity[1](item);
    codeInputVisible[1](true);
  };

  useEffect(() => {
    if (!modalVisible[0]) {
      selectedCommunity[1]({});
    }
  }, [modalVisible[0]]);

  useEffect(() => {
    getAllCommunities({
      userToken: userToken[0],
      communities: allCommunities,
    }).then(() => {
      const cleanCommunitiesList = allCommunities[0].filter((el: any) => {
        const ind = userProfile[0].communities[0].findIndex((item: any) => item.id === el.id);
        return ind === -1;
      });
      myCommunities[1]([...userProfile[0].communities[0], ...cleanCommunitiesList]);
    });

  }, [modalVisible[0], userProfile[0].communities[0]]);

  const renderContent = () => {
    if (codeInputVisible[0]) {
      return <CommunityCodeInput communityItem={selectedCommunity} codeInputVisible={codeInputVisible} />;
    } else {
      return (<Fragment>
        <TitleAndReturn modalVisible={modalVisible} />
        <View style={_s.middle}>
          <FlatList
            keyExtractor={(item: any) => `community-${item?.id}-${item.name}`}
            contentContainerStyle={{paddingHorizontal: '7%'}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={myCommunities[0]}
            renderItem={({item}) => {
              const c = userProfile[0].communities[0].find((el: any) => {
                return el.id === item.id;
              });
              return c ? (
                <ListItemUnlocked onPress={() => {
                  selectedCommunityData[1](item);
                  upcomingEventsListIsOpen[1](false);
                  getUpcomingEvents({
                    communityId: item.id,
                    userToken: userToken[0],
                    upcomingEvents
                  });
                  getEventMarkers({
                    id: item.id,
                    userToken: userToken[0],
                    eventMarkers
                  });
                  modalVisible[1](false);
                }} item={{...item, access: c.access}} />
              ) : (
                  <ListItemLocked selectItem={selectItem} item={item} />
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
      </Fragment>);
    }
  };
  return (
    <Modal
      animationIn={'fadeIn'}
      animationInTiming={600}
      animationOut={'fadeOut'}
      // hasBackdrop={false}
      animationOutTiming={600}
      isVisible={modalVisible[0]}
      style={_s.modal}>
      <View style={[_s.container]}>
        <View style={[_s.content, {paddingTop: 60 + top}]}>
          {renderContent()}
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
    flex: 1
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
