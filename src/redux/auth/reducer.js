import { Map } from 'immutable';
import { getToken } from '../../helpers/utility';
import actions from './actions';

const initState = new Map({
  token: null,
  refresh_token: null,
  token_valid: false,
  loginError: false,
  credentialVerified: true,
  expires_in: null,
  loginRequestInProcess: false,
  test: 'HERE',
});

export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return state.set('signinRequestInProcess', true).set('loginError', false);
    case actions.LOGIN_SUCCESS:
      return state
        .set('signinRequestInProcess', false)
        .set('access_token', action.token)
        .set('refresh_token', action.refresh_token)
        .set('expires_in', action.expires_in)
        .set('loginError', false);

    case actions.LOGIN_ERROR:
      return state.set('signinRequestInProcess', false).set('loginError', true);

    case actions.LOGOUT:
      return initState;

    case actions.CHANGE_TEST_REQUEST:
      return state.set('test', action.testValue);

    default:
      return state;
  }
}
