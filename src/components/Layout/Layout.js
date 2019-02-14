import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import cssClasses from './Layout.module.css';

const layout = (props) => (
    <Auxillary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={cssClasses.Content}>
            {props.children}
        </main>
    </Auxillary>
);

export default layout;
