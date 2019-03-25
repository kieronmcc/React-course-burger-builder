import React, { Component} from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//import queryString from 'query-string'; 
import * as actions from '../../store/actions/index';
 

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    // if triggered by an event can use this without arrow function
    // otherwise this will not refer to the class 
    orderCompletionHandler = () => {
        this.setState({purchasing: true});
    };

    orderCancelHandler = () => {
        this.setState({purchasing: false});
    }

    // Move to reducer
    orderContinueHandler = () => {
        //const queryParams = []
        //queryString.stringify(this.state.ingredients, 'strict');
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // console.log('Query Params: ', queryParams);
        // const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    // move to reducer
    updatePurchaseState (latestIngredients) {
        const ingredients = { ...latestIngredients}; // copy ingredients object
        // Transform object into array of strings (Object.keys) containing keys
        // Use this array and iterate over it using keys to get values to sum
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                // Starting value zero, sum holds current value, el is value to add
                return sum + el;
            },0);
        return sum > 0; // i.e. true or false
    }

    // Runs on first render cycle - subsequent render cycles call componentDidUpdate
    //componentDidMount = async () => {
    //     try {
    //         const res = await axios.get('/ingredients.json');
    //         this.setState({ingredients: res.data});
    // **** We could dispatch an action here within the async block ***
    // **** But using Redux consistently probably better to implement in action creator
    //         console.log('Ingredients fetched: ', this.state.ingredients); 
    //     } catch (error) {
    //         console.log('Error while fetching ingredients: ', error)
    //         this.setState({error: true});
    //     }

    // }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    // move to reducer
    // addIngredientsHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount +1;
    //     const updatedIngredients = {
    //          ...this.state.ingredients
    //      };
    //      updatedIngredients[type] = updatedCount;
    //      const priceAddition = INGREDIENT_PRICES[type];
    //      const oldPrice = this.state.totalPrice;
    //      const newPrice = oldPrice + priceAddition;
    //      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //      // to ensure that update has latest ingredients or this value for them 
    //      // pass updated ingredients to updatePurchaseState otherwise state is not guaranteed
    //      // this because React itself is handling all this with async callbacks (i.e. setState())
    //      this.updatePurchaseState(updatedIngredients); 
    // };

    // // move to reducer    
    // removeIngredientsHandler = (type) => {
    //     const oldCount = this.props.ingredients[type];
    //     let updatedCount = oldCount -1;
    //     if (oldCount <= 0) {
    //         return; // Don't do anything if no more ingredients of that type
    //     };

    //     const updatedIngredients = {
    //          ...this.props.ingredients
    //      };
    //      updatedIngredients[type] = updatedCount;
    //      const priceDeduction = INGREDIENT_PRICES[type];
    //      const oldPrice = this.state.totalPrice;
    //      const newPrice = oldPrice - priceDeduction;
    //      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //      this.updatePurchaseState(updatedIngredients);
    // };

    render() {
        const disableInfo = {
            ...this.props.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0; // so each elem now has type: true/false
        };

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;

        console.log('Ingredients: ', this.props.ingredients, this.props.error);

        /* Only use ingredients object for render when it has been
           fetched from the server */
        if (this.props.ingredients) {

            burger = (
            <Auxillary>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls 
                    ingredientAdded={this.props.onAddIngredients} // just a ref to the function
                    ingredientRemoved={this.props.onRemoveIngredients}
                    disabled={disableInfo}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.orderCompletionHandler}
                />
            </Auxillary>);

            orderSummary = <OrderSummary 
            ingredients={this.props.ingredients}
            orderCancelled={this.orderCancelHandler}
            orderContinue={this.orderContinueHandler}
            price={this.props.totalPrice} />;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        // The HOC is being used here to allow adjacent components and therefore
        // acts as single root element
        return (
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.orderCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }
};

// Setup Redux
const mapStateToProps = state  => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchersToProps = dispatch  => {
    return {
        onAddIngredients: (name) => dispatch(actions.addIngredient(name)),
        onRemoveIngredients: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
} 

export default connect(mapStateToProps, mapDispatchersToProps)(withErrorHandler(BurgerBuilder, axios));



