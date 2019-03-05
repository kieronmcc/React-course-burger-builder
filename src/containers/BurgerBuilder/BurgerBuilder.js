import React, { Component} from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//import queryString from 'query-string'; 

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        orderComplete: false,
        loading: false,
        error: false
    }

    // if triggered by an event can use this without arrow function
    // otherwise this will not refer to the class 
    orderCompletionHandler = () => {
        this.setState({orderComplete: true});
    };

    orderCancelHandler = () => {
        this.setState({orderComplete: false});
    };

    orderContinueHandler = () => {
        const queryParams = []
        //queryString.stringify(this.state.ingredients, 'strict');
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        console.log('Query Params: ', queryParams);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

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
        this.setState({purchasable: sum > 0}) // i.e. true or false
    };

    // Runs on first render cycle - subsequent render cycles call componentDidUpdate
    componentDidMount = async () => {
        try {
            const res = await axios.get('/ingredients.json');
            this.setState({ingredients: res.data});
            console.log('Ingredients fetched: ', this.state.ingredients); 
        } catch (error) {
            console.log('Error while fetching ingredients: ', error)
            this.setState({error: true});
        }

    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
             ...this.state.ingredients
         };
         updatedIngredients[type] = updatedCount;
         const priceAddition = INGREDIENT_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice + priceAddition;
         this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
         // to ensure that update has latest ingredients or this value for them 
         // pass updated ingredients to updatePurchaseState otherwise state is not guaranteed
         // this because React itself is handling all this with async callbacks (i.e. setState())
         this.updatePurchaseState(updatedIngredients); 
    };

    
    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount -1;
        if (oldCount <= 0) {
            return; // Don't do anything if no more ingredients of that type
        };

        const updatedIngredients = {
             ...this.state.ingredients
         };
         updatedIngredients[type] = updatedCount;
         const priceDeduction = INGREDIENT_PRICES[type];
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice - priceDeduction;
         this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
         this.updatePurchaseState(updatedIngredients);
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0; // so each elem now has type: true/false
        };

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;

        /* Only use ingredients object for render when it has been
           fetched from the server */
        if (this.state.ingredients) {

            burger = (
            <Auxillary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientRemoved={this.removeIngredientsHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.orderCompletionHandler}
                />
            </Auxillary>);

            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            orderCancelled={this.orderCancelHandler}
            orderContinue={this.orderContinueHandler}
            price={this.state.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        // The HOC is being used here to allow adjacent components and therefore
        // acts as single root element
        return (
            <Auxillary>
                <Modal show={this.state.orderComplete} modalClosed={this.orderCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    };
};

export default withErrorHandler(BurgerBuilder, axios);


