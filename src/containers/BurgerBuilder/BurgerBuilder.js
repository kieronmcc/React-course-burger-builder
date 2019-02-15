import React, { Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
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
    };

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0; // so each elem now has type: true/false
        };


        return (
            <Auxillary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientRemoved={this.removeIngredientsHandler}
                    disabled={disableInfo}
                />
            </Auxillary>
        );
    };
};

export default BurgerBuilder;


