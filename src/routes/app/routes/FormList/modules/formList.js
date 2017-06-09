import { fromJS } from 'immutable';

import Api from 'Api'
import { actions as apiActions, API_LOGOUT_SUCCESS, API_MERGEIN_KEY } from 'Api/reducer'

// ------------------------------------
// Constants
// ------------------------------------
export const FORM_LIST_INPUT_CHANGE = 'FORM_LIST_INPUT_CHANGE'
export const FORM_LIST_LOGOUT_SUCCESS = 'FORM_LIST_LOGOUT_SUCCESS'
export const FORM_LIST_LOGOUT_ERROR = 'FORM_LIST_LOGOUT_ERROR'
export const FORM_LIST_SUCCESS = 'FORM_LIST_SUCCESS'
export const FORM_LIST_ERROR = 'FORM_LIST_ERROR'
export const FORM_LIST_DOUBLE_ASYNC = 'FORM_LIST_DOUBLE_ASYNC'

export const FORM_LIST_MERGEIN_TICKETS = 'FORM_LIST_MERGEIN_TICKETS'
export const FORM_LIST_MERGEIN_KEY = 'FORM_LIST_MERGEIN_KEY'

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
    type: FORM_LIST_INPUT_CHANGE,
    name,
    val,
    validator,
  }
}
*/

export function mergeInKey(key, data) {
  return {
    type: FORM_LIST_MERGEIN_KEY,
    key,
    data,
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getOpenForms = () => {
  return (dispatch, getState) => {

    return dispatch(apiActions.getForms({where: {or: [{'ticketStatus': 'open'},{'submit': false}]}}))
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
    })
  }
}


export const getFormList = (category, offset) => {
  console.log('getFormList', category, offset)
  return (dispatch, getState) => {
 
    var params = {
        where: {and: [{type: category}, {ticketStatus: {inq: ['open', 'submitted', 'close']}}]},
        offset:offset*20,
      }

    var fields

    // fields are dependent on the form category
    switch (category) {
      case 'LaporDiri':
        fields = {id: true, nama: true, type: true, createdTime: true, updatedTime: true}
        break

      default:
    }

    if (fields) {
      Object.assign(params, {fields})
    }



    return dispatch(apiActions.getForms(params))
      .then((data) => {
        if (data.error || data.statusCode) {

        }
        else {
          let dataObj = data.reduce((result, item) => {
            result[item.id] = item
            return result
          }, {})

          dispatch(mergeInKey( 'forms', fromJS(dataObj) ))
        }

        // to test memoize cache
        // setTimeout(() => {
        //   dispatch(apiActions.getUserForms({}))
        //   .then((data) => {
        //     console.log('getUserForms {}', data)
        //   })
        // }, 10000)

        // setTimeout(() => {
        //   dispatch(apiActions.getUserForms({}))
        //   .then((data) => {
        //     console.log('getUserForms {}', data)
        //   })
        // }, 15000)

      })

  }
}

export const actions = {
  // noop,
  // inputChange,
  // getOpenForms: apiActions.getOpenForms,
  // getTickets: apiActions.getTickets,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [API_LOGOUT_SUCCESS] : (state, action) => {
    return initialState
  },

  [FORM_LIST_MERGEIN_KEY] : (state, action) => {
    return state
      .mergeIn([action.key], action.data)
  },

  [FORM_LIST_SUCCESS]    : (state, action) => {
    return state
      .merge({resetStatus: 'success', message: action.message})
  },

  [FORM_LIST_ERROR] : (state, action) => {
    return state
      .merge({resetStatus: 'error', message: action.message})
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  message: '',
  userForms: {},
  tickets: {},
  forms: {}
})

export default function formListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
