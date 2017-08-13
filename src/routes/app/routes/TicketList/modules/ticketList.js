import { fromJS } from 'immutable'
import qs from 'qs'

import Api from 'Api'
import { actions as apiActions, API_LOGOUT_SUCCESS, API_MERGEIN_KEY } from 'Api/reducer'

// ------------------------------------
// Constants
// ------------------------------------
export const TICKET_LIST_INPUT_CHANGE = 'TICKET_LIST_INPUT_CHANGE'
export const TICKET_LIST_LOGOUT_SUCCESS = 'TICKET_LIST_LOGOUT_SUCCESS'
export const TICKET_LIST_LOGOUT_ERROR = 'TICKET_LIST_LOGOUT_ERROR'
export const TICKET_LIST_SUCCESS = 'TICKET_LIST_SUCCESS'
export const TICKET_LIST_ERROR = 'TICKET_LIST_ERROR'
export const TICKET_LIST_DOUBLE_ASYNC = 'TICKET_LIST_DOUBLE_ASYNC'

export const TICKET_LIST_SEARCH_CHANGE = 'TICKET_LIST_SEARCH_CHANGE'

export const TICKET_LIST_MERGEIN_TICKETS = 'TICKET_LIST_MERGEIN_TICKETS'
export const TICKET_LIST_MERGEIN_KEY = 'TICKET_LIST_MERGEIN_KEY'
export const TICKET_LIST_SETIN_KEY = 'TICKET_LIST_SETIN_KEY'

// ------------------------------------
// Actions
// ------------------------------------

/*
export function noop () {
  return {
    type: 'NOOP',
  }
}

*/
export function searchChange (search) {
  return {
    type: TICKET_LIST_SEARCH_CHANGE,
    search,
  }
}

export function setInKey(key, data) {
  console.log('setInKey', key, data)
  return {
    type: TICKET_LIST_SETIN_KEY,
    key,
    data,
  }
}
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getTicketList = (unread, skip, query) => {
  console.log('getTicketList', unread, skip, query)
  return (dispatch, getState) => {

    var params = {}

    if (unread)
      params.unread = unread
    
    var fungsiScope = {}
    switch (getState().api.getIn(['token','user','fungsi'])) {
      case 'dikbud':
        fungsiScope = {jnsVisa: {inq: ['College Student', 'Precollege Student', 'Student'] }}
        break
      case 'perhubungan':
        fungsiScope = {pekJpBukuPelautSel: 'YA'}
        break
      case 'naker':
        fungsiScope = {jnsVisa: {inq: ['Intra-company Transferee', 'Designated Activities', 'Trainee', 'Technical Intern Training', 'Medical Services', 'EPA Care Worker', 'EPA Nurse', 'Cultural Activities', 'Artist', 'Engineer', 'Entertainer', 'Instructor', 'Journalist', 'Legal/Accounting Services', 'Specialist in Humanities/Intl Services', 'Religious Activities', 'Skilled Labor' ] }}
        break          

      default:
        break
    }      
    console.log('fungsiScope', fungsiScope)
    if (Object.keys(fungsiScope).length)
      Object.assign(params.scope, fungsiScope)

    dispatch(setInKey( 'tickets', fromJS({}) ))
    return dispatch(apiActions.getRelevantTickets(params))
      .then((data) => {
        if (data.error || data.statusCode) {

        }
        else {
          let dataObj = data.reduce((result, item) => {
            result[item.id] = item
            return result
          }, {})

          dispatch(setInKey( 'tickets', fromJS(dataObj) ))
        }
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

  [TICKET_LIST_MERGEIN_KEY] : (state, action) => {
    return state
      .mergeIn([action.key], action.data)
  },

  [TICKET_LIST_SETIN_KEY] : (state, action) => {
    return state
      .setIn([action.key], action.data)
  },

  [TICKET_LIST_SEARCH_CHANGE]: (state, action) => {
    return state
      .set('search', action.search)
  },

  [TICKET_LIST_SUCCESS]    : (state, action) => {
    return state
      .merge({resetStatus: 'success', message: action.message})
  },

  [TICKET_LIST_ERROR] : (state, action) => {
    return state
      .merge({resetStatus: 'error', message: action.message})
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  message: '',
  tickets: {},
})

export default function ticketListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
