import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closeHandler}></Backdrop>
            <div className={attachedClasses.join(' ')}>                
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>            
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default sideDrawer;