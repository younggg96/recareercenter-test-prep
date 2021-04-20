import { USER_LOGIN, USER_LOGOUT } from "./actionTypes";

export function login(email, password) {
    // const req = firebaseAuth.login(email, password);
    const req = {user: "aaa", signIn: true}
    return {
        type: USER_LOGIN,
        payload: req,
    };
}

export function logout() {
    // const req = firebaseAuth.login(email, password);
    const req = {user: '', signIn: false}
    return {
        type: USER_LOGOUT,
        payload: req,
    };
}