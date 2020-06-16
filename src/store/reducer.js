import * as actions from './actions'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.PRICE_CHANGED:
            console.log("NEW PRICE:", action.totalPrice)
            return {...state, totalPrice: action.totalPrice}
        case actions.INGREDIENTS_CHANGED: 
            console.log("NEW INGREDIENTS:", action.ingredients)
            return {...state, ingredients: action.ingredients}
        case actions.PURCHASEABLE_CHANGED:
            return {...state, purchaseable: action.purchaseable}
    }
    return state;
}

export default reducer;