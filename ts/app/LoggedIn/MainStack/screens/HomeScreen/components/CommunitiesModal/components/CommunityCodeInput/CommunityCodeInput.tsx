import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import CodeInputWindow from './components/CodeInputWindow/CodeInputWindow';
import SuccessMsgWindow from './components/SuccessMsgWindow';
import {CommunityCodeInputContext} from 'ts/app/contexts/CommunityCodeInputContext';
import {joinCommunity} from 'ts/app/common/api/joinCommunity';

interface CommunitiesScreenProps {
  communityItem: any;
  codeInputVisible: [boolean, (x: boolean) => void];
  communitiesModalVisible: [boolean, (x: boolean) => void];
}

const CommunityCodeInput = ({
  communityItem,
  codeInputVisible,
  communitiesModalVisible
}: CommunitiesScreenProps) => {
  const windowState = useState<boolean>(!communityItem[0].is_open);
  const {userProfile, userToken} = useContext(TapMatchContext);

  useEffect(() => {
    if (codeInputVisible[0]) {
      if (communityItem[0].is_open) {
        joinCommunity({
          userProfile,
          communityId: communityItem[0].id,
          userToken: userToken[0],
          windowState,
        });
      }
    }
  }, [codeInputVisible[0]]);

  const renderWindow = () => {
    return windowState[0] ? (
      <CodeInputWindow community={communityItem[0]} />
    ) : (
        <SuccessMsgWindow communitiesModalVisible={communitiesModalVisible} codeInputVisible={codeInputVisible} community={communityItem[0]} />
      );
  };
  return (

    <CommunityCodeInputContext.Provider value={{windowState, codeInputVisible}}>
      <View style={_s.content}>
        {renderWindow()}
      </View>
    </CommunityCodeInputContext.Provider>

  );
};

export default CommunityCodeInput;

const _s = StyleSheet.create({
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
    left: 0,
    bottom: 0,
    zIndex: 100,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
