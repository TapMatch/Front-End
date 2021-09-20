import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import StartBtn from './components/StartBtn';
import useLocalizedTxt from 'ts/localization/useLocalizedTxt';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {formatWidth, formatHeight} from 'ts/utils/format-size';
import BackBtn from './components/BackBtn';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import CloseIcon from 'assets/svg/close-black.svg';

interface TagsScreenProps {
  navigation: any;
}

const iconSize = _fs.xxl * 0.5;

const TagsScreen = ({navigation}: TagsScreenProps) => {
  const txt = useLocalizedTxt();

  return (
    <View style={_s.container}>
      <View style={_s.top}>
        <BackBtn />
        <Title />
        <Subtitle />
      </View>

      <TextInput
        autoCompleteType={'off'}
        autoCorrect={false}
        autoFocus={false}
        maxLength={12}
        style={_s.input}
        placeholder={'Shotgunning'}
        value={''}
      />

      <View style={{flex: 1, margin: formatHeight(24)}}>
        <View style={_s.selected_tag_view}>
          <View style={_s.flexRow}>
            <Text style={_s.txt_hash}>#</Text>
            <View>
              <Text style={_s.txt_Red}>⚽ Soccer</Text>
              <Text style={_s.txt_Grey}>tagged by 300 Tappers</Text>
            </View>
          </View>
          <View
            style={{paddingHorizontal: formatHeight(24), alignSelf: 'center'}}>
            <CloseIcon height={iconSize} width={iconSize} />
          </View>
        </View>

        <View style={_s.mainflexrow}>
          <View style={_s.flexRow}>
            <Text style={_s.txt_hash}>#</Text>
            <View>
              <Text style={_s.txt_Head}>📖 Firstyears</Text>
              <Text style={_s.txt_Grey}>tagged by 300 Tappers</Text>
            </View>
          </View>
          <TouchableOpacity style={_s.red_Border}>
            <Text style={_s.txt_Red}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={_s.borderView} />

        <View style={_s.mainflexrow}>
          <View style={_s.flexRow}>
            <Text style={_s.txt_hash}>#</Text>
            <View>
              <Text style={_s.txt_Head}>Party</Text>
              <Text style={_s.txt_Grey}>tagged by 300 Tappers</Text>
            </View>
          </View>
          <TouchableOpacity style={_s.red_Border}>
            <Text style={_s.txt_Red}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={_s.borderView} />

        <View style={_s.mainflexrow}>
          <View style={_s.flexRow}>
            <Text style={_s.txt_hash}>#</Text>
            <View>
              <Text style={_s.txt_Head}>Shotgunning</Text>
              <Text style={_s.txt_Grey}>not tagged by anyone</Text>
            </View>
          </View>
          <TouchableOpacity style={_s.red_Border}>
            <Text style={_s.txt_Red}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StartBtn />
    </View>
  );
};

export default TagsScreen;

const _s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _c.white,
  },
  selected_tag_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: formatHeight(16),
    backgroundColor: '#f7f7f7',
    borderRadius: 26,
  },
  borderView: {
    backgroundColor: _c.grey,
    height: 0.4,
    marginHorizontal: formatHeight(10),
  },
  mainflexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: formatHeight(24),
    paddingHorizontal: formatHeight(12),
  },
  flexRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  top: {
    paddingTop: formatHeight(62),
    paddingBottom: formatHeight(25),
    backgroundColor: _c.white,
  },
  input: {
    height: '5%',
    width: '85%',
    borderRadius: 24,
    alignSelf: 'center',
    overflow: 'visible',
    //textAlign: 'left',
    textAlignVertical: 'center',
    paddingVertical: 0,
    paddingHorizontal: 16,
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
    backgroundColor: '#f8fafd',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: _c.white,
    width: formatWidth(300),
    paddingTop: formatWidth(56),
    paddingLeft: formatWidth(47),
    paddingRight: formatWidth(50),
    paddingBottom: formatWidth(56),
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _c.white,
  },
  txt: {
    color: _c.secondaryText,
    fontSize: _fs.xl,
    fontFamily: _f.bold,
    lineHeight: formatWidth(23),
  },
  txt_Head: {
    color: _c.black,
    fontFamily: _f.regular,
    fontSize: _fs.m,
  },
  txt_Red: {
    color: _c.main_red,
    fontFamily: _f.regularAlt,
    fontSize: _fs.m,
  },
  txt_Grey: {
    color: _c.grey,
    marginTop: formatHeight(4),
    fontFamily: _f.regularAlt,
    fontSize: _fs.s,
  },
  txt_hash: {
    fontSize: _fs.x5l,
    color: _c.main_red,
    fontFamily: _f.regularAlt,
    marginRight: 6,
  },
  red_Border: {
    padding: formatHeight(12),
    paddingHorizontal: formatHeight(20),
    borderColor: _c.main_red,
    borderWidth: 1,
    borderRadius: 16,
  },
});
