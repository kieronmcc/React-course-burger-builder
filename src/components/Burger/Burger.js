import React from 'react';
import cssClasses from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';


const burger = (props) => {
    // This returns an array with the object keys as strings
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            // Make an array for each ingredient that has length number of ingredients
            // and then using map to transform this into Ingredient JSX with an
            // element key and the ingredient name to be rendered by Ingredient component.
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <Ingredient key={ingKey+ i} type={ingKey} />    
            });
        })
        .reduce((arr, el) => {
            // Use reduce to flatten the array produced by map
            // arr argument is one to be modified and el is the one
            // being operated on. In the end this coverts a 3d array into a 2d array
            //console.log("reduced elem: ", el, "array concat: ", arr);
            return arr.concat(el);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    };

    return (
        <div className={cssClasses.Burger}>
            <Ingredient type="bread-top" />
            {transformedIngredients}
            <Ingredient type="bread-bottom" />

        </div>
    );
};

export default burger;