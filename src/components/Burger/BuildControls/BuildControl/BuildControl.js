import React from 'react';
import cssClasses from './BuildControl.module.css';


const buildControl = (props) => (
    <div className={cssClasses.BuildControl}>
        <div className={cssClasses.Label}>{props.label}
            <button 
                className={cssClasses.Less} 
                disabled={props.disabled} 
                onClick={props.removed}>Less</button>
            <button 
                className={cssClasses.More} 
                onClick={props.added}>More</button>
        </div>
    </div>
);

export default buildControl;