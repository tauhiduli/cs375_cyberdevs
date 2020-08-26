import {PUT_ITEM_IN, PUT_ITEM_OUT} from "../constants/cartConstants"

function cartReducer(state={cartItems:[]},action){
    if (action.type === PUT_ITEM_IN){
        const item = action.payload
        const product = state.cartItems.find(function(x){
            return (x.product === item.product)
        });
        if(product){
            return {cartItems:state.cartItems.map(function(x){
                if (x.product === product.product){
                    return item
                }
                return x
            }
            )}
        }
        return {cartItems:[...state.cartItems,item]}
    }else if (action.type === PUT_ITEM_OUT){
        return { cartItems: state.cartItems.filter(function(x){
            return (x.product !== action.payload)})}
    }else{
        return state
    }
}

export {cartReducer}