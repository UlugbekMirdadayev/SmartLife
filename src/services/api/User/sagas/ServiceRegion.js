import { call, put, takeEvery, all } from 'redux-saga/effects'
import {ServiceRegion} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(ServiceRegion.request());

        const response = yield call(api.user.ServiceRegion, request);
        console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                ServiceRegion.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(ServiceRegion.failure(e))
    } finally {
        yield put(ServiceRegion.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(ServiceRegion.TRIGGER, trigger, api)
}
