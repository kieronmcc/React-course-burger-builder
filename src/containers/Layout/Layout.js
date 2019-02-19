import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import cssClasses from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        } );
    };

    render () {

        return (
            <Auxillary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} close={this.sideDrawerCloseHandler} />
                <main className={cssClasses.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }
}
export default Layout;
