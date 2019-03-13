const authActions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  ADMIN_LOGIN_REQUEST: 'ADMIN_LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',

  CHANGE_TEST_REQUEST: 'CHANGE_TEST_REQUEST',
  CHANGE_TEST_SUCCESS: 'CHANGE_TEST_SUCCESS',
  CHANGE_TEST_ERROR: 'CHANGE_TEST_ERROR',

  login: authData => ({
    type: authActions.LOGIN_REQUEST,
    authData,
  }),

  adminLogin: authData => ({
    type: authActions.ADMIN_LOGIN_REQUEST,
    authData,
  }),

  changeTest: testValue => ({
    type: authActions.CHANGE_TEST_REQUEST,
    testValue,
  }),
};

export default authActions;
