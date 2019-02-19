import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NaivigationItems';
import cssClasses from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary/Auxillary';


const sideDrawer = (props) => {

    let attachedClasses = [cssClasses.SideDrawer, cssClasses.Close];

    if (props.open) {
        attachedClasses = [cssClasses.SideDrawer, cssClasses.Open];
    };

    return (
        <Auxillary>
            <Backdrop show={props.open} clicked={props.close} />
            <div className={attachedClasses.join(' ')}>
                <div className={cssClasses.Logo}>
                <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxillary>
    );
};

export default sideDrawer;