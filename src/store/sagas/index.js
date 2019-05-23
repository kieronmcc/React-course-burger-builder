import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, retrieveAuthDataSaga } from './auth'
import { initIngredientsSaga } from './burgerBuilder';
import { fetchOrdersSaga, getOrderDetailsSaga, purchaseStartSaga } from './order'

// Register listeners for sagas for each auth action
export function* watchAuth() {
    // yield all will run async functions concurrently (these are sync though)
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_GET_USER_DATA, retrieveAuthDataSaga)
    ])
    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    // yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
    // yield takeEvery(actionTypes.AUTH_GET_USER_DATA, retrieveAuthDataSaga)
}
export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrders() {
    yield takeLatest(actionTypes.PURCHASE_BURGER_START, purchaseStartSaga) // Will only executed the latest purchaseStartSaga - cancelling any previous in stack
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga)
    yield takeEvery(actionTypes.GET_ORDER_DETAILS, getOrderDetailsSaga)
}