import React from 'react';
import cssClasses from './Button.module.css';


const button = (props) => (
    // className get assign a string list of styles since
    // join transforms the array into a string separated by spaces.
    <button
        disabled={props.disabled}
        className={[cssClasses.Button, cssClasses[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;