import Axios from 'axios'
import Cookie from 'js-cookie'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REG_REQUEST, REG_SUCCESS, REG_FAIL } from '../constants/userConstants'

const loggingIn = (email,password) => async (dispatch) => {
    dispatch({type:LOGIN_REQUEST,payload:{email,password}})
    try{
        const {data} = await Axios.post("/auth",{email,password})
        dispatch({type:LOGIN_SUCCESS,payload:data})
        Cookie.set('userInfo',JSON.stringify(data))
    }catch (error){
        dispatch({type:LOGIN_FAIL,payload:error.message})
    }
}

const regFunc = (firstName,lastName,username,email,password) => async (dispatch) => {
    dispatch({type:REG_REQUEST,payload:{firstName,lastName,username,email,password}})
    try{
        const {data} = await Axios.post("/addUser",{firstName,lastName,username,email,password})
        dispatch({type:REG_SUCCESS,payload:data})
        Cookie.set('userInfo',JSON.stringify(data))
    }catch (error){
        dispatch({type:REG_FAIL,payload:error.message})
    }
}
export { loggingIn,regFunc }