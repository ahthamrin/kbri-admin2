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
  console.log('setInKey', key, data)
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


export const getFormList = (category, skip, query, csv) => {
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
        params.where = {}
        var qOrList = []
        Object.keys(qObj).forEach((k) => {
          if (k.match(/(nama|email|almt)/))
            qOrList.push({[k]:{like:'.*'+qObj[k]+'.*', options: 'i'}})
          else {
            if (k.match(/(tgl|Date|Time)/)) {
              // time fields can have greater/less than
              if (qObj[k].substr(0,2) == '<=') {
                // qAndList.push({[k]:{lte:qObj[k].substr(2)}})
                params.where[k] = {lte:qObj[k].substr(2)}
              }
              else if (qObj[k].substr(0,2) == '>=') {
                // qAndList.push({[k]:{gte:qObj[k].substr(2)}})
                params.where[k] = {gte:qObj[k].substr(2)}
              }
              else if (qObj[k][0] == '<') {
                // qAndList.push({[k]:{lt:qObj[k].substr(1)}})
                params.where[k] = {lt:qObj[k].substr(1)}
              }
              else if (qObj[k][0] == '>') {
                // qAndList.push({[k]:{gt:qObj[k].substr(1)}})
                params.where[k] = {gt:qObj[k].substr(1)}
              }
              else {
                // qAndList.push({[k]:qObj[k]})
                params.where[k] = qObj[k]
              }
            }
            else {
                params.where[k] = qObj[k]
            }
          }
        })

      if (qOrList.length)
        params.where['or'] = qOrList

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
      if (Object.keys(fungsiSearch).length)
        Object.assign(params.where, fungsiSearch)

      dispatch(setInKey( 'forms', fromJS({}) ))
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
    } // end of WNI model

    // Forms model
    var params = {
        // where: {and: [{type: category}, {ticketStatus: {inq: ['open', 'submitted', 'close']}}]},
        where: {type: category, ticketStatus: {inq: ['open', 'close', 'submitted']}},
        skip:skip*100,
      }

    var qObj = query ? qs.parse(query.substr(1)) : null

    if (qObj) {
      console.log('qObj', qObj)
      var qOrList = []
      Object.keys(qObj).forEach((k) => {
        if (k.match(/(nama|email|almt)/))
          qOrList.push({[k]:{like:'.*'+qObj[k]+'.*', options: 'i'}})
        else {
          if (k.match(/(tgl|Date|Time)/)) {
            // time fields can have greater/less than
            if (qObj[k].substr(0,2) == '<=') {
              // qAndList.push({[k]:{lte:qObj[k].substr(2)}})
              params.where[k] = {lte:qObj[k].substr(2)}
            }
            else if (qObj[k].substr(0,2) == '>=') {
              // qAndList.push({[k]:{gte:qObj[k].substr(2)}})
              params.where[k] = {gte:qObj[k].substr(2)}
            }
            else if (qObj[k][0] == '<') {
              // qAndList.push({[k]:{lt:qObj[k].substr(1)}})
              params.where[k] = {lt:qObj[k].substr(1)}
            }
            else if (qObj[k][0] == '>') {
              // qAndList.push({[k]:{gt:qObj[k].substr(1)}})
              params.where[k] = {gt:qObj[k].substr(1)}
            }
            else {
              // qAndList.push({[k]:qObj[k]})
              params.where[k] = qObj[k]
            }
          }
          else {
              params.where[k] = qObj[k]
          }
        }
      })

    if (qOrList.length)
      params.where['or'] = qOrList

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
    if (Object.keys(fungsiSearch).length)
      Object.assign(params.where, fungsiSearch)


    if (csv) {
      var token = getState().api.getIn(['token','id'])
      delete params.skip
      return window.open('https://sakuraindonesia.jp/api/Forms/csv?filter='+encodeURIComponent(JSON.stringify(params))+'&access_token='+token)
    }


    var fields
    // fields are dependent on the form category
    switch (category) {
      case 'LaporDiri':
        fields = {id: true, nama: true, type: true, createdTime: true, updatedTime: true, ticketStatus: true}
        break

      default:
    }

    if (fields) {
      Object.assign(params, {fields})
    }

    dispatch(setInKey( 'forms', fromJS({}) ))
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
