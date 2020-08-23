import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {productListReducer,productDetailsReducer} from './reducers/productReducers'
import {cartReducer} from "./reducers/cartReducers"
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'

const cartItems = Cookie.getJSON("cartItems") || []

const initialState={cart:{cartItems}}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer
})

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store= createStore(reducer, initialState,compose(applyMiddleware(thunk)))
export default store;