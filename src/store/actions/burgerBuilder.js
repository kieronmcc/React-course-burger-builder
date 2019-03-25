import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    };
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REM_INGREDIENT,
        ingredientName: ingName
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients 
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/ingredients.json');
            //this.setState({ingredients: res.data});
            dispatch(setIngredients(res.data));
            console.log('Ingredients fetched: ', this.state.ingredients); 
        } catch (error) {
            console.log('Error while fetching ingredients: ', error)
            dispatch(fetchIngredientsFailed());
        }
    }
};