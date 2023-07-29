import { call, put, takeEvery, all } from 'redux-saga/effects'
import {SignUpverify} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(SignUpverify.request());

        const response = yield call(api.user.SignUpverify, request);
        //console.warn(JSON.stringify(response));
        yield all([
            put(
                SignUpverify.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(SignUpverify.failure(e))
    } finally {
        yield put(SignUpverify.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(SignUpverify.TRIGGER, trigger, api)
}
