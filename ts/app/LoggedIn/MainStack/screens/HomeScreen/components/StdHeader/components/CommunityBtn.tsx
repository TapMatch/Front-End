import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import ChevronDownRed from 'assets/svg/chevron-down-red.svg';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenContext} from 'ts/app/contexts/HomeScreenContext';
import {MainStackContext} from 'ts/app/contexts/MainStackContext';

interface CommunityBtnProps {}

const CommunityBtn = (props: CommunityBtnProps) => {
  const {navigate} = useNavigation();
  const {communitiesModalVisible} = useContext(HomeScreenContext);
  const {selectedCommunityData} = useContext(MainStackContext);
  const {name, id, city, access, count, members} = selectedCommunityData[0];
  console.log(count, 'count')
  console.log(selectedCommunityData[0], 'selectedCommunityData')
  return (
    <TouchableOpacity
      onPress={() => communitiesModalVisible[1](true)}
      style={[_s.container, _s.shadow]}>
      <View style={_s.txtContainer}>
        <View style={_s.titleContainer}>
          <Text style={[_s.txt, _s.title]}>{name}</Text>
          <ChevronDownRed height={_fs.xl} width={_fs.xl} />
        </View>
        <Text style={[_s.txt, _s.usersNum]}>{ members ? members.length : count} Members</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityBtn;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '70%',
    borderRadius: 20,
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: _c.black,
  },
  title: {
    marginRight: 8,
    marginBottom: 5,
    fontFamily: _f.eRegular,
    fontSize: _fs.xl,
  },
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  usersNum: {
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
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
