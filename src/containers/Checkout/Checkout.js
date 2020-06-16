import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';

class Checkout extends Component {

    // Changed from DID mount to WILL mount to load data earlier.
    //KEEPING FOR REFERENCE, NO LONGER NEEDED WITH REDUX
    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = null;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
            
    //     }

    //     console.log(price);
    //     console.log(ingredients);

    //     this.props.priceChanged(price);
    //     this.props.ingredientsChanged(ingredients);

    //     console.log(this.props.totalPrice);
    // }
    
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        console.log(this.props.ingredients);
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}></CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'} 
                render={(props) => (<ContactData ingredients={this.props.ingredients} price={this.props.totalPrice} {...props}></ContactData>)}></Route>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ingredientsChanged: (ingredients) => dispatch({type: actions.INGREDIENTS_CHANGED, ingredients: ingredients}),
        priceChanged: (totalPrice) => dispatch({type: actions.PRICE_CHANGED, totalPrice: totalPrice})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)