import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { loggingIn } from '../actions/userActions'

function SigninScreen (props){
    const initialStateEmail=''
    const initialStatePasswd=''
    const [email,loginWithEmail] = useState(initialStateEmail)
    const [password,loginWithPassword] = useState(initialStatePasswd)
    const userSignin = useSelector(state=>state.userSignin)
    const d = useDispatch();
    const u=useEffect;

    if(userSignin){
        console.log('Good')
    }else{
        console.log('error')
    }
    
    u(()=>{
        if(userSignin['userInfo']){
            let x = props.history
            x.push("/")}
        return () => {}}, [userSignin['userInfo']])
    
    const submitHandler = (event) => {
        event.preventDefault()
        d(loggingIn(email,password))
    }

    return (
        <div id="signin-panel" className="div-wrapper">
            <form id="my-form" onSubmit={submitHandler}>
                <ul id="signin-panel-wrapper">
                    <div className="wrapper">
                        <li>
                            <div className="wrapper">
                                <h2>Signin</h2>
                            </div>
                        </li>
                    </div>

                    <li>
                        <div className="wrapper">
                            <a>Email</a>
                            <input type="email" id="email" onChange={(e)=>loginWithEmail(e.target.value)}>
                            </input>
                        </div>
                    </li>
                    <li>
                        <div className="wrapper">
                            <a>Password</a>
                            <input type="password" id="password" onChange={(e) => loginWithPassword(e.target.value)}>                            
                            </input>
                        </div>
                    </li>
                    <li>
                        <div className="wrapper">
                            <button type="submit" className="button primary"> Signin</button>
                        </div>
                    </li>
                    <li>
                        <div className="wrapper">
                            Create your account
                        </div>
                    </li>
                    <li>
                        <div className="wrapper">
                        <Link to="/register" className="button text-center">Register</Link>
                        </div>
                    </li>
                </ul>
            </form>

        </div>
    )
}
export default SigninScreen;