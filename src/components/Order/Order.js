import React from 'react';
import cssClasses from './Order.module.css';


const Order = (props) => {
    /* this works */
    // const ingredients = Object.keys(props.ingredients)
    // .map(ingKey => {
    //     // Make an array for each ingredient that has length number of ingredients
    //     // and then using map to transform this into Ingredient JSX with an
    //     // element key and the ingredient name to be rendered by Ingredient component.
    //     return [...Array(props.ingredients[ingKey])].map((_, i) => {
    //         return <Ingredient key={ingKey+ i} type={ingKey} />    
    //     });
    // })
    // .reduce((arr, el) => {
    //     // Use reduce to flatten the array produced by map
    //     // arr argument is one to be modified and el is the one
    //     // being operated on. In the end this coverts a 3d array into a 2d array
    //     //console.log("reduced elem: ", el, "array concat: ", arr);
    //     return arr.concat(el);
    // }, []);

    /* As does this*/
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
            ingredients.push(
                {
                    name: ingredientName, 
                    amount: props.ingredients[ingredientName]
                }
        );
    }

    const ingredientOutput =  ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>
            {ig.name} ({ig.amount})
            </span>;
    });

    return (
        <div className={cssClasses.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;