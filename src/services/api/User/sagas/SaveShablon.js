import { call, put, takeEvery, all } from 'redux-saga/effects'
import {SaveShablon} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(SaveShablon.request());

        const response = yield call(api.user.SaveShablon, request);
        console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                SaveShablon.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(SaveShablon.failure(e))
    } finally {
        yield put(SaveShablon.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(SaveShablon.TRIGGER, trigger, api)
}
