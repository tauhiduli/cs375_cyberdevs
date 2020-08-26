import {LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REG_REQUEST, REG_SUCCESS, REG_FAIL} from "../constants/userConstants"


function LoginReducer(state={},action){
    if (action.type === LOGIN_REQUEST){
        return {loading:true}
    }else if (action.type === LOGIN_SUCCESS){
        return {loading:false,userInfo:action.payload}
    }else if (action.type === LOGIN_FAIL){
        return {loading:false,error:action.payload}
    }else{
        return state
    }
}

function RegReducer(state={},action){
    if(action.type === REG_REQUEST){
        return {loading:true}
    }else if (action.type === REG_SUCCESS){
        return {loading:false,userInfo:action.payload}
    }else if (action.type === REG_FAIL){
        return {loading:false,error:action.payload}
    }else{
        return state
    }
}

export {LoginReducer,RegReducer}