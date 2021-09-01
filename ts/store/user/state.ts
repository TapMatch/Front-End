export interface UserState {
  profile: any | null;
  loading: boolean;
}

export const userInitialState = {
  profile: null,
  loading: false,
};

export interface UserRootState {
  user: UserState;
}
