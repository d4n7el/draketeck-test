const SET_LOGGING = 'SET_LOGGING';
const LOGOUT = 'LOGOUT';

const defaultLogin = {
  user: null,
  accessToken: null,
};

const login = (state = defaultLogin, action) => {
  console.log({action});
  switch (action.type) {
    case LOGOUT:
      return defaultLogin;
    case SET_LOGGING:
      return {
        ...state,
        user: action.payload?.user,
        accessToken: action.payload?.accessToken
      };
    default:
      return state;
  }
};

export { login, SET_LOGGING, LOGOUT };
