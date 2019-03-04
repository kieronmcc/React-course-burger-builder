import React from 'react';
import cssClasses from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';


const navigationItem = (props) => (
    <li className={cssClasses.NavigationItem}>
        <NavLink 
            to={props.link}
            exact
            activeClassName={cssClasses.active}>
            {props.children}</NavLink>
    </li>
);

export default navigationItem;