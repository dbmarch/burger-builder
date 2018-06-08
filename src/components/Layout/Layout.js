import React, {Component} from 'react';
import Aux from '../../hoc/Aux2';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

import Logo from '../Logo/Logo';



class Layout extends Component  {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render() {

        return(
        <Aux>
        <Toolbar />
        <div className = {classes.Logo}>
                <Logo />
            </div> 
        <SideDrawer 
            open= {this.state.showSideDrawer}
            closed = {this.sideDrawerClosedHandler} />
        <main className = {classes.Content}>
            {this.props.children}
        </main>
        </Aux>
        );
    }
}
export default Layout;