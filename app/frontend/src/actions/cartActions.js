import {PUT_ITEM_IN, PUT_ITEM_OUT} from "../constants/cartConstants"
var Axios = require('axios')
var Cookie = require('js-cookie')
const putItemIn = (item_inf,qty) => async (dispatch,getState) => {
    try{
        const URL = "/api/products/"
        const {data} = await Axios.get(URL +item_inf)
        const p_id = data['_id']
        const p_name = data['name']
        const p_price = data['price']
        const p_img = data['image']
        dispatch({type: PUT_ITEM_IN,payload:{
            product: p_id,
            name:p_name,
            price:p_price,
            image:p_img,
            qty
        }})
        const {cart:{cartItems}} = getState()
        const JStoSTR = JSON.stringify(cartItems)
        Cookie.set("cartItems",JStoSTR)
    }catch (error){

    }
}
const takeItemOut = (item_inf) => (dispatch,getState) => {
    dispatch({type: PUT_ITEM_OUT,payload:item_inf})
    const {cart:{cartItems}} = getState()
    const JStoSTR = JSON.stringify(cartItems)
    Cookie.set("cartItems",JStoSTR)
}
export {putItemIn, takeItemOut}