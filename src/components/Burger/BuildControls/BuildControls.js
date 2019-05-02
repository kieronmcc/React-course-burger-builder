import React from 'react';
import cssClasses from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls= [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon ', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'}
];


const buildControls = (props) => {

    return (
        <div className={cssClasses.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong> </p>
            { controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={() => props.ingredientAdded(ctrl.type)} // executes the function according to its prototype so args get passed
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button 
                className={cssClasses.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW': 'Login/Sign Up To Order'}</button>
        </div>
    );

};

export default buildControls;