import "./login.css"
import React, { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext"
import { CircularProgress } from '@mui/material';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user,isFetching, dispatch} = useContext(AuthContext);



  const handleClick = (e)=>{
    e.preventDefault();
    loginCall({email: email.current.value, password: password.current.value},dispatch);
  };

  console.log(user)


  return (
    <div className="login">
       <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">StudyScape</h3>
            <span className="loginDesc">
                StudyScape, Learning and Sharing space for everyone.
            </span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input 
                placeholder="Email" 
                type="email"required 
                className="loginInput"  
                ref={email}
                />
                <input placeholder="Password" 
                type="password"required 
                minLength="6" 
                className="loginInput" 
                ref={password}
                />
                <button className="loginButton" type="sumbit" disabled = {isFetching}>{isFetching ? <CircularProgress style={{'color': 'white'}} size="25px" position=""/> : "Log In"}</button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">Create a New Account</button>
            </form>
        </div>
       </div>
    </div>
  )
}
