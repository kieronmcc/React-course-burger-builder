import React from 'react';
import cssClasses from './NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Login/Sign Up</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;