import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import {_f} from 'ts/UIConfig/fonts';
import {formatHeight} from 'ts/utils/format-size';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Title from './components/Title';
import {vs} from 'react-native-size-matters';
import BlackGradient from 'ts/app/common/components/BlackGradient';
import {FlatList} from 'react-native-gesture-handler';
import AvatarBtn from './components/AvatarBtn';
import GalleryIcon from 'assets/svg/gallery.svg';
import CameraIcon from 'assets/svg/camera.svg';

interface ChatScreenProps {
  navigation: any;
}

const ChatScreen = ({navigation}: ChatScreenProps) => {
  const {top} = useSafeAreaInsets();
  let chat_Data = [
    {
      user_id: 1,
      type: 'text',
      message: 'Yo bro you coming for sure?',
      time: '2:30',
    },
    {
      user_id: 1,
      type: 'text',
      time: '2:30',
      message: 'I’m on my way soon, guys!',
    },
    {
      user_id: 2,
      type: 'text',
      name: 'Leon',
      time: '2:30',
      message: 'Let’s go! Really motivated today',
    },
    {
      user_id: 3,
      name: 'Alebrto',
      time: '2:30',
      type: 'text',
      message: 'Let’s meet today',
    },
    {
      user_id: 3,
      name: 'Alebrto',
      time: '2:30',
      type: 'image',
      message: 'Let’s meet today',
    },
    {
      user_id: 1,
      name: 'Alebrto',
      time: '2:30',
      type: 'text',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];
  const iconSize = _fs.xxl * 1.1;

  const renderItem = ({item}) => (
    <>
      <View style={{flexDirection: item.user_id == '1' ? 'column' : 'row'}}>
        {item.user_id == '1' ? null : (
          <View>
            <Text style={_s.txtUsername}>{item.name}</Text>
            <AvatarBtn />
            <Text
              style={{
                fontSize: _fs.xxs,
                margin: 8,
                textAlign: 'center',
              }}>
              {item.time}
            </Text>
          </View>
        )}
        <View>
          <View
            style={[
              _s.item,
              {
                alignSelf: item.user_id == '1' ? 'flex-end' : 'flex-start',
                backgroundColor:
                  item.type == 'image'
                    ? 'transparent'
                    : item.user_id == '1'
                    ? _c.black
                    : '#F8FAFD',
                borderBottomRightRadius: item.user_id == '1' ? 0 : 16,
                borderBottomLeftRadius: item.user_id == '1' ? 16 : 0,
              },
            ]}>
            {item.type == 'text' ? (
              <Text
                style={[
                  _s.title,
                  {
                    color: item.user_id == '1' ? _c.white : _c.black,
                  },
                ]}>
                {item.message}
              </Text>
            ) : (
              <Image
                source={require('assets/png/marathon.png')}
                style={{width: 300, height: 300, borderRadius: 32}}
              />
            )}
          </View>
          <Image
            source={
              item.user_id == '1'
                ? require('assets/png/tip_right.png')
                : require('assets/png/tip_left.png')
            }
            style={[
              _s.tipImage,
              {alignSelf: item.user_id == '1' ? 'flex-end' : 'flex-start'},
            ]}
          />
        </View>
      </View>
      {item.user_id == '1' && (
        <Text
          style={[
            _s.txt_time,
            {alignSelf: item.user_id == '1' ? 'flex-end' : 'flex-start'},
          ]}>
          {item.time}
        </Text>
      )}
    </>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : null}
      style={[_s.container]}>
      {/* Header */}
      <>
        <View style={[_s.top, {paddingTop: top}]}>
          <Title />
        </View>
        <View pointerEvents={'none'} style={[_s.shadowContainer]}>
          <BlackGradient />
        </View>
      </>

      <ScrollView bounces={false}>
        <View style={{margin: formatHeight(6)}} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={chat_Data}
          renderItem={renderItem}
          style={{margin: 12}}
          keyExtractor={(item) => item.user_id.toString()}
        />
      </ScrollView>
      <View
        style={{
          backgroundColor: '#FFF',
          bottom: 0,
          marginHorizontal: 10,
          overflow: 'visible',
          height: vs(60),
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TextInput
          style={[
            _s.input,
            {
              alignSelf: 'center',
            },
          ]}
          placeholder="Message Here"
          underlineColorAndroid="transparent"
          multiline={true}
          numberOfLines={5}
        />
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <GalleryIcon height={iconSize} width={iconSize} />
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <CameraIcon height={iconSize} width={iconSize} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const _s = StyleSheet.create({
  item: {
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 16,
  },
  title: {
    fontSize: _fs.s,
  },
  shadowContainer: {
    position: 'absolute',
    left: 0,
    top: vs(120),
    zIndex: 80,
    height: 60,
    minWidth: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: _c.white,
  },
  top: {
    height: vs(120),
    minWidth: '100%',
    justifyContent: 'center',
    backgroundColor: _c.smoke,
  },
  txt_Head: {
    color: _c.black,
    fontFamily: _f.regularAlt,
    fontSize: _fs.s,
  },
  input: {
    //  position: 'absolute', left: 10, right: 0,
    //  height: '60%',
    width: '70%',
    borderRadius: 24,
    alignSelf: 'center',
    overflow: 'visible',
    //textAlign: 'left',
    textAlignVertical: 'center',
    padding: 16,
    fontFamily: _f.eRegular,
    fontSize: _fs.s,
    backgroundColor: '#F8FAFD',
  },
  txt_time: {
    fontSize: _fs.xxs,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  tipImage: {
    width: 10,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  txtUsername: {
    textAlign: 'center',
    color: _c.black,
    fontSize: _fs.s,
    fontFamily: _f.bold,
    marginBottom: 8,
  },
});
