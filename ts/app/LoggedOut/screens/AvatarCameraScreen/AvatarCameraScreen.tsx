import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SwipeBackGuide from './components/SwipeBackGuide';

interface AvatarCameraScreenProps {}

const AvatarCameraScreen = (props: AvatarCameraScreenProps) => {
  return (
    <View style={styles.container}>
      <SwipeBackGuide />
      <Text>AvatarCameraScreen</Text>
    </View>
  );
};

export default AvatarCameraScreen;

const styles = StyleSheet.create({
  container: {},
});
