import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import { logoutSaga, checkAuthTimeoutSaga, authUsersaga } from './auth'

// Register listeners for sagas for each action
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authUsersaga)
}