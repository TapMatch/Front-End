export interface AuthState {
  loggedIn: boolean;
  isSentCode: boolean;
  loading: boolean;
}
export const authInitialState = {
  loggedIn: false,
  isSentCode: false,
  loading: false,
};

export interface AuthRootState {
  auth: AuthState;
}
