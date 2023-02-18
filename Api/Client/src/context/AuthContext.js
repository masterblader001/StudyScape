import React from "react";
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    //for now use sarinya
    user: {
        _id:"63e893a21ea66a87c6746eea",
                username: "sarinya",
                email:"sarinya@gmail.com",
                profilePicture: "",
                coverPicture: "",
                isAdmin: false,
                followers:[],
                followings:[]
        },
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContexProvider = ({ children })=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider 
        value={{
            user:state.user, 
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        
            }}
            >
                { children }
        </AuthContext.Provider>
    );
};