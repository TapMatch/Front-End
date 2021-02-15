import React, {Fragment, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Modal} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import TitleAndReturn from './components/TitleAndReturn';
import RequestCommunityBtn from './components/RequestCommunityBtn';
import FeedbackBtn from './components/FeedbackBtn';
import {useDimensions} from '@react-native-community/hooks';
import ListItemUnlocked from './components/ListItemUnlocked';
import {getUpcomingEvents} from 'ts/app/common/api/getUpcomingEvents';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import {getAllCommunities} from 'ts/app/common/api/getAllCommunities';
import ListItemLocked from './components/ListItemLocked';
import CommunityCodeInput from './components/CommunityCodeInput/CommunityCodeInput';

interface CommunitiesModalProps {
  selectedCommunityData: any;
}

const CommunitiesModal = ({selectedCommunityData}: CommunitiesModalProps) => {
  const {top, bottom} = useSafeAreaInsets();
  const {height} = useDimensions().screen;
  const {userToken, userProfile, LoggedIn, user_has_passed_onboarding} = useContext(TapMatchContext);
  const myCommunities = useState<any>([]);

  const {upcomingEvents, eventMarkers, upcomingEventsListIsOpen, communitySelectedForJoin, allCommunities, communitiesModalVisible, communityCodeInputVisible} = useContext(MainStackContext);

  const selectItem = (item: any) => {
    communitySelectedForJoin[1](item);
    communityCodeInputVisible[1](true);
  };

  useEffect(() => {
    if (!communitiesModalVisible[0]) {
      communitySelectedForJoin[1]({});
    }
  }, [communitiesModalVisible[0]]);

  useEffect(() => {
    getAllCommunities({
      userToken: userToken[0],
      communities: allCommunities,
      LoggedIn,
      userProfile,
      user_has_passed_onboarding
    }).then(() => {
      const cleanCommunitiesList = allCommunities[0].filter((el: any) => {
        const ind = userProfile[0].communities[0].findIndex((item: any) => item.id === el.id);
        return ind === -1;
      });
      const open_communities = cleanCommunitiesList.filter((el: any) => el.is_open);
      const closed_communities = cleanCommunitiesList.filter((el: any) => !el.is_open);

      myCommunities[1]([...userProfile[0].communities[0], ...open_communities, ...closed_communities]);
    });
  }, [communitiesModalVisible[0], userProfile[0].communities[0]]);

  const renderContent = () => {
    if (communityCodeInputVisible[0]) {
      return <CommunityCodeInput communitiesModalVisible={communitiesModalVisible} communityItem={communitySelectedForJoin} codeInputVisible={communityCodeInputVisible} />;
    } else {
      return (<Fragment>
        <TitleAndReturn modalVisible={communitiesModalVisible} />
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
                    upcomingEvents,
                    LoggedIn,
                    userProfile,
                    user_has_passed_onboarding,
                  });
                  getEventMarkers({
                    id: item.id,
                    userToken: userToken[0],
                    eventMarkers,
                    LoggedIn,
                    userProfile,
                    user_has_passed_onboarding
                  });
                  communitiesModalVisible[1](false);
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
      transparent={true}
      visible={communitiesModalVisible[0]}
      style={_s.modal}>
      <View style={[_s.container]}>
        <View style={[_s.content, {paddingTop: 30 + top}]}>
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
    backgroundColor: _c.modalbackground,
    position: 'relative',
    flex: 1
  },

  middle: {
    minWidth: '100%',
    flex: 0.85,
    paddingBottom: 5,
  },
  bottom: {
    flex: 0.15,
    marginBottom: '7%',
    // height: vs(45) * 2 + 15,
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
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
