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

export const purchaseBurgerStart = (orderData, token) => {
    return async (dispatch) => {
        try {
            dispatch(purchaseBurgerInProgress());
            const res = await axios.post('/orders.json?auth=' + token, orderData);
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

export const fetchOrders = (token, userId) => {
    return async dispatch => {
        try {
            dispatch( fetchOrdersStart() );
            const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
            const res = await axios.get('/orders.json' + queryParams);
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch( fetchOrdersSuccess(fetchedOrders) );
        } catch (error) {
            dispatch( fetchOrdersFail(error) );
        }   
    }
}

export const getOrderDetailsSuccess = (orderDetails, orderId) => {
    return {
        type: actionTypes.GET_ORDER_DETAILS_SUCCESS,
        orderDetails: orderDetails,
        showOrderId: orderId
    }
};
export const getOrderDetails = (orderId) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/orders/${orderId}.json`);
            const orderDetails = res.data;
            dispatch( getOrderDetailsSuccess(orderDetails, orderId));
        } catch (error) {
            //dispatch( getOrderDeatilsFail());
        }
    }
}

export const cancelOrderDetails = () => {
    return {
        type: actionTypes.CANCEL_ORDER_DETAILS
    }
}
