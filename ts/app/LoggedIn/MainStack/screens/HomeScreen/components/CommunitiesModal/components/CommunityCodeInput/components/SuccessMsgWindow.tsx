import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_f} from 'ts/UIConfig/fonts';
import {_fs} from 'ts/UIConfig/fontSizes';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {vs} from 'react-native-size-matters';
import CheckCircleRed from 'assets/svg/check-circle-red.svg';
import LockOpenWhite from 'assets/svg/lock-open-white.svg';
import {CommunityCodeInputContext} from 'ts/app/contexts/CommunityCodeInputContext';
import {useDimensions} from '@react-native-community/hooks';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';

interface CodeInputWindowProps {
  community: any;
  codeInputVisible: [boolean, (x: boolean) => void];
  communitiesModalVisible: [boolean, (x: boolean) => void];

}

const SuccessMsgWindow = ({community, codeInputVisible, communitiesModalVisible}: CodeInputWindowProps) => {
  const txt = useLocalizedTxt();
  const {windowState} = useContext(CommunityCodeInputContext);
  const {selectedCommunityData} = useContext(MainStackContext);
  const {userProfile} = useContext(TapMatchContext);

  const circleCheckRedSize = vs(70);
  const lockOpenWhiteSize = vs(55);
  const {height} = useDimensions().screen;
  const {name, city} = community;

  const moveOnTrigger = useState<boolean>(false);

  const moveOn = () => {
    communitiesModalVisible[1](false);
    if (userProfile[0]) {
      const new_community = userProfile[0].communities[0].find((el: any) => el.id === community.id);
      if (new_community) {
        selectedCommunityData[1](new_community);
      }
    }
    codeInputVisible[1](false);
    windowState[1](true);
    moveOnTrigger[1](false);
  };

  useEffect(() => {
    if (moveOnTrigger[0]) {
      moveOn();
    }
  }, [moveOnTrigger]);

  const handleReturnToHomeScreen = () => {
    if (windowState[0] === false) {
      moveOnTrigger[1](!moveOnTrigger[0]);
    }
  };

  useEffect(() => {
    const redirect_timer = setTimeout(handleReturnToHomeScreen, 7000);
    return () => clearTimeout(redirect_timer);
  }, []);

  return (
    <TouchableOpacity style={_s.btn} onPress={moveOn} activeOpacity={1}>
      <View
        style={[_s.container, {maxHeight: height * 0.52}]}>
        <CheckCircleRed height={circleCheckRedSize} width={circleCheckRedSize} />
        <Text style={[_s.txt, _s.msg]}>{txt.youAreNowAPartOf}</Text>
        <View style={_s.txtContainer}>
          <Text style={[_s.txt, _s.title]}>{name}</Text>
          <Text style={[_s.txt, _s.city]}>{city}</Text>
        </View>
        <LockOpenWhite height={lockOpenWhiteSize} width={lockOpenWhiteSize} />
      </View>
    </TouchableOpacity>
  );
};

export default SuccessMsgWindow;

const _s = StyleSheet.create({
  btn: {flex: 1},
  container: {
    paddingVertical: vs(40),
    paddingHorizontal: _fs.xs,
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    backgroundColor: _c.unlockedCommunityBtn,
    width: '80%',
    borderRadius: 20,
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: _f.regularAlt,
  },
  content: {
    flex: 1,
    minWidth: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txtContainer: {
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: _fs.x5l * 1.3,
    color: _c.main_red,
    marginBottom: 2,
  },
  city: {
    fontSize: _fs.xxl * 1.1,
    color: _c.main_red,
  },
  msg: {
    fontSize: _fs.l,
    color: _c.white,
  },
});
