import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { regFunc } from '../actions/userActions'

function RegisterScreen (props){
    const [usrId,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [rePassword,setRePassword] = useState('')
    const toReg = useSelector(state=>state.userRegister)

    if (toReg){
        console.log('Empty')
    }else{
        console.log('Good')
    }

    const d = useDispatch();
    const u = useEffect;
    u(()=>{
        if(toReg['userInfo']){
            props.history.push("/")
        }
        return () => {
        }
    }, [toReg['userInfo']])

    const submitHandler = (e) => {
        e.preventDefault()
        d(regFunc(usrId,email,password))
    }

    return (
        <div id="signin-panel" className="div-wrapper">
            <form id="my-form" onSubmit={submitHandler}>
                <ul id="signin-panel-wrapper">
                    <div className="wrapper">
                        <li>
                            <h2>Create Account</h2>
                        </li>
                    </div>
                    <li>
                        <div className="wrapper">
                            <a>First and last name</a>
                            <input type="name" name="name" id="name" onChange={(e)=>setName(e.target.value)}>
                            </input>
                        </div>
                    </li>
                    <li>
                        <div className="wrapper">
                        <a>Email</a>
                        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}>
                        </input>
                        </div>
                    </li>
                    <li>
                        <div className="wrapper">
                            <a>Please enter password</a>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}>                            
                            </input>
                        </div>
                    </li>
                    <li>
                        <div className="wrapper">
                            <a>Please re-enter password</a>
                            <input type="password" id="rePassword" name="rePassword">                        
                            </input>
                        </div>
                    </li>
                    <div className="wrapper">
                        <li>
                            <div className="wrapper">
                                <button type="submit" className="button primary"> Register</button>
                            </div>
                        </li>
                    </div>
                    <div className="wrapper">
                        <li>
                            Already have an account? <Link to="/signin">Sign-in</Link>
                        </li>
                    </div>
                </ul>
            </form>

        </div>
    )
}
export default RegisterScreen;