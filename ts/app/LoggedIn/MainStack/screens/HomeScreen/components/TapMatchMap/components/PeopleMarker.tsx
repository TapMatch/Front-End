import React, {Fragment, useContext} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Marker, LatLng} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';

//! to remove text without losing layout
//! comment out .topTxtContainer with children
//! set .container height to 200 - [.topTxtContainer height (current is 47)]

interface PeopleMarkerProps {
  coordinate: LatLng;
  eventDetailsModalVisible: [boolean, (x: boolean) => void];
  focusMapToLatLng: (x: LatLng) => void;
  item: any;
}

const PeopleMarker = ({
  item,
  coordinate,
  eventDetailsModalVisible,
  focusMapToLatLng
}: PeopleMarkerProps) => {
  const {members, name, join_limit, organizer} = item;
  const {selectedMarkerData} = useContext(MainStackContext);

  const positionArr = [
    {position: {left: 70, top: 30}, style: 0},
    {position: {left: 20, top: 60}, style: 0},
    {position: {left: 20, top: 60}, style: 0},
    {position: {left: 29, top: 34}, style: 1},
    {position: {left: 29, top: 34}, style: 1},
  ];
  const layers = [
    {
      zIndex: 10,
    },
    {
      zIndex: 20,
    },
  ];
  return (
    <Marker
      onPress={() => {
        focusMapToLatLng(coordinate);
        eventDetailsModalVisible[1](true);
        selectedMarkerData[1](item);
      }}
      coordinate={coordinate}>
      <View style={_s.container}>
        <View style={_s.topTxtContainer}>
          {join_limit - members.length < join_limit * 0.8 && members.length !== join_limit && <Fragment>
            <Text numberOfLines={1} style={_s.topTxt}>
              🔥
          </Text>
            <Text numberOfLines={1} style={_s.topTxt}>
              Almost Full
          </Text>
          </Fragment>}
        </View>

        <View style={_s.main}>
          {members.map((el: any, ind: number) =>
            <Image
              resizeMode={'center'}
              style={[
                _s.placeholderImg,
                _s.memberAvatarContainer,
                _s.shadow,
                layers[positionArr[ind].style],
                positionArr[ind].position,
              ]}
              source={{
                uri: el.avatar
              }}
            />)}


          <View style={[_s.avatarContainer, , _s.shadow]}>
            <Image
              resizeMode={'cover'}
              style={_s.avatar}
              source={{
                uri: organizer.avatar
              }}
            />
          </View>

          {members.length > 0 && <View style={_s.oval} />}
          <View style={_s.labelContainer}>
            <View style={[_s.whiteBox, _s.shadow]}>
              <Text numberOfLines={1} style={_s.whiteBoxTxt}>{name}</Text>
            </View>
            <View style={_s.triangle} />
          </View>
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
    opacity: 0,
    fontFamily: _f.regularAlt,
    color: _c.black,
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  topTxtContainer: {
    height: 47,
    justifyContent: 'center',
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
    top: 70,
    left: 56,
    backgroundColor: _c.main_red,
    opacity: 0.22,
    width: 85,
    height: 63,
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
