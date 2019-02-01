import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

export const authSuccess = authData => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData,
	}
}

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error,
	}
}

export const auth = (email, password) => {
	console.log('auth', email, password)
	return dispatch => {
		dispatch(authStart())
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		}

		console.log(`authData: ${JSON.stringify(auth, null, 2)}`)
		const signupUrl =
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAMNUCaVLqVBLr7fkW1DXShruopsDx2EQQ'
		const loginUrl =
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAMNUCaVLqVBLr7fkW1DXShruopsDx2EQQ'

		axios
			.post(signupUrl, authData)
			.then(response => {
				console.log(response)
				dispatch(authSuccess(response.data))
			})
			.catch(err => {
				console.log(err)
				dispatch(authFail(err))
			})
	}
}
