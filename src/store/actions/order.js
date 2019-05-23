import * as actionTypes from './actionTypes';

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
    return {
        type: actionTypes.PURCHASE_BURGER_START,
        orderData: orderData,
        token: token
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
    return {
        type: actionTypes.FETCH_ORDERS_INIT,
        token: token,
        userId: userId
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
    return {
        type: actionTypes.GET_ORDER_DETAILS,
        orderId: orderId
    }
}

export const cancelOrderDetails = () => {
    return {
        type: actionTypes.CANCEL_ORDER_DETAILS
    }
}
