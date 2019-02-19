import React from 'react';
import cssClasses from './BuildControl.module.css';
import PropTypes from 'prop-types';


const buildControl = (props) => {

    return (
        <div className={cssClasses.BuildControl}>
            <div className={cssClasses.Label}>{props.label}</div>
                <button 
                    className={cssClasses.Less} 
                    disabled={props.disabled} 
                    onClick={props.removed}>Less</button>
                <button 
                    className={cssClasses.More} 
                    onClick={props.added}>More</button>
        </div>
    );
};


buildControl.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    removed: PropTypes.func.isRequired,
    added: PropTypes.func.isRequired,    
};

export default buildControl;