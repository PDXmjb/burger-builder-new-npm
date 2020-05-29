import React, { Component } from 'react'
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export default class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }    

    render() {
        return (
            <React.Fragment>
                <Toolbar click={this.sideDrawerToggleHandler}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closeHandler={this.sideDrawerClosedHandler}></SideDrawer>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}
