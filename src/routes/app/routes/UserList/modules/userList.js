import { fromJS } from 'immutable';

import Api from 'Api'
import { actions as apiActions, API_LOGOUT_SUCCESS, API_MERGEIN_KEY } from 'Api/reducer'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_LIST_INPUT_CHANGE = 'USER_LIST_INPUT_CHANGE'
export const USER_LIST_LOGOUT_SUCCESS = 'USER_LIST_LOGOUT_SUCCESS'
export const USER_LIST_LOGOUT_ERROR = 'USER_LIST_LOGOUT_ERROR'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const USER_LIST_ERROR = 'USER_LIST_ERROR'
export const USER_LIST_DOUBLE_ASYNC = 'USER_LIST_DOUBLE_ASYNC'

export const USER_LIST_SETIN_KEY = 'USER_LIST_SETIN_KEY'

// ------------------------------------
// Actions
// ------------------------------------

/*
export function noop () {
  return {
    type: 'NOOP',
  }
}


export function inputChange (name, val, validator) {
  return {
    type: USER_LIST_INPUT_CHANGE,
    name,
    val,
    validator,
  }
}
*/

export function mergeInKey(key, data) {
  return {
    type: USER_LIST_SETIN_KEY,
    key,
    data,
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getUserList = (offset) => {
  console.log('getUserList', offset)
  return (dispatch, getState) => {
 
    var params = {
        where: {username: {regexp: '^.'}},
        offset:offset*20,
      }

    return dispatch(apiActions.getUsers(params))
      .then((data) => {
        if (data.error || data.statusCode) {

        }
        else {
          let dataObj = data.reduce((result, item) => {
            result[item.id] = item
            return result
          }, {})

          dispatch(mergeInKey( 'users', fromJS(dataObj) ))
        }

        // to test memoize cache
        // setTimeout(() => {
        //   dispatch(apiActions.getUserUsers({}))
        //   .then((data) => {
        //     console.log('getUserUsers {}', data)
        //   })
        // }, 10000)


  // formList : formList(state),        // setTimeout(() => {
        //   dispatch(apiActions.getUserUsers({}))
        //   .then((data) => {
        //     console.log('getUserUsers {}', data)
        //   })
        // }, 15000)

      })

  }
}

export const actions = {
  // noop,
  // inputChange,
  // getOpenUsers: apiActions.getOpenUsers,
  // getTickets: apiActions.getTickets,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [API_LOGOUT_SUCCESS] : (state, action) => {
    return initialState
  },

  [USER_LIST_SETIN_KEY] : (state, action) => {
    return state
      .setIn([action.key], action.data)
  },

  [USER_LIST_SUCCESS]    : (state, action) => {
    return state
      .merge({resetStatus: 'success', message: action.message})
  },

  [USER_LIST_ERROR] : (state, action) => {
    return state
      .merge({resetStatus: 'error', message: action.message})
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  message: '',
  users: {}
})

export default function userListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
