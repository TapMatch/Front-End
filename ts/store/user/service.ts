import api from '../create-service';

export const getProfile = async () => {
  return await api.get('/profile');
};

export const updateProfile = async (data: any) => {
  return await api.put('/profile', data);
};
