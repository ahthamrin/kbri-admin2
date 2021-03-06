import { fromJS } from 'immutable'

import async from 'async'
import Api from 'Api'
import { actions as apiActions } from 'Api/reducer'

// ------------------------------------
// Constants
// ------------------------------------
export const FORM_VIEW_INPUT_CHANGE = 'FORM_VIEW_INPUT_CHANGE'
export const FORM_VIEW_LOGOUT_SUCCESS = 'FORM_VIEW_LOGOUT_SUCCESS'
export const FORM_VIEW_LOGOUT_ERROR = 'FORM_VIEW_LOGOUT_ERROR'
export const FORM_VIEW_SUCCESS = 'FORM_VIEW_SUCCESS'
export const FORM_VIEW_ERROR = 'FORM_VIEW_ERROR'
export const FORM_VIEW_FORM_ID = 'FORM_VIEW_FORM_ID'
export const FORM_VIEW_FORM_INPUT_CHANGE = 'FORM_VIEW_FORM_INPUT_CHANGE'
export const FORM_VIEW_FORM_VALUES = 'FORM_VIEW_FORM_VALUES'
export const FORM_VIEW_FORM_TICKETS = 'FORM_VIEW_FORM_TICKETS'
export const FORM_VIEW_FORM_MERGEIN_TICKETS = 'FORM_VIEW_FORM_MERGEIN_TICKETS'

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
    type: FORM_VIEW_INPUT_CHANGE,
    name,
    val,
  }
}

export function formInputChange (name, val) {
  return {
    type: FORM_VIEW_FORM_INPUT_CHANGE,
    name,
    val,
  }
}

export function setFormId(formId) {
  return (dispatch, getState) => {
    dispatch({
      type: FORM_VIEW_FORM_ID,
      formId,
    })

    dispatch(apiActions.getFormById(formId))
    .then((formValues) => {
      if (formValues.error || formValues.statusCode)
        return

      var fungsi = getState().api.getIn(['token','user','fungsi'])
      if (fungsi == 'loket') {
        var origFormValues = formValues
        formValues = {}
        var fields = ["id", "type", "createdTime", "updatedTime", "nama", "paspor", "tglLahir", "agama", "almtIdDaerah", "almtIdJalan", "almtIdKamar", "almtIdKodepos", "almtIdProv", "almtIdKodepos", "almtJpDaerah", "almtJpKamar", "almtJpKodepos", "almtJpKota", "almtJpNotel", "almtJpProv", "email", "file_imgIdentJpBlkg", "file_imgIdentJpDepan", "file_imgIdentPasfoto", "file_imgIdentPasporImg", "jnsKelamin", "jnsVisa", "kontakIdHub", "kontakIdNama", "kontakIdNotel", "menikah", "noregPaspor", "rencanaKeluarJp", "tempatLahir", "tempatPaspor", "tglDatang", "tglPaspor", "tglVisa", "pekJpJenis"]
        fields.forEach(function(k) {
          formValues[k] = origFormValues[k]
        })
      }

      console.log('formData', formValues)

      dispatch({
        type: FORM_VIEW_FORM_VALUES,
        formValues: fromJS(formValues),
      })

      async.parallel(getImages(formValues, dispatch), (err, results) => {
        
        formValues = fromJS(Object.assign(formValues, results))
        
        dispatch({
          type: FORM_VIEW_FORM_VALUES,
          formValues,
        })
      })

    })

    return dispatch(apiActions.addReadByTickets({ formId }, {include: 'sender', readBy: getState().api.getIn(['token','user','id'])}))
      .then((tickets) => {
        if (tickets.error || tickets.statusCode)
          return

        console.log('tickets', tickets)
        let dataObj = tickets.tickets.reduce((result, item) => {
          result[item.id] = item
          return result
        }, {})
        tickets = fromJS(dataObj)
        dispatch({
          type: FORM_VIEW_FORM_TICKETS,
          tickets,
        })
    })
  }
}

// completely the same as the code in the formEdit
const getImages = (formValues, dispatch) => {
  if (!formValues)
    return {}

  var imageObj = Object.keys(formValues).reduce((result, item) => {
    if (item.match(/^file_/) && formValues[item].match(/\.jpg$/i)) {
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
          type: FORM_VIEW_FORM_MERGEIN_TICKETS,
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

export const getFormView = (auth) => {
  return (dispatch, getState) => {
    var formViewForm = getState().formView.get('formValues').toJS()
    console.log('formViewForm', formViewForm)

    return new Promise((resolve) => {
      Api.formView(formViewForm, auth)
        .then((data) => {
          if (!data.error) {
            dispatch({
              type: FORM_VIEW_SUCCESS,
              message: data.message,
            })
            // dispatch(apiActions.setLogin(data))
          }
          else {
            dispatch({
              type: FORM_VIEW_ERROR,
              error: data.error,
            })
          }
          resolve()
        })
    })
  }
}

export const updateForm = (status) => {
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

    dispatch(apiActions.patchForm(formAttributes))
    .then((updatedValues) => {
      if (updatedValues.error || updatedValues.statusCode) {
        return dispatch(inputChange('message', updatedValues.message))
      }

      dispatch({
        type: 'FORM_VIEW_SUCCESS',
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
  [FORM_VIEW_FORM_ID] : (state, action) => {
    return state.set('formId', action.formId)
  },

  [FORM_VIEW_FORM_VALUES] : (state, action) => {
    return state
      .merge({submitted: false, message: '', ticketMessage: ''})
      .setIn(['formValues'], action.formValues)
      .setIn(['origFormValues'], action.formValues)
  },

  [FORM_VIEW_FORM_INPUT_CHANGE] : (state, action) => {
    return state
      .set('message','')
      .setIn(['formValues', action.name], action.val)
  },

  [FORM_VIEW_FORM_TICKETS] : (state, action) => {
    return state.setIn(['tickets'], action.tickets)
  },

  [FORM_VIEW_FORM_MERGEIN_TICKETS] : (state, action) => {
    return state.mergeIn(['tickets'], action.tickets)
  },

  [FORM_VIEW_INPUT_CHANGE] : (state, action) => {
    // console.log('ST', action, errMsg);
    return state
      .set(action.name, action.val)
  },

  [FORM_VIEW_SUCCESS]  : (state, action) => {
    return state
      .merge({submitted: true, message: action.message})
  },

  [FORM_VIEW_ERROR] : (state, action) => {
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
