import { fromJS, List } from 'immutable';
import { browserHistory } from 'react-router'
import { memoize } from 'redux-memoize'

import Converter from 'utils/converter'

import Api from 'Api'
// ------------------------------------
// Constants
// ------------------------------------
export const API_REQUEST_CLEARTOKEN_LOADING = 'API_REQUEST_CLEARTOKEN_LOADING'
export const API_REQUEST_LOADING = 'API_REQUEST_LOADING'
export const API_REQUEST_SUCCESS = 'API_REQUEST_SUCCESS'
export const API_REQUEST_ERROR = 'API_REQUEST_ERROR'
export const API_LOGIN_SUCCESS = 'API_LOGIN_SUCCESS'
export const API_LOGIN_ERROR = 'API_LOGIN_ERROR'
export const API_LOGOUT_SUCCESS = 'API_LOGOUT_SUCCESS'
export const API_LOGOUT_ERROR = 'API_LOGOUT_ERROR'
export const API_SET_TOKEN = 'API_SET_TOKEN'
export const API_SET_WNI = 'API_SET_WNI'
export const API_SETIN_KEY = 'API_SETIN_KEY'
export const API_MERGEIN_KEY = 'API_MERGEIN_KEY'

// ------------------------------------
// Actions
// ------------------------------------

export function requestClearTokenStart() {
	return {
		type: API_REQUEST_CLEARTOKEN_LOADING,
	}
}

export function requestStart() {
	return {
		type: API_REQUEST_LOADING,
	}
}

export function requestSuccess() {
	return {
		type: API_REQUEST_SUCCESS,
	}
}

export function requestError(error) {
	return {
		type: API_REQUEST_ERROR,
		error,
	}
}

export function setToken(userId, token) {
	return {
		type: API_SET_TOKEN,
		userId,
		token,
	}
}

export function setWni(data) {
	return {
		type: API_SET_WNI,
		data,
	}
}

export function setLogin(data) {
	return {
		type: API_LOGIN_SUCCESS,
		data,
	}
}

export function setLoginError(error) {
	return {
		type: API_LOGIN_ERROR,
		error
	}
}

export function setLogout() {
	return {
		type: API_LOGOUT_SUCCESS,
	}
}

export function setLogoutError(error) {
	return {
		type: API_LOGOUT_ERROR,
		error,
	}
}

export function setInKey(apiKey, data) {
	return {
		type: API_SETIN_KEY,
		apiKey,
		data,
	}
}

export function mergeInKey(apiKey, data) {
	return {
		type: API_MERGEIN_KEY,
		apiKey,
		data,
	}
}

/* ----

user login and logout thunks

---- */

export const login = (param) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		return new Promise((resolve) => {
			var {username, email, password, ttl} = param
			username = username ? username.trim() : username
			email = email ? email.trim() : email
			return Api.login({username, email, password, ttl})
				.then((data) => {
					if (!data.error && !data.code) {
						dispatch(setLogin(data))
						dispatch({
							type: 'CLEAR_TEMP_SAVE',
						})
					}
					else {
						dispatch(setLoginError(data))
					}
					resolve(data)
				})
		})
	}
}

export const logout = () => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		return new Promise((resolve) => {
			return Api.logout(getState().api.getIn(['token','id']))
				.then((data) => {
					if (!data.error) {
						dispatch(setLogout())
						dispatch({
							type: 'CLEAR_TEMP_SAVE',
						})
					}
					else {
						dispatch(setLogoutError(data.error))
					}
					resolve(data)
				})
		})
	}
}

export const findToken = () => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		return new Promise((resolve) => {
			return Api.findToken()
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(setLoginError(data))
					}
					else {
						dispatch(setLogin(data))
					}
					resolve(data)
				})
		})
	}
}

/* ----

 startPage for lapor diri

---- */

