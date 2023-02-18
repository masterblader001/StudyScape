import "./register.css";
import React, { useRef } from "react";
//import axios from "axios";
import {axiosInstance} from "../../config";
import {useNavigate} from "react-router-dom"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain =  useRef();
    const navigate = useNavigate();

 const handleClick = async (e)=> {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
        passwordAgain.current.setCustomValidity("Password doesn't match!");
    }else{
        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            
        }
        try{
            await axiosInstance.post("/auth/register",user);
            navigate("/login")
     } catch(err){
        console.log(err)
     }
    }
 }

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
                placeholder="Username" 
                required ref={username} 
                className="loginInput" 
                />
                <input 
                placeholder="Email" 
                required ref={email} 
                className="loginInput" 
                type="email"
                />
                <input 
                placeholder="Password" 
                required ref={password} 
                className="loginInput" 
                type="password" 
                minLength="6"
                />
                <input placeholder="Password Again" 
                required ref={passwordAgain} 
                className="loginInput" 
                type="password"
                minLength="6"/>
                <button className="loginButton" type="submit"> Sign Up </button>
                <button className="loginRegisterButton" type="submit">Log into Account</button>
            </form>
        </div>
       </div>
    </div>
    );
}