import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState =  {
    orders: [],
    loading: false,
    purchased: false,
    orderDetails: null,
    showOrderId: null,
    showOrderDetails: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT :
            return updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BURGER_IN_PROGESS :
            return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_BURGER_SUCCESS :
            const newOrder = updateObject(action.orderData, {id: action.orderId});
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder), // remember concat returns a new array new state object is not directly changed
                purchased: true
            })
        case actionTypes.PURCHASE_BURGER_FAIL :
            return updateObject(state, {loading: false});
        case actionTypes.FETCH_ORDERS_START :
            return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS :
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });
        case actionTypes.FETCH_ORDERS_FAIL :
            return updateObject(state,{loading: false});
        case actionTypes.GET_ORDER_DETAILS_SUCCESS :
            return updateObject(state, {
                orderDetails: action.orderDetails, 
                showOrderId: action.showOrderId,
                showOrderDetails: true
            } );
        case actionTypes.CANCEL_ORDER_DETAILS :
            return updateObject(state, {showOrderDetails: false});
        default:
            return state;
    }
};

export default reducer;