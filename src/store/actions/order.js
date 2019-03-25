import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerInProgress = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_IN_PROGESS
    }
}

export const purchaseBurgerStart = (orderData) => {
    return async (dispatch) => {
        try {
            dispatch(purchaseBurgerInProgress());
            const res = await axios.post('/orders.json', orderData);
            console.log("Response: ", res);
            dispatch(purchaseBurgerSuccess(res.data.name, orderData) );
        } catch (error) {
            dispatch( purchaseBurgerFail(error) );
        }
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = () => {
    return async dispatch => {
        try {
            dispatch( fetchOrdersStart() );
            const res = await axios.get('/orders.json');
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            console.log('FetchedOrders: ', fetchedOrders);
            dispatch( fetchOrdersSuccess(fetchedOrders) );
        } catch (error) {
            dispatch( fetchOrdersFail(error) );
        }   
    }
}
