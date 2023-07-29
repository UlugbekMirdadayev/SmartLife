import {call, put, takeEvery, all} from 'redux-saga/effects';
import {sendLogin} from '../routines';
// import TokenStorage from '../../../TokenStorage';

function* trigger(api, action) {
  const {request} = action.payload;
  // console.warn(JSON.stringify(action.payload));
  try {
    yield put(sendLogin.request());

    const response = yield call(api.user.sendLogin, request);
    console.warn(JSON.stringify(response));
    // call(TokenStorage.set, response.data.u_token),
    yield all([
      put(
        sendLogin.success({
          request,
          response,
        }),
      ),
    ]);
  } catch (e) {
    yield put(sendLogin.failure(e));
  } finally {
    yield put(sendLogin.fulfill());
  }
}

export default function* (api) {
  yield takeEvery(sendLogin.TRIGGER, trigger, api);
}
