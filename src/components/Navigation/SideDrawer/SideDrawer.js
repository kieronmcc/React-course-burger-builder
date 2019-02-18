import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NaivigationItems';
import cssClasses from './SideDrawer.module.css';


const sideDrawer = (props) => {

    return (
        <div className={cssClasses.SideDrawer}>
            <div className={cssClasses.Logo}>
            <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;