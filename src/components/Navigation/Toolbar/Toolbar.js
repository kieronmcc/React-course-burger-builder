import React from 'react';
import cssClasses from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NaivigationItems';

const toolbar = (props) => (
    <header className={cssClasses.Toolbar}>
        <div>MENU</div>
        <div className={cssClasses.Logo}>
        <Logo />
        </div>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;