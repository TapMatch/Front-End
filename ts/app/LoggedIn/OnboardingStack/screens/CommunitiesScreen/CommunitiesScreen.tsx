import React, {Fragment, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import Title from './components/Title';
import RequestCommunityBtn from './components/RequestCommunityBtn';
import FeedbackBtn from './components/FeedbackBtn';
import {useBackHandler, useDimensions} from '@react-native-community/hooks';
import ListItemUnlocked from './components/ListItemUnlocked';
import ListItemLocked from './components/ListItemLocked';
import {getAllCommunities} from 'ts/app/common/api/getAllCommunities';
import googleMapStyle from "ts/constants/googleMapStyle.json";
import CommunityCodeInput from './components/CommunityCodeInput/CommunityCodeInput';

interface CommunitiesScreenProps {
  navigation: any;
}

const CommunitiesScreen = ({navigation}: CommunitiesScreenProps) => {
  const {top, bottom} = useSafeAreaInsets();
  const {height} = useDimensions().screen;
  const isFocused = useIsFocused();
  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  const communities = useState<any>([]);
  const codeInputVisible = useState<boolean>(false);
  const selectedCommunity = useState<any>({});
  const coordinates = userLocation[0];

  // FOR TESTING PURPOSES ONLY REMOVE IN PRODUCTION
  const testingMode = useState<boolean>(false);

  useBackHandler(() => false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getAllCommunities({
      userToken: userToken[0],
      communities,
    });
  }, []);




  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllCommunities({
        userToken: userToken[0],
        communities,
      });
    });
    return unsubscribe;
  }, []);


  const selectItem = (item: any) => {
    selectedCommunity[1](item);
    codeInputVisible[1](true);
  };
  const renderContent = () => {
    if (codeInputVisible[0]) {
      return <CommunityCodeInput communityItem={selectedCommunity} modalVisible={codeInputVisible} />;
    } else {
      return <Fragment>
        <Title />
        <View style={_s.middle}>
          <FlatList
            contentContainerStyle={{paddingHorizontal: '7%'}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={communities[0]}
            renderItem={({item}) => {
              const c = userProfile[0].communities[0].find((el: any) => {
                return el.id === item.id;
              });
              {/* FOR TESTING PURPOSES ONLY REMOVE IN PRODUCTION */}
              const cond = testingMode[0] ? false : c;
              {/**/}
              return cond ? (
                <ListItemUnlocked item={{...item, access: c.access}} />
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
          {/* <FeedbackBtn /> */}
          {/* FOR TESTING PURPOSES ONLY REMOVE IN PRODUCTION */}
          <FeedbackBtn testingMode={testingMode} />
        </View>
      </Fragment>;
    }
  };

  if (isFocused) {
    return (
      <View style={[_s.container]}>
        { <View style={[_s.content, {paddingTop: 60 + top}]}>
          {renderContent()}
        </View>}
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={googleMapStyle}
          zoomEnabled={true}
          style={_s.map}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          region={{
            ...coordinates,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    );
  } else {
    return null;
  }
};

export default CommunitiesScreen;

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
