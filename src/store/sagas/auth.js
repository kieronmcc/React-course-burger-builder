import { put, delay } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../actions/index'


// * makes this a 'generator' function
// Can be executed in steps eg. to wait for async code to complete
export function* logoutSaga(action) {
    // Destroy local storage on logout as auth data will
    // no longer be valid after logout
    // yield keyword means only continue when the step is done
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export function* authUsersaga(action) {
    yield put(actions.authStart())

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDqptjiXfxTc2OHpTTdKgwVnAEjv6tppCQ'
    if (!action.isSignup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDqptjiXfxTc2OHpTTdKgwVnAEjv6tppCQ'
    }
    try {
        const res = yield axios.post(url, authData) 
        // Using local storage API of browser to persist user data
        // such as authentication across sessions
        const expirationDate = yield new Date (new Date().getTime() + res.data.expiresIn * 1000)
        yield localStorage.setItem('token', res.data.idToken)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', res.data.localId)
        yield put(actions.authSuccess(res.data.idToken, res.data.localId))
        yield put(actions.checkAuthTimeout(res.data.expiresIn))
    } catch (error) {
        if (error.response) {
            yield put(actions.authFail(error.response.data.error))
        } else {
            yield put(actions.authFail(error))
        }
    }
}