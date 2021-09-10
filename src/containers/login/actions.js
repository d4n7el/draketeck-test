import {SET_LOGGING, LOGOUT } from './reducer';

export const logInUser = payload => ({
  type: SET_LOGGING,
  payload
});

export const logOut = () => ({
  type: LOGOUT
});
