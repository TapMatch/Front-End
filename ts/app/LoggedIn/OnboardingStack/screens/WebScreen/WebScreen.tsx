import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {_c} from 'ts/UIConfig/colors';
import {_fs} from 'ts/UIConfig/fontSizes';
import CloseButton from './components/CloseButton';
import WebLoader from './components/WebLoader';

const WebScreen = ({navigation, route}: any) => {
  const {top, bottom} = useSafeAreaInsets();
  const loadComplete = useState<boolean>(false);

  return (
    <View style={[_s.container, {paddingTop: top, paddingBottom: bottom}]}>
      {loadComplete[0] && <CloseButton onPress={() => navigation.goBack()} />}
      <WebView
        startInLoadingState={true}
        onLoadEnd={() => loadComplete[1](true)}
        renderLoading={() => <WebLoader />}
        source={{
          uri: route.params.url,
        }}
        style={_s.webView}
      />
    </View>
  );
};

export default WebScreen;

const _s = StyleSheet.create({
  container: {
    backgroundColor: _c.white,
    flex: 1,
  },
  webView: {
    width: '100%',
    height: '100%',
  },
});
