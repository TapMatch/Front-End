import React, {useContext} from 'react';
import {Text, View, StyleSheet, Button, SafeAreaView} from 'react-native';

import {TapMatchContext} from '../../contexts/TapMatchContext';

interface LoggedInPlaceholderScreenProps {}

const LoggedInPlaceholderScreen = (props: LoggedInPlaceholderScreenProps) => {
  const {LoggedIn} = useContext(TapMatchContext);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>LoggedInPlaceholderScreen</Text>
        <Button title={'Log Out'} onPress={() => LoggedIn[1](false)} />
      </View>
    </SafeAreaView>
  );
};

export default LoggedInPlaceholderScreen;

const styles = StyleSheet.create({
  container: {},
});
