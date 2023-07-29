import { call, put, takeEvery, all } from 'redux-saga/effects'
import {ServiceCountry} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(ServiceCountry.request());

        const response = yield call(api.user.ServiceCountry, request);
        console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                ServiceCountry.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(ServiceCountry.failure(e))
    } finally {
        yield put(ServiceCountry.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(ServiceCountry.TRIGGER, trigger, api)
}
