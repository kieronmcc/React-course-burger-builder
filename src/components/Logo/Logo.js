import React from 'react';
//import image so that webpack is aware of it for packaging
// so the variable will be the path dynamically resolved by WebPack
import burgerLogo from '../../assets/images/burger-logo.png';
import cssClasses from './Logo.module.css';


const logo = (props) => (
    <div className={cssClasses.Logo} style={{height: props.LogoHeight}} >
        <img src={burgerLogo} alt="Burger-Builder Logo" />
    </div>
);

export default logo;