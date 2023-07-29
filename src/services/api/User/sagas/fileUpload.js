import { call, put, takeEvery, all } from 'redux-saga/effects'
import {fileUpload} from '../routines';
import TokenStorage from '../../../TokenStorage';

function * trigger (api, action) {
    const { request } = action.payload;
    // console.warn(JSON.stringify(action.payload));
    try {
        yield put(fileUpload.request());

        const response = yield call(api.user.fileUpload, request);
        //console.warn(JSON.stringify(response));
        // call(TokenStorage.set, response.data.u_token),
            yield all([
            put(
                fileUpload.success({
                    request,
                    response
                })
            )
        ])
    } catch (e) {
        yield put(fileUpload.failure(e))
    } finally {
        yield put(fileUpload.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(fileUpload.TRIGGER, trigger, api)
}
