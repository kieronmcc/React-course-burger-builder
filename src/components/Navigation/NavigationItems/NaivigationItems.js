import React from 'react';
import cssClasses from './NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';


const navigationItems = () => (
    <ul className={cssClasses.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;