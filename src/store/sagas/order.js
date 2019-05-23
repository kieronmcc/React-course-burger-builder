import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'

import * as actions from '../actions/index'

export function* purchaseStartSaga (action) {
    try{
        yield put(actions.purchaseBurgerInProgress())
        const res = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
            yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData) );
    } catch (error) {
            yield put(actions.purchaseBurgerFail(error) );
    }
}

export function* fetchOrdersSaga(action) {
    try {
        yield put(actions.fetchOrdersStart() );
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"'
        const res = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            })
        }
        yield put( actions.fetchOrdersSuccess(fetchedOrders) );
    } catch (error) {
        yield put( actions.fetchOrdersFail(error) );
    }  
}

export function* getOrderDetailsSaga(action) {
    try {
        console.log("Order ID: ", action.orderId)
        const res = yield axios.get(`/orders/${action.orderId}.json`);
        console.log("response: ", res)
        const orderDetails = res.data;
        yield put( actions.getOrderDetailsSuccess(orderDetails, action.orderId));
    } catch (error) {
        console.log("Order Details Failed: ", error)
        //yield put( actions.getOrderDetailsFail());
    }
}