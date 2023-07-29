import { call, put, takeEvery, all } from 'redux-saga/effects'
import {VerificateSms} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(VerificateSms.request());

        const response = yield call(api.user.VerificateSms, request);
        console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                VerificateSms.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(VerificateSms.failure(e))
    } finally {
        yield put(VerificateSms.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(VerificateSms.TRIGGER, trigger, api)
}
