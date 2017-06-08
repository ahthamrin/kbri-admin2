import { fromJS } from 'immutable';

import { login, API_LOGIN_SUCCESS, API_LOGIN_ERROR } from 'Api/reducer'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_INCREMENT = 'LOGIN_INCREMENT'
export const LOGIN_LOGIN = 'LOGIN_LOGIN'
export const LOGIN_INPUT_CHANGE = 'LOGIN_INPUT_CHANGE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'


// ------------------------------------
// Actions
// ------------------------------------
export function inputChange (name, val, validator) {
  return {
    type: LOGIN_INPUT_CHANGE,
    name,
    val,
    validator,
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const loginUser = (loginForm) => {
  loginForm.ttl = 1209600000 // two weeks
  return login(loginForm)
}

export const actions = {
  inputChange,
  loginUser,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_INPUT_CHANGE]: (state, action) => {
    let errMsg;
    if (action.validator)
      errMsg = action.validator(action.val)

    return state
      .setIn(['formValues', action.name], action.val)
      .setIn(['formErrors', action.name], action.val)
  },

  [API_LOGIN_SUCCESS] : (state, action) => {
    let display = 'login'
    if (action.data.statusCode)
      display = 'start'
    return state
      .set('display', display)
  },

  'LOCATION_CHANGE': (state, action) => {
    return state
      .set('message', '')
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  message: '',
  formValues: {},
  formErrors: {},
})

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
