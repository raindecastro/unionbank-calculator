import {
  all,
  takeEvery,
  takeLatest,
  put,
  fork,
  call,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { clearToken } from '../../helpers/utility';
import { loginAPI } from '../../helpers/apis';
import actions from './actions';
import appActions from '../app/actions';

export function* loginRequest() {
  yield takeLatest('LOGIN_REQUEST', function*(payload) {
    const authData = payload.authData;

    try {
      const user = yield call(loginAPI, authData);
      let expDate = new Date();
      let expMins = 1;
      expDate.setMinutes(expDate.getMinutes() + expMins);

      if (user.data.error) {
        console.log(user.data.error);
        yield put(appActions.apiCallFailed('Error! ' + user.data.error));
        yield put({ type: actions.LOGIN_ERROR });
      } else {
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: user.data.token,
          refresh_token: user.data.refresh_token,
          expires_in: expMins,
        });
        yield put(push('/'));
      }
    } catch (error) {
      yield put({ type: actions.LOGIN_ERROR });
      yield put(appActions.apiCallFailed('Error! Fetching api error'));
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('token', payload.token);
    yield localStorage.setItem('refresh_token', payload.refresh_token);
    yield localStorage.setItem('expires_in', payload.expires_in);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*(payload) {
    clearToken();
    yield put(push(payload.redirect || '/'));
  });
}

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
