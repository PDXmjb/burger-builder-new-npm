import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import {dispatch, connect} from 'react-redux';
import * as actions from '../../store/actions'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burger-builder-d3411.firebaseio.com/ingredients.json').then(
            response => {
                this.props.onIngredientsUpdated(response.data);
            }
        ).catch(error => {
            this.setState({error: true});
        })
    }
    addIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ingredients
        }

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice + priceAddition;

        updatedIngredients[type] = updatedCount;
        
        this.props.onIngredientsUpdated(updatedIngredients);
        this.props.onPriceUpdated(newPrice);
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.props.setPurchaseable(sum > 0);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        if (oldCount > 0)
        {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.props.ingredients
            }

            const priceSubtraction = INGREDIENT_PRICES[type];
            const oldPrice = this.props.totalPrice;
            const newPrice = oldPrice - priceSubtraction;

            updatedIngredients[type] = updatedCount;

            this.props.onIngredientsUpdated(updatedIngredients);
            this.props.onPriceUpdated(newPrice);
            this.updatePurchaseState(updatedIngredients);
        }
        
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Mike Brooks',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '12351',
        //             country: 'United States'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // this.setState({loading: true});
        // axios.post('/orders.json', order).then(response => {
        //     this.setState({ loading: false, purchasing: false });
        // })
        // .catch(error => {
        //     this.setState({ loading: false, purchasing: false });
        // });        COMMENTED OUT, DOING ON CHECKOUT PAGE INSTEAD.

        const query = [];
        for (let i in this.props.ingredients) {
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }

        query.push('price=' + this.props.totalPrice);

        const queryString = query.join('&');
        
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });

    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        if (this.props.ingredients) {
            orderSummary = <OrderSummary totalPrice={this.props.totalPrice} ingredients={this.props.ingredients} purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}></OrderSummary>
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }
    
        let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner></Spinner>



        if (this.props.ingredients) {    
            burger = (
                <React.Fragment>
                <Burger ingredients={this.props.ingredients}></Burger>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.props.totalPrice}
                    purchaseable={this.props.purchaseable}
                    ordered={this.purchaseHandler}></BuildControls>
                </React.Fragment>
            )
        }



        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    // Map state values into props.
    return {
        totalPrice: state.totalPrice,
        ingredients: state.ingredients,
        purchaseable: state.purchaseable
    }
}

const mapDispatchToProps = dispatch => {
    // Create dispatchers
    return {
        onPriceUpdated: (price) => dispatch({type: actions.PRICE_CHANGED, totalPrice: price}),
        onIngredientsUpdated: (ingredients) => dispatch({type: actions.INGREDIENTS_CHANGED, ingredients: ingredients}),
        setPurchaseable: (purchaseable) => dispatch({type: actions.PURCHASEABLE_CHANGED, purchaseable: purchaseable})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));