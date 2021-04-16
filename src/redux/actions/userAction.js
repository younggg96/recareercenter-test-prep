import { USER_LOGIN } from "./actionTypes";

export function login(email, password) {
    // const req = firebaseAuth.login(email, password);
    const req = {user: "aaa", signIn: true}
    return {
        type: USER_LOGIN,
        payload: req,
    };
}