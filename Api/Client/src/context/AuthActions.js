export const LoginStart = (userCredentails) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload:user,
});
export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
});

export const Follow = (userId)=>({
    type:"FOLLOW",
    payload: userId,
});

export const Unfollow = (userId)=>({
    type:"UNFOLLOW",
    payload: userId,
});