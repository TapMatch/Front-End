import {useSelector} from 'react-redux';
import {AuthRootState} from './state';

export const useIsAuthorisedSelector = () =>
  useSelector<AuthRootState, boolean>(({auth}) => auth.loggedIn);
