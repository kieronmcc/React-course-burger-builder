import React, { Component} from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
//import Button from '../UI/Button/Button';


class OrderDetails extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li> );
        });

        return (
            <Auxillary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <div>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                </div>
                <p>Delivered to:</p>
                <div>
                    <p><strong>Name: {this.props.customer.name}</strong></p>
                    <p>At the following address:</p>
                    <p><strong>Street:</strong> {this.props.customer.street}</p>
                    <p><strong>zip Code:</strong> {this.props.customer.zipCode}</p>
                    <p><strong>Country:</strong> {this.props.customer.country}</p>
                    <p><strong>Delivery Method:</strong> {this.props.customer.deliveryMethod}</p>
                    <p><strong>Contact:</strong> {this.props.customer.email}</p>
                </div>
            </Auxillary>
        );
    };
};

export default OrderDetails;