export const findWni = (param) => {
	return (dispatch, getState) => {
		dispatch(requestClearTokenStart())
		return new Promise((resolve) => {
			var {nama, paspor, tglLahir} = param
			nama = nama ? nama.trim() : nama
			paspor = paspor ? paspor.trim() : paspor
			tglLahir = tglLahir ? Converter.fromDateToISOString(tglLahir.trim()) : tglLahir
			return Api.findWni({nama, paspor, tglLahir})
				.then((data) => {
					if (!data.error) {
						dispatch(setWni(data))
					}
					else {
						dispatch(requestError(data.error))
					}
					resolve(data)
				})
		})
	}
}

/* ----

the following thunks are used by logged in users

---- */

export const getWniById = memoize({ttl: 4000}, (formId, ticket) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var userId = getState().api.getIn(['token','userId'])

		var param = null

		if (ticket) {
			param = {include: {
				relation: 'tickets',
				scope: 'sender',
			}}
		}

		return new Promise((resolve) => {
			var cachedData = getCache('forms', formId, getState().api)
			if (cachedData) {
				return resolve(cachedData)
			}

			return Api.getWniById(formId, param, token)
				.then((data) => {
					if (data.error) {
						dispatch(requestError(data.error))
					}
					else {
						// let dataObj = {[formId]: data}
						// dispatch(mergeInKey('forms',fromJS(dataObj)))
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const getWnis = memoize({ttl: 1000}, (filterParam) => {
	return (dispatch, getState) => {
		var token = getState().api.getIn(['token','id'])
		dispatch(requestStart())
		return new Promise((resolve) => {
			filterParam = Object.assign(filterParam, {
				order: ['createdTime DESC'],
				limit: 100,
			})
			return Api.getWnis(filterParam, token)
				.then((data) => {
					if (data.error) {
						dispatch(requestError(data.error))
					}
					else {
						// let dataObj = data.reduce((result, item) => {
						// 	result[item.id] = item
						// 	return result
						// }, {})
						
						// dispatch(mergeInKey('forms', fromJS(dataObj)))
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const updateWni = memoize({ttl: 500}, (formValues) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])

		return new Promise((resolve) => {
			return Api.updateWni(formId, formValues, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error))
					}
					else {
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})


export const patchWni = memoize({ttl: 500}, (formValues) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var formId = formValues.id
		delete formValues.id

		return new Promise((resolve) => {
			return Api.patchWni(formId, formValues, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error))
					}
					else {
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})



// utility function to cache API request results

const storeCache = (type, data, dispatch) => {
	var now = new Date()
	console.log('storeCache', type, now)
	if (type == 'forms') {
		if (!Array.isArray(data))
			data = [data]
		let dataObj = data.reduce((result, item) => {
			item.cachedTime = now
			result[item.id] = item
			return result
		}, {})

		dispatch(mergeInKey( 'forms', fromJS(dataObj) ))

		data.forEach((d) => {
			try {
				let dataObj = d.tickets.reduce((result, item) => {
					if (item.sender)
						dispatch(mergeInKey( 'users', fromJS({[item.sender.id]: item.sender})))
					item.cachedTime = now
					result[item.id] = item
					return result
				}, {})
				dispatch(mergeInKey( 'tickets', fromJS(dataObj) ))
			} catch(e) {}
		})
	}

	if (type == 'tickets') {
		if (!Array.isArray(data))
			data = [data]
		let dataObj = data.reduce((result, item) => {
			item.cachedTime = now
			result[item.id] = item
			return result
		}, {})

		dispatch(mergeInKey( 'tickets', fromJS(dataObj) ))


	}

}

const getCache = (type, id, state) => {
	var now = new Date()
	var data = state.getIn([type, id])
	if (data && (data.cachedTime - now < 20000)) { // only cached for 20 seconds
		console.log('getCache', type, id, now)
		data.cachedTime = null
		delete data.cachedTime
		return data
	}
}

export const getImage = memoize({ttl: 60000}, (fileParam) => {
	return (dispatch, getState) => {
		var token = getState().api.getIn(['token','id'])
		var userId = getState().api.getIn(['token','userId'])

		return new Promise((resolve) => {
			return Api.getImage(fileParam, token)
				.then((imgData) => {
					if (imgData.error || imgData.statusCode) 
						return resolve(imgData)
					return Converter.blobToDataURL(imgData, function(imgDataURI) {
						resolve(imgDataURI)
					})
				})
		})
	}
})

export const postImage = memoize({ttl: 30000}, (fileParam) => {
	// console.log('postImage', fileParam)
	return (dispatch, getState) => {
		var token = getState().api.getIn(['token','id'])
		return new Promise((resolve) => {
			return Api.postImage(fileParam, token)
				.then((imgData) => {
					return resolve(imgData)
				})
		})
	}

})
/*
	use memoize to cache for 5 seconds XXX better use less than 5 seconds?
  
  do we need to store the data in the api redux store?
*/
export const getUserForms = memoize({ttl: 20000}, (filterParam, tickets) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var userId = getState().api.getIn(['token','userId'])
		return new Promise((resolve) => {
			filterParam = Object.assign({where: {}, limit: 20, order: 'updatedTime DESC'}, filterParam)

			if (tickets) {
				filterParam.include = {
					relation: 'tickets',
					scope: {
						include: 'sender',
					},
				}
			}
			return Api.getUserForms(userId, filterParam, token)
				.then((data) => {
					console.log('Api.getUserForms')
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error || data))
					}
					else {
						// storeCache('forms', data, dispatch)
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

/*

	this code is agressive, where it stores the data received from the server in different keys
	for the relation.
	how to use this in cache?
	should we abandon this?

*/
export const XXXgetUserForms = (where) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var userId = getState().api.getIn(['token','userId'])
		return new Promise((resolve) => {
			var filterParam = {
				where: where, //{or: [{'ticketStatus': 'open'},{'submit': false}]},
				order: 'updatedTime DESC',
				include: {
					relation: 'tickets',
					scope: {
						include: 'sender',
					},
				}
			}
			return Api.getUserForms(userId, filterParam, token)
				.then((data) => {
					if (!data.error) {

						let dataObj = data.reduce((result, item) => {
							result[item.id] = item
							return result
						}, {})

						dispatch(mergeInKey( 'forms', fromJS(dataObj) ))

						data.forEach((d) => {
							let dataObj = d.tickets.reduce((result, item) => {
								if (item.sender)
									dispatch(mergeInKey( 'users', fromJS({[item.sender.id]: item.sender})))
								result[item.id] = item
								return result
							}, {})
							dispatch(mergeInKey( 'tickets', fromJS(dataObj) ))
						})

					}
					resolve(data)
				})
		})
	}
}

export const getFormById = memoize({ttl: 4000}, (formId, ticket) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var userId = getState().api.getIn(['token','userId'])

		var param = null

		if (ticket) {
			param = {include: {
				relation: 'tickets',
				scope: 'sender',
			}}
		}

		return new Promise((resolve) => {
			var cachedData = getCache('forms', formId, getState().api)
			if (cachedData) {
				return resolve(cachedData)
			}

			return Api.getFormById(formId, param, token)
				.then((data) => {
					if (data.error) {
						dispatch(requestError(data.error))
					}
					else {
						// let dataObj = {[formId]: data}
						// dispatch(mergeInKey('forms',fromJS(dataObj)))
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const getForms = memoize({ttl: 1000}, (filterParam) => {
	return (dispatch, getState) => {
		var token = getState().api.getIn(['token','id'])
		dispatch(requestStart())
		return new Promise((resolve) => {
			filterParam = Object.assign(filterParam, {
				order: ['ticketStatus DESC', 'updatedTime DESC'],
				limit: 100,
				// include: {
				// 	relation: 'tickets',
				// 	scope: {
				// 		include: 'sender',
				// 	},
				// }
			})
			return Api.getForms(filterParam, token)
				.then((data) => {
					if (data.error) {
						dispatch(requestError(data.error))
					}
					else {
						// let dataObj = data.reduce((result, item) => {
						// 	result[item.id] = item
						// 	return result
						// }, {})
						
						// dispatch(mergeInKey('forms', fromJS(dataObj)))
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const submitForm = memoize({ttl: 10000}, (formValues) => {
	/*
		submitForm is either createForm for a new form or
		updateForm, where the server will obsolete the old form,
		thus maintaining the form id while keeping a history
		*/
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var userId = getState().api.getIn(['token','userId'])

		var now = new Date()

		return new Promise((resolve, reject) => {
			var apiFormValues = Converter.formTgltoApiDate(formValues)
			if (!formValues.id || formValues.id == 'new') {
				delete formValues.id
				formValues.ticketStatus = 'open'

				dispatch(createForm(apiFormValues))
					.then((data) => {
						if (data.error || data.statusCode) {
							dispatch(requestError(data.error || data))
							resolve(data)
						}
						else {
							dispatch(requestSuccess())
							resolve(data)
						}
					})
			}
			else {			
				// create a new  (obsoleted) form based on the current one
				var oldValues = Object.assign({}, formValues)
				delete oldValues.id
				oldValues.obsoletedBy = formValues.id
				oldValues.ticketStatus = 'obsolete'
				oldValues.updatedTime = now.toISOString()

				dispatch(updateForm(formValues))
					.then((data) => {
						if (data.error || data.statusCode) {
							dispatch(requestError(data.error))
						}
						else {
							dispatch(requestSuccess())
						}
						resolve(data)
					})
/*					
				dispatch(createForm(oldValues))
					.then((data) => {
						if (data.error || data.statusCode) {
							dispatch(requestError(data.error || data))
							resolve(data)
						}
						else {
							dispatch(requestSuccess())
							
							formValues.obsoletes = data.id
							formValues.updatedTime = now
							formValues.ticketStatus = 'open'

							dispatch(updateForm(formValues))
								.then((data) => {
									if (data.error || data.statusCode) {
										dispatch(requestError(data.error))
									}
									else {
										dispatch(requestSuccess())
									}
									resolve(data)
								})
						}

					})
			*/
			}
		})
	}
})

export const createForm = memoize({ttl: 500}, (formValues) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])

		return new Promise((resolve) => {
			return Api.createForm(formValues, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error))
					}
					else {
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const updateForm = memoize({ttl: 500}, (formValues) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])

		return new Promise((resolve) => {
			return Api.updateForm(formId, formValues, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error))
					}
					else {
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})


export const patchForm = memoize({ttl: 500}, (formValues) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var formId = formValues.id
		delete formValues.id

		return new Promise((resolve) => {
			return Api.patchForm(formId, formValues, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error))
					}
					else {
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

// -- Tickets

export const getTickets = memoize({ttl: 10000}, (filterParam) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		return new Promise((resolve) => {
			return Api.getTickets({include: 'sender'}, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error || data))
					}
					else {
						// let dataObj = data.reduce((result, item) => {
						// 	result[item.id] = item
						// 	return result
						// }, {})
						
						// dispatch(mergeInKey('tickets', fromJS(dataObj)))
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const getUserTickets = (param) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var userId = getState().api.getIn(['token','userId'])
		return new Promise((resolve) => {
			return Api.getUserTickets(userId, param, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error || data))
					}
					else {
						// let dataObj = data.reduce((result, item) => {
						// 	result[item.id] = item
						// 	return result
						// }, {})
						
						// dispatch(mergeInKey('tickets', fromJS(dataObj)))

						storeCache('tickets', data, dispatch)
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
}

export const addTicket = memoize({ttl: 500}, (formId, userId, message) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var senderId = getState().api.getIn(['token','userId'])
		var param = {
			message,
			formId,
			userId,
			senderId,
			readBy: [senderId],
		}
		return new Promise((resolve) => {
			return Api.createTicket(param, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error))
					}
					else {
						dispatch(requestSuccess())
						// let dataObj = fromJS({[data.id]: data })
						// dispatch(mergeInKey('tickets',dataObj))
					}
					resolve(data)
				})
		})
	}
})

export const addReadByTickets = memoize({ttl: 500}, (where, attr) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		return new Promise((resolve) => {
			return Api.addReadByTickets(where, attr, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error || data))
					}
					else {
						// let dataObj = data.tickets.reduce((result, item) => {
						// 	result[item.id] = item
						// 	return result
						// }, {})
						// dispatch(mergeInKey('tickets',dataObj))
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const getFormView = (id, link) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		var formList = getState().api
		return new Promise((resolve) => {
			return Api.getFormById(id, null, token)
				.then((data) => {
					if (!data.error) {
						browserHistory.push(link)
						dispatch(setInKey('formView',data))
					}
					else {
						dispatch(requestError(data.error))
					}
					resolve(data)
				})
		})
	}
}

// -- user
export const getUserById = memoize({ttl: 5000}, (userId) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])

		return new Promise((resolve) => {
			// var cachedData = getCache('users', userId, getState().api)
			// if (cachedData) {
			// 	return resolve(cachedData)
			// }

			return Api.getUserById(userId, token)
				.then((data) => {
					if (data.error) {
						dispatch(requestError(data.error))
					}
					else {
						// let dataObj = {[userId]: data}
						// dispatch(mergeInKey('users',fromJS(dataObj)))
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const getUsers = memoize({ttl: 500}, (filterParam) => {
	return (dispatch, getState) => {
		var token = getState().api.getIn(['token','id'])
		dispatch(requestStart())
		return new Promise((resolve) => {
			// var filterParam = {
			// 	order: 'updatedTime DESC',
			// 	include: {
			// 		relation: 'tickets',
			// 		scope: {
			// 			include: 'sender',
			// 		},
			// 	}
			// }
			return Api.getUsers(filterParam, token)
				.then((data) => {
					if (data.error) {
						dispatch(requestError(data.error))
					}
					else {
						// let dataObj = data.reduce((result, item) => {
						// 	result[item.id] = item
						// 	return result
						// }, {})
						
						// dispatch(mergeInKey('users', fromJS(dataObj)))
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const createUser = memoize({ttl: 500}, (userValues) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])

		return new Promise((resolve) => {
			return Api.createUser(userValues, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error))
					}
					else {
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const updateUser = memoize({ttl: 500}, (userId, userValues) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])

		return new Promise((resolve) => {
			return Api.updateUser(userId, userValues, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error))
					}
					else {
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})

export const deleteUser = memoize({ttl: 500}, (userId) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])

		return new Promise((resolve) => {
			return Api.deleteUser(userId, token)
				.then((data) => {
					if (data.error || data.statusCode) {
						dispatch(requestError(data.error))
					}
					else {
						dispatch(requestSuccess())
					}
					resolve(data)
				})
		})
	}
})


// -- admin API related --

export const getFormTimeStats = (where) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		return new Promise((resolve) => {
			return Api.getFormTimeStats(where, token)
				.then((data) => {
					if (!data.error) {
						dispatch(requestSuccess())
					}
					else {
						dispatch(requestError(data.error))
					}
					resolve(data)
				})
		})
	}
}

export const getFormSelectionStats = (where) => {
	return (dispatch, getState) => {
		dispatch(requestStart())
		var token = getState().api.getIn(['token','id'])
		return new Promise((resolve) => {
			return Api.getFormSelectionStats(where, token)
				.then((data) => {
					if (!data.error) {
						dispatch(requestSuccess())
					}
					else {
						dispatch(requestError(data.error))
					}
					resolve(data)
				})
		})
	}
}




export const actions = {
	requestClearTokenStart,
	requestStart,
	requestSuccess,
	requestError,
	setLogin,
	setToken,
	findWni,
	setWni,
	getWnis,
	getWniById,
	findToken,
	getImage,
	postImage,
	createForm,
	getUserForms,
	getFormById,
	getForms,
	getFormView,
	updateForm,
	patchForm,
	submitForm,
	getUserTickets,
	getTickets,
	addTicket,
	addReadByTickets,
	getUserById,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	login,
	logout,
}

const ACTION_HANDLERS = {

	[API_REQUEST_CLEARTOKEN_LOADING]: (state, action) => {
		return state
			.merge({loading: true, error: false, errorData: fromJS({}) })
			.remove('wni')
			.remove('token')
	},

	[API_REQUEST_LOADING]: (state, action) => {
		return state.merge({loading: true, error: false, errorData: fromJS({}) })
	},

	[API_REQUEST_SUCCESS]: (state, action) => {
		return state.merge({loading: false, error: false, errorData: fromJS({}) })
	},

	[API_REQUEST_ERROR]: (state, action) => {
		return state
			.merge({loading: false, error: true})
			.set('errorData', action.error)

	},

	[API_SET_TOKEN]: (state, action) => {
		const {userId, token} = action;
		// console.log('setToken', userId, token);
		return state
		.merge({loading: false, error: false, errorData: fromJS({}) })
		.mergeIn(['token'],{userId:userId, id:token})
	},

	[API_LOGIN_SUCCESS]: (state, action) => {
		// const {userId, id, created, ttl} = action;
		// console.log('setToken', userId, token);
		return state
		.merge({loading: false, error: false, errorData: fromJS({}), wni: fromJS({}) })
		.mergeIn(['token'], action.data)
	},

	[API_LOGIN_ERROR]: (state, action) => {
		// const {userId, id, created, ttl} = action;
		// console.log('setToken', userId, token);
		return state
		.merge({loading: false, error: true, wni: fromJS({}) })
		.set('errorData', action.error)
		.remove('token')
	},

	[API_LOGOUT_SUCCESS]: (state, action) => {
		// const {userId, id, created, ttl} = action;
		// console.log('setToken', userId, token);
		// return state
		// .merge({loading: false, error: false})
		// .remove('token')
		return initialState
	},


	[API_LOGOUT_ERROR]: (state, action) => {
		// const {userId, id, created, ttl} = action;
		// console.log('setToken', userId, token);
		return state
		.merge({loading: false, error: true})
		.set('errorData', action.error)
	},

	[API_SET_WNI]: (state, action) => {
		let { token } = action.data
		return state
			.merge({ loading: false, error: false, errorData: fromJS({}) , wni: fromJS(action.data) })
			.removeIn(['wni','token'])
			.mergeIn(['token'], {id: token, userId: action.data.userId})

	},

	[API_SETIN_KEY]: (state, action) => {
		return state
			.merge({loading: false, error: false, errorData: fromJS({}) })
			.setIn([action.apiKey], action.data)

	},

	[API_MERGEIN_KEY]: (state, action) => {
		console.log('mergein_key', action.apiKey, action.data.toJS())
		return state
			.merge({loading: false, error: false, errorData: fromJS({}) })
			.mergeIn([action.apiKey], action.data)

	},

}

// reduces api state based on the apiKey, which is a subtree in API
// each subtree represents a model row from the server
// this reducer capture actions from other routes
function otherActionHandlers(state, action) {
	if (action.type.match(/_(TEMP_SAVE|SUBMIT)_SUCCESS$/)) {
		return state
			.mergeIn([action.apiKey], action.data)
	}
	return state
}

const initialState = fromJS({
  loading: false,
  error: false,
  token: {},
  wni: {},
  forms: {},
  tickets: {},
})

export default function apiReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  if (handler)
  	return handler(state, action)

  return otherActionHandlers(state, action)
  // return handler ? handler(state, action) : state
}

