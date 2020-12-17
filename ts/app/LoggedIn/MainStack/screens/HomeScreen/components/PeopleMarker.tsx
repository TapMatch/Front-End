import React, {useContext} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Marker, LatLng} from 'react-native-maps';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

//! to remove text without losing layout
//! comment out .topTxtContainer with children
//! set .container height to 200 - [.topTxtContainer height (current is 47)]

interface PeopleMarkerProps {
  coordinate: LatLng;
  eventDetailsModalVisible: [boolean, (x: boolean) => void];
}

const PeopleMarker = ({
  coordinate,
  eventDetailsModalVisible,
}: PeopleMarkerProps) => {
  const {userLocation, userToken, userProfile} = useContext(TapMatchContext);
  console.log(userProfile, 'AAAAAA');
  const txt = useLocalizedTxt();
  return (
    <Marker
      onPress={() => eventDetailsModalVisible[1](true)}
      coordinate={coordinate}>
      <View style={_s.container}>
        <View style={_s.topTxtContainer}>
          <Text numberOfLines={1} style={_s.topTxt}>
            🔥
          </Text>
          <Text numberOfLines={1} style={_s.topTxt}>
            Almost Full
          </Text>
        </View>

        <View style={_s.main}>
          <Image
            resizeMode={'stretch'}
            style={[
              _s.placeholderImg,
              _s.shadow,
              _s.placeholderImgBackLayer,
              {
                left: 70,
                top: 30,
              },
            ]}
            source={require('assets/png/PlaceholderPeopleImages/5.png')}
          />

          <Image
            resizeMode={'stretch'}
            style={[
              _s.placeholderImg,
              _s.shadow,
              _s.placeholderImgBackLayer,
              {left: 20, top: 60},
            ]}
            source={require('assets/png/PlaceholderPeopleImages/4.png')}
          />
          <Image
            resizeMode={'stretch'}
            style={[
              _s.placeholderImg,
              _s.shadow,
              _s.placeholderImgBackLayer,
              {right: 20, top: 60},
            ]}
            source={require('assets/png/PlaceholderPeopleImages/2.png')}
          />

          <Image
            resizeMode={'stretch'}
            style={[
              _s.placeholderImg,
              _s.shadow,
              _s.placeholderImgFrontLayer,
              {left: 29, top: 34},
            ]}
            source={require('assets/png/PlaceholderPeopleImages/1.png')}
          />
          <Image
            resizeMode={'stretch'}
            style={[
              _s.placeholderImg,
              _s.shadow,
              _s.placeholderImgFrontLayer,
              {right: 29, top: 34},
            ]}
            source={require('assets/png/PlaceholderPeopleImages/3.png')}
          />

          <View style={[_s.avatarContainer, , _s.shadow]}>
            <Image
              resizeMode={'cover'}
              style={_s.avatar}
              source={{
                uri:
                  'https://thumbs.dreamstime.com/z/person-gray-photo-placeholder-man-costume-white-background-person-gray-photo-placeholder-man-136701248.jpg',
              }}
            />
          </View>

          <View style={_s.oval} />
          <View style={_s.labelContainer}>
            <View style={[_s.whiteBox, _s.shadow]}>
              <Text style={_s.whiteBoxTxt}>{txt.baseball}</Text>
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
  topTxt: {
    fontFamily: _f.regularAlt,
    color: _c.black,
    fontSize: 20,
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
  placeholderImgBackLayer: {
    zIndex: 10,
  },
  placeholderImgFrontLayer: {
    zIndex: 20,
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
