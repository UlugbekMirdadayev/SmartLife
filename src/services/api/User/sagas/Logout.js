import { call, all, put, takeEvery } from 'redux-saga/effects'

import {logout} from '../routines'
import TokenStorage from "../../../TokenStorage/index";

function * trigger (api, action) {
    const { request } = action.payload;
    try {
        yield put(logout.request());

        yield call(api.removeToken);

        // console.log(JSON.stringify(response.data));
        yield put(
            logout.success({
                request
            })
        )
    } catch (e) {
        yield put(logout.failure(e))
    } finally {
        yield put(logout.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(logout.TRIGGER, trigger, api)
}
