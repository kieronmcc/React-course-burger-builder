import React, {Component} from 'react';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // This could be a functional component because it does not need
    // to call this lifecycle method as it is done by the wrapping Modal
    // class component
    componentWillUpdate() {
        console.log('[OrderSummary] will update');
    };
    
    render () {

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
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.orderCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.orderContinue} btnType="Success">CONTINUE</Button>
            </Auxillary>
        );
    };
};

export default OrderSummary;