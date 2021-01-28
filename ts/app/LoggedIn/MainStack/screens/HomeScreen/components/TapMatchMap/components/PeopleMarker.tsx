import React, {Fragment, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Marker, LatLng} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import FastImage from 'react-native-fast-image';
import {getEventById} from 'ts/app/common/api/getEventById';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';

//! to remove text without losing layout
//! comment out .topTxtContainer with children
//! set .container height to 200 - [.topTxtContainer height (current is 47)]

interface PeopleMarkerProps {
  coordinate: LatLng;
  eventDetailsModalVisible: [boolean, (x: boolean) => void];
  item: any;
}

const PeopleMarker = ({
  item,
  coordinate,
  eventDetailsModalVisible,
}: PeopleMarkerProps) => {

  const {last_members, name, join_limit, organizer, id, joined, community_id} = item;
  const {selectedMarkerData, requestingEventDetailsInProcess} = useContext(MainStackContext);
  const {userToken, LoggedIn} = useContext(TapMatchContext);
  const {focusMapToLatLng} = useContext(HomeScreenContext);
  const len = last_members.length;
  const positionArr = [//5
    {position: {left: 28, top: 70}, style: 0},// 0
    {position: {right: 32, top: 70}, style: 0},// 1
    {position: {left: 50, top: 36}, style: len === 4 ? 3 : 1},// 2 but zIndex under 0's if length 3
    {position: {right: 52, top: 36}, style: 1},// 3
    {position: {left: 73, top: 28}, style: 2},// 4
  ];

  const layers = [
    {
      zIndex: 100,
    },
    {
      zIndex: 200,
    },
    {
      zIndex: 300,
    },
    {
      zIndex: 90,
    },
  ];

  const renderImages = (last_members: any) => {
    const images: any = [];
    for (let ind = 0; ind < last_members.length; ind++) {
      const img = <FastImage
        key={last_members[ind].avatar}
        style={[
          _s.placeholderImg,
          _s.memberAvatarContainer,
          _s.shadow,
          layers[positionArr[ind].style],
          positionArr[ind].position,
        ]}
        source={{
          cache: FastImage.cacheControl.web,
          uri: last_members[ind].avatar
        }}
      />;
      images.push(img);
    }
    return images;
  };
  const renderLabel = () => {
    if (selectedMarkerData[0].id === id && eventDetailsModalVisible[0]) {
      return null;
    } else {
      return (
        <View style={_s.labelContainer}>
          <View style={[_s.whiteBox, _s.shadow]}>
            <Text numberOfLines={1} style={_s.whiteBoxTxt}>{name}</Text>
          </View>
          <View style={_s.triangle} />
        </View>
      );
    }
  };
  return (
    <Marker
      onPress={() => {
        focusMapToLatLng(item.coordinates);
        if (selectedMarkerData[0].id !== id) {
          getEventById({
            event_id: id,
            community_id,
            userToken,
            selectedMarkerData,
            eventDetailsModalVisible,
            requestingEventDetailsInProcess,
            LoggedIn
          });
        } else {
          eventDetailsModalVisible[1](true);
        }
        // selectedMarkerData[1](item);
      }}
      tracksViewChanges={true}
      zIndex={+id}
      coordinate={coordinate}>
      <View style={_s.container}>
        <View style={_s.topTxtContainer}>
          {
            joined >= join_limit * 0.7
            &&
            +joined !== +join_limit
            &&
            <Fragment>
              <Text numberOfLines={1} style={_s.topTxt}>
                🔥
              </Text>
              <Text numberOfLines={1} style={_s.topTxt}>
                Almost Full
              </Text>
            </Fragment>
          }
        </View>

        <View style={_s.main}>
          {renderImages(last_members)}
          <View style={[_s.avatarContainer, _s.shadow]}>
            <FastImage
              style={_s.avatar}
              source={{
                uri: organizer.avatar
              }}
            />
          </View>

          {last_members.length > 0 && <View style={_s.oval} />}
          {renderLabel()}
        </View>
      </View>
    </Marker>
  );
};

export default PeopleMarker;

const _s = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    // borderWidth: 2,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    borderColor: 'transparent',
    borderBottomColor: _c.white,
    transform: [{rotate: `180deg`}],
  },
  avatarContainer: {
    top: 72,
    left: 73,
    position: 'absolute',
    borderRadius: 300,
    borderWidth: 5,
    borderColor: _c.main_red,
    zIndex: 100,
    height: 50,
    width: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
  },
  memberAvatarContainer: {
    borderRadius: 300,
    borderWidth: 5,
    borderColor: _c.white,
    zIndex: 100,
    height: 50,
    width: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTxt: {
    opacity: 1,
    fontFamily: _f.regularAlt,
    color: _c.black,
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  topTxtContainer: {
    height: 47,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  main: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  whiteBox: {
    height: 'auto',
    width: 'auto',
    padding: 8,
    backgroundColor: _c.white,
    borderRadius: 6,
  },
  whiteBoxTxt: {
    fontFamily: _f.regular,
    color: _c.black,
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  labelContainer: {
    alignItems: 'center',
  },
  oval: {
    zIndex: 0,
    position: 'absolute',
    top: 75,
    left: 59,
    backgroundColor: _c.main_red,
    opacity: 0.22,
    width: 80,
    height: 57,
    borderRadius: 50,
    transform: [{scaleX: 2}],
  },
  placeholderImg: {
    height: 70,
    width: 70,
    position: 'absolute',
  },

  shadow: {
    shadowColor: _c.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
