import React from 'react';
import cssClasses from './Input.module.css';


const input = (props) => {
    // Using a switch statement to make this component
    // generic input component(!?) rather that create individual
    // components that wrap the html native elements.
    // Note the use of the spread operator on props to populate
    // the custom component with native element props.
    let inputElement = null;
    let validationError = null;
    const inputClasses = [cssClasses.InputElement];

    if (props.isvalid && props.shouldValidate && props.touched) {
        inputClasses.push(cssClasses.Invalid);
        validationError = <p className={cssClasses.ValidationError}>Please enter a valid {props.valueType}</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')}  
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')}  
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}  
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map( option => (
                        <option key={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={cssClasses.InputElement}   
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;    
    }

    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}> </label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default input;