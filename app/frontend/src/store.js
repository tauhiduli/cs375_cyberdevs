import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {itemsReducer,itemsInfoReducer} from './reducers/productReducers'
import {cartReducer} from "./reducers/cartReducers"
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import {LoginReducer, RegReducer } from './reducers/userReducers'

const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null

const initialState={cart:{cartItems},userSignin:{userInfo}}
const reducer = combineReducers({
    productList: itemsReducer,
    productDetails: itemsInfoReducer,
    cart:cartReducer,
    userSignin: LoginReducer,
    userRegister:RegReducer
})

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store= createStore(reducer, initialState,compose(applyMiddleware(thunk)))
export default store;
