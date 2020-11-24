import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TapMatchContext} from './contexts/TapMatchContext';
import LoggedInStack from './LoggedIn/LoggedInStack';
import LoggedOutStack from './LoggedOut/LoggedOutStack';

const TapMatch = () => {
  const LoggedIn = useState(false);
  return (
    <TapMatchContext.Provider value={{LoggedIn}}>
      <NavigationContainer children={createRootNavigation(LoggedIn[0])} />
    </TapMatchContext.Provider>
  );
};
function createRootNavigation(LoggedIn: boolean) {
  if (LoggedIn) {
    return <LoggedInStack />;
  } else {
    return <LoggedOutStack />;
  }
}
export default TapMatch;
