import * as actionTypes from './actionTypes';
import axios from 'axios';

import React from 'react';

// Action Creators
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    console.log("Logout Action called")
    // Destroy local storage on logout as auth data will
    // no longer be valid after logout
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

// Authentication Action(dispatcher - dispatch arg comes from redux-thunk)
export const auth = (email, password, isSignup) => {
    return async dispatch => {
        try {
            dispatch(authStart())
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDqptjiXfxTc2OHpTTdKgwVnAEjv6tppCQ'
            if (!isSignup) {
                url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDqptjiXfxTc2OHpTTdKgwVnAEjv6tppCQ'
            }
            const res = await axios.post(url, authData) 
            console.log('Auth Response: ', res)
            // Using local storage API of browser to persist user data
            // such as authentication across sessions
            const expirationDate = new Date (new Date().getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', res.data.localId)
            dispatch(authSuccess(res.data.idToken, res.data.localId))
            dispatch(checkAuthTimeout(res.data.expiresIn))
        } catch (error) {
            if (error.response) {
                console.log('Auth Error: ', error.response)
                dispatch(authFail(error.response.data.error))
            } else {
                console.log('Auth Error: ', error)
                dispatch(authFail(error))
            }
        }
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const retrieveAuthData = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }
        }
    }
}