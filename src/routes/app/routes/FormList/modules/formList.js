import { fromJS } from 'immutable'
import qs from 'qs'

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

export const FORM_LIST_SEARCH_CHANGE = 'FORM_LIST_SEARCH_CHANGE'

export const FORM_LIST_MERGEIN_TICKETS = 'FORM_LIST_MERGEIN_TICKETS'
export const FORM_LIST_MERGEIN_KEY = 'FORM_LIST_MERGEIN_KEY'
export const FORM_LIST_SETIN_KEY = 'FORM_LIST_SETIN_KEY'

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
    type: FORM_LIST_SEARCH_CHANGE,
    search,
  }
}

export function setInKey(key, data) {
  return {
    type: FORM_LIST_SETIN_KEY,
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


export const getFormList = (category, skip, query) => {
  console.log('getFormList', category, skip, query)
  return (dispatch, getState) => {

    // WNIs model
    if (category == 'WNI') {
      var params = {
        skip: skip*100,
        fields: {id: true, nama: true, type: true, createdTime: true, updatedTime: true}
      }

      var qObj = query ? qs.parse(query.substr(1)) : null

      if (qObj) {
        console.log('qObj', qObj)
        params.where = {and:[]}
        Object.keys(qObj).forEach((k) => {
          if (k == 'nama')
            params.where.and.push({[k]:{like:'.*'+qObj[k]+'.*', options: 'i'}})
          else
            params.where.and.push({[k]:qObj[k]})
        })
      }


      var fungsiSearch = {}
      if (category == 'LaporDiri') {
        switch (getState().api.getIn(['token','user','fungsi'])) {
          case 'dikbud':
            fungsiSearch = {jnsVisa: {inq: ['College Student', 'Precollege Student', 'Student'] }}
            break
          case 'perhubungan':
            fungsiSearch = {pekJpBukuPelautSel: 'YA'}
            break
          case 'naker':
            fungsiSearch = {jnsVisa: {inq: ['Intra-company Transferee', 'Designated Activities', 'Trainee', 'Technical Intern Training', 'Medical Services', 'EPA Care Worker', 'EPA Nurse', 'Cultural Activities', 'Artist', 'Engineer', 'Entertainer', 'Instructor', 'Journalist', 'Legal/Accounting Services', 'Specialist in Humanities/Intl Services', 'Religious Activities', 'Skilled Labor' ] }}
            break          

          default:
            break
        }      
      }
      console.log('fungsiSearch', category, fungsiSearch)
      if (fungsiSearch)
        if (params.where)
          params.where.and.push(fungsiSearch)
        else
          params.where = fungsiSearch

      return dispatch(apiActions.getWnis(params))
        .then((data) => {
          if (data.error || data.statusCode) {

          }
          else {
            let dataObj = data.reduce((result, item) => {
              result[item.id] = item
              return result
            }, {})

            dispatch(setInKey( 'forms', fromJS(dataObj) ))
          }
        })
    }

    // Forms model
    var params = {
        where: {and: [{type: category}, {ticketStatus: {inq: ['open', 'submitted', 'close']}}]},
        skip:skip*100,
      }

    var qObj = query ? qs.parse(query.substr(1)) : null

    if (qObj) {
      console.log('qObj', qObj)
      Object.keys(qObj).forEach((k) => {
        if (k == 'nama')
          params.where.and.push({[k]:{like:'.*'+qObj[k]+'.*', options: 'i'}})
        else
          params.where.and.push({[k]:qObj[k]})
      })
    }

    var fungsiSearch = {}
    if (category == 'LaporDiri') {
      switch (getState().api.getIn(['token','user','fungsi'])) {
        case 'dikbud':
          fungsiSearch = {jnsVisa: {inq: ['College Student', 'Precollege Student', 'Student'] }}
          break
        case 'perhubungan':
          fungsiSearch = {pekJpBukuPelautSel: 'YA'}
          break
        case 'naker':
          fungsiSearch = {jnsVisa: {inq: ['Intra-company Transferee', 'Designated Activities', 'Trainee', 'Technical Intern Training', 'Medical Services', 'EPA Care Worker', 'EPA Nurse', 'Cultural Activities', 'Artist', 'Engineer', 'Entertainer', 'Instructor', 'Journalist', 'Legal/Accounting Services', 'Specialist in Humanities/Intl Services', 'Religious Activities', 'Skilled Labor' ] }}
          break          

        default:
          break
      }      
    }
    console.log('fungsiSearch', category, fungsiSearch)
    if (fungsiSearch)
      params.where.and.push(fungsiSearch)

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

          dispatch(setInKey( 'forms', fromJS(dataObj) ))
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

  [FORM_LIST_MERGEIN_KEY] : (state, action) => {
    return state
      .mergeIn([action.key], action.data)
  },

  [FORM_LIST_SETIN_KEY] : (state, action) => {
    return state
      .setIn([action.key], action.data)
  },

  [FORM_LIST_SEARCH_CHANGE]: (state, action) => {
    return state
      .set('search', action.search)
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
  search: '',
  message: '',
  userForms: {},
  tickets: {},
  forms: {}
})

export default function formListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
