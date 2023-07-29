import { call, put, takeEvery, all } from 'redux-saga/effects'
import {EditProfile} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(EditProfile.request());

        const response = yield call(api.user.EditProfile, request);
        console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                EditProfile.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(EditProfile.failure(e))
    } finally {
        yield put(EditProfile.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(EditProfile.TRIGGER, trigger, api)
}
