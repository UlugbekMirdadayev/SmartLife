import { call, put, takeEvery, all } from 'redux-saga/effects'
import {HistoryMoneyTransfer} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(HistoryMoneyTransfer.request());

        const response = yield call(api.user.HistoryMoneyTransfer, request);
        console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                HistoryMoneyTransfer.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(HistoryMoneyTransfer.failure(e))
    } finally {
        yield put(HistoryMoneyTransfer.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(HistoryMoneyTransfer.TRIGGER, trigger, api)
}
