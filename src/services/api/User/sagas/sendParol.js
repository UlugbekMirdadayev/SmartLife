import { call, put, takeEvery, all } from 'redux-saga/effects'
import {sendParol} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(sendParol.request());

        const response = yield call(api.user.sendParol, request);
        console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                sendParol.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(sendParol.failure(e))
    } finally {
        yield put(sendParol.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(sendParol.TRIGGER, trigger, api)
}
