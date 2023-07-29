import { call, put, takeEvery, all } from 'redux-saga/effects'
import {DashboardInfo} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(DashboardInfo.request());

        const response = yield call(api.user.DashboardInfo, request);
        console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                DashboardInfo.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(DashboardInfo.failure(e))
    } finally {
        yield put(DashboardInfo.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(DashboardInfo.TRIGGER, trigger, api)
}
