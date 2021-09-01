import {useSelector} from 'react-redux';
import {UserRootState} from './state';

export const useProfileSelector = () =>
  useSelector<UserRootState>(({user}) => user.profile);
