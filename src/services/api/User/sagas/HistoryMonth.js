import { call, put, takeEvery, all } from 'redux-saga/effects'
import {HistoryMonth} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(HistoryMonth.request());

        const response = yield call(api.user.HistoryMonth, request);
        console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                HistoryMonth.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(HistoryMonth.failure(e))
    } finally {
        yield put(HistoryMonth.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(HistoryMonth.TRIGGER, trigger, api)
}
