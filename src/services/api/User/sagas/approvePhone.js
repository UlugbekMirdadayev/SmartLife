import { call, all, put, takeEvery } from 'redux-saga/effects'

import { approvePhone } from '../routines'
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.log(JSON.stringify(request));
    try {
        yield put(approvePhone.request());

        const response = yield call(api.user.approvePhone, request);
        console.log(JSON.stringify(response.data));
        yield all([
            call(TokenStorage.set, response.data.token),
            put(
                approvePhone.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        console.log(e);
        yield put(approvePhone.failure(e))
    } finally {
        yield put(approvePhone.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(approvePhone.TRIGGER, trigger, api)
}
