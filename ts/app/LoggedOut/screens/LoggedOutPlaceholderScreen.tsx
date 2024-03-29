import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Share,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import SvgTest from 'ts/app/common/components/SvgTest';
import TapMatchLogoRed from 'assets/svg/TapMatchLogo-red.svg';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {TapMatchContext} from 'ts/app/contexts/TapMatchContext';
import {_f} from 'ts/UIConfig/fonts';

import {s} from 'react-native-size-matters';
import YesNoModal from '../../common/components/YesNoModal';

const LoggedOutPlaceholderScreen = ({navigation}: any) => {
  const {LoggedIn} = useContext(TapMatchContext);
  const modalVisible = useState<boolean>(false);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'TapMatch is a cool app!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result, 'result-onn');
        } else {
          console.log(result, 'result-off');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('NOOOOOOOOOOOOO');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
      <YesNoModal
        onYesPress={() => console.log('onYesPress----onYesPress')}
        onNoPress={() => console.log('onNoPress-------onNoPress')}
        modalVisible={modalVisible}
        subtitle={'Note that if you quit,\nno draft will be saved'}
        title={'Are you sure\nYou want to\nleave create?'}
      />
      <ScrollView contentContainerStyle={{paddingBottom: '5%'}}>
        <View>
          <Text style={_s.txt}>LoggedOutPlaceholderScreen</Text>
          <Button title={'Log In'} onPress={() => LoggedIn[1](true)} />
          <Button title={'modal'} onPress={() => modalVisible[1](true)} />
          <Button
            title={'Camera'}
            onPress={() => navigation.navigate('AvatarCamera')}
          />
          <SvgTest />
          <TapMatchLogoRed width={90} height={90} />
          <Button title={'Share'} onPress={onShare} />

          <OTPInputView
            style={{width: '80%', height: 200}}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={_s.underlineStyleBase}
            codeInputHighlightStyle={_s.underlineStyleHighLighted}
            onCodeFilled={(code: string) => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoggedOutPlaceholderScreen;

const _s = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'blue', height: 500},
  txt: {fontFamily: _f.italic, fontSize: s(20), color: 'white'},
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
