import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><span  style={{textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
            });

        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delicous burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to CheckOut?</p>
                <Button clicked={this.props.purchaseCancelled} buttonType={"Danger"}>CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} buttonType={"Success"}>CONTINUE</Button>
            </React.Fragment>
        );
    }
    
}

export default OrderSummary;
