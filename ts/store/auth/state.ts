export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
}
export const authInitialState = {
  loggedIn: false,
  loading: false,
};

export interface AuthRootState {
  auth: AuthState;
}
