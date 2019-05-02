import React, { Component} from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import OrderDetails from '../../components/OrderDetails/OrderDetails';


class Orders extends Component {

    state = {
        showOrderDetails: false
    };

    componentDidMount = () => {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    cancelShowDetailsHandler = () => {
        this.props.onCancelOrderDetails();
    }

    showDetailsHandler = (id) => {
        this.setState({showOrderDetails: true});
        this.props.onGetOrderDetails(id);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                orders = <Order 
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={+order.price}
                    id={order.id}
                    clickDetails={() => this.showDetailsHandler(order.id)}
                />
            ))
        }
        let orderDetails = null;
        if (this.props.showOrderDetails) {
            orderDetails = <OrderDetails 
                ingredients={this.props.orderDetails.ingredients}
                customer={this.props.orderDetails.orderData}
                price={this.props.orderDetails.price} />;
        }
        return (
            <div>
                <Modal show={this.props.showOrderDetails} modalClosed={this.cancelShowDetailsHandler} >
                    {orderDetails}
                </Modal>
                {orders}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        orderDetails: state.order.orderDetails,
        showOrderDetails: state.order.showOrderDetails,
        showOrderId: state.order.showOrderId,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchersToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onGetOrderDetails: (orderId) => dispatch(actions.getOrderDetails(orderId)),
        onCancelOrderDetails: () => dispatch(actions.cancelOrderDetails())
    };
};

export default connect(mapStateToProps, mapDispatchersToProps)( withErrorHandler(Orders, axios) );