

import { ITEMS_REQUEST, ITEMS_SUCCESS, ITEMS_FAIL,ITEMS_DESC_FAIL,ITEMS_DESC_REQUEST,ITEMS_DESC_SUCCESS } from "../constants/productConstants";

function itemsReducer(state={products:[]},action){
    if (action.type === ITEMS_REQUEST){
        return {loading:true};
    }else if (action.type === ITEMS_SUCCESS){
        return {loading:false,products: action.payload}
    }else if (action.type === ITEMS_FAIL){
        return {loading:false,error:action.payload}
    }else{
        return state
    }

}

function itemsInfoReducer(state={product:{}},action){
    if (action.type === ITEMS_DESC_REQUEST){
        return {loading:true};
    }else if (action.type === ITEMS_DESC_SUCCESS){
        return {loading:false,product: action.payload}
    }else if (action.type === ITEMS_DESC_FAIL){
        return {loading:false,error:action.payload}
    }else{
        return state
    }
}
export {itemsReducer,itemsInfoReducer}

