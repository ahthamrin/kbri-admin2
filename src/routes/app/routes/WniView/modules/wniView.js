import { fromJS } from 'immutable'

import async from 'async'
import Api from 'Api'
import { actions as apiActions } from 'Api/reducer'

// ------------------------------------
// Constants *** WNI
// ------------------------------------
export const WNI_VIEW_INPUT_CHANGE = 'WNI_VIEW_INPUT_CHANGE'
export const WNI_VIEW_LOGOUT_SUCCESS = 'WNI_VIEW_LOGOUT_SUCCESS'
export const WNI_VIEW_LOGOUT_ERROR = 'WNI_VIEW_LOGOUT_ERROR'
export const WNI_VIEW_SUCCESS = 'WNI_VIEW_SUCCESS'
export const WNI_VIEW_ERROR = 'WNI_VIEW_ERROR'
export const WNI_VIEW_FORM_ID = 'WNI_VIEW_FORM_ID'
export const WNI_VIEW_FORM_INPUT_CHANGE = 'WNI_VIEW_FORM_INPUT_CHANGE'
export const WNI_VIEW_FORM_VALUES = 'WNI_VIEW_FORM_VALUES'
export const WNI_VIEW_FORM_TICKETS = 'WNI_VIEW_FORM_TICKETS'
export const WNI_VIEW_FORM_MERGEIN_TICKETS = 'WNI_VIEW_FORM_MERGEIN_TICKETS'

// ------------------------------------
// Actions
// ------------------------------------


export function noop () {
  return {
    type: 'NOOP',
  }
}

export function inputChange (name, val) {
  return {
    type: WNI_VIEW_INPUT_CHANGE,
    name,
    val,
  }
}

export function formInputChange (name, val) {
  return {
    type: WNI_VIEW_FORM_INPUT_CHANGE,
    name,
    val,
  }
}

export function setFormId(formId) {
  return (dispatch, getState) => {
    dispatch({
      type: WNI_VIEW_FORM_ID,
      formId,
    })

    dispatch(apiActions.getWniById(formId))
    .then((formValues) => {
      if (formValues.error || formValues.statusCode)
        return

      console.log('formData', formValues)

      dispatch({
        type: WNI_VIEW_FORM_VALUES,
        formValues: fromJS(formValues),
      })

      async.parallel(getImages(formValues, dispatch), (err, results) => {
        
        formValues = fromJS(Object.assign(formValues, results))
        
        dispatch({
          type: WNI_VIEW_FORM_VALUES,
          formValues,
        })
      })

    })
  }
}

// completely the same as the code in the formEdit
const getImages = (formValues, dispatch) => {
  if (!formValues)
    return {}

  var imageObj = Object.keys(formValues).reduce((result, item) => {
    if (item.match(/^file_/)) {
      result[item.replace('file_','')] = (cb) => {
        var fileParam = {
          container: formValues.type,
          filename: formValues[item],
        }
        dispatch(apiActions.getImage(fileParam))
          .then((imgDataURI) => {
            if (imgDataURI.error || imgDataURI.statusCode)
              return cb(imgDataURI)
            cb(null, imgDataURI)
          })
      }
    }
    return result
  }, {})
  return imageObj
}

export const sendMessage = () => {
  return (dispatch, getState) => {
    var message = getState().formView.get('ticketMessage')
    var formId = getState().formView.get('formId')
    var formUserId = getState().formView.getIn(['formValues', 'userId'])
    return dispatch(apiActions.addTicket(formId, formUserId, message))
    .then((ticket)=> {
      if (ticket.error || ticket.statusCode) {
        dispatch(noop)
        // XXX should display an error
      }
      else {
        let tickets = fromJS({[ticket.id]: ticket })
        dispatch({
          type: WNI_VIEW_FORM_MERGEIN_TICKETS,
          tickets,
        })
        dispatch(inputChange('ticketMessage', ''))
      }
    })
  }
}
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const updateWni = (status) => {
  return (dispatch, getState) => {
    var currentUser = getState().api.getIn(['token','user','username'])
    var formValues = getState().formView.get('formValues').toJS()
    var origFormValues = getState().formView.get('formValues').toJS()

    var formAttributes = {
      id: formValues.id,
      ticketStatus: status,
      checkedBy: currentUser,
      checkedTime: new Date()
    }

    if (formValues.lat && formValues.lng) {
      Object.assign(formAttributes, {lat: formValues.lat, lng: formValues.lng})
    }

    dispatch(apiActions.patchWni(formAttributes))
    .then((updatedValues) => {
      if (updatedValues.error || updatedValues.statusCode) {
        return dispatch(inputChange('message', updatedValues.message))
      }

      dispatch({
        type: 'WNI_VIEW_SUCCESS',
        message: 'Form telah diperbarui'
      })

    })
    
  }
}

export const logout = () => {
  return apiActions.logout()
}

export const actions = {
  noop,
  inputChange,
  // getOpenForms: apiActions.getOpenForms,
  // getTickets: apiActions.getTickets,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WNI_VIEW_FORM_ID] : (state, action) => {
    return state.set('formId', action.formId)
  },

  [WNI_VIEW_FORM_VALUES] : (state, action) => {
    return state
      .merge({submitted: false, message: '', ticketMessage: ''})
      .setIn(['formValues'], action.formValues)
      .setIn(['origFormValues'], action.formValues)
  },

  [WNI_VIEW_FORM_INPUT_CHANGE] : (state, action) => {
    return state
      .set('message','')
      .setIn(['formValues', action.name], action.val)
  },

  [WNI_VIEW_FORM_TICKETS] : (state, action) => {
    return state.setIn(['tickets'], action.tickets)
  },

  [WNI_VIEW_FORM_MERGEIN_TICKETS] : (state, action) => {
    return state.mergeIn(['tickets'], action.tickets)
  },

  [WNI_VIEW_INPUT_CHANGE] : (state, action) => {
    // console.log('ST', action, errMsg);
    return state
      .set(action.name, action.val)
  },

  [WNI_VIEW_SUCCESS]  : (state, action) => {
    return state
      .merge({submitted: true, message: action.message})
  },

  [WNI_VIEW_ERROR] : (state, action) => {
    return state
      .merge({submitted: 'error', message: action.message})
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  submitted: false,
  message: '',
  origFormValues: {},
  formValues: {},
  formErrors: {},
  formId: null,
  tickets: {},
  ticketMessage: '',
})

export default function formViewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
