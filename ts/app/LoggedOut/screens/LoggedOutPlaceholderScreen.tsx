import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';

import {TapMatchContext} from '../../contexts/TapMatchContext';

interface LoggedOutPlaceholderScreenProps {}

const LoggedOutPlaceholderScreen = (props: LoggedOutPlaceholderScreenProps) => {
  const {LoggedIn} = useContext(TapMatchContext);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>LoggedOutPlaceholderScreen</Text>
        <Button title={'Log In'} onPress={() => LoggedIn[1](true)} />
      </View>
    </SafeAreaView>
  );
};

export default LoggedOutPlaceholderScreen;

const styles = StyleSheet.create({
  container: {},
});
