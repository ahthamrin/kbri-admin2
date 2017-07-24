import { fromJS, is } from 'immutable'

import async from 'async'

import Api from 'Api'
import { actions as apiActions, API_LOGOUT_SUCCESS, API_MERGEIN_KEY } from 'Api/reducer'

// ------------------------------------
// Constants
// ------------------------------------
export const USER_EDIT_POPULATE_FORM = 'USER_EDIT_POPULATE_FORM'
export const USER_EDIT_INPUT_CHANGE = 'USER_EDIT_INPUT_CHANGE'
export const USER_EDIT_LOADING = 'USER_EDIT_LOADING'
export const USER_EDIT_SAVED = 'USER_EDIT_SAVED'
export const USER_EDIT_TEMP_SAVE_ERROR = 'USER_EDIT_TEMP_SAVE_ERROR'
export const USER_EDIT_SUBMIT_SUCCESS = 'USER_EDIT_SUBMIT_SUCCESS'
export const USER_EDIT_SUBMIT_ERROR = 'USER_EDIT_SUBMIT_ERROR'
export const USER_EDIT_USER_ID = 'USER_EDIT_USER_ID'
export const USER_EDIT_FORM_ORIG_VALUES = 'USER_EDIT_FORM_ORIG_VALUES'
export const USER_EDIT_FORM_VALUES = 'USER_EDIT_FORM_VALUES'
export const USER_EDIT_MERGEIN_FORM_VALUES = 'USER_EDIT_MERGEIN_FORM_VALUES'

// ------------------------------------
// Actions
// ------------------------------------

export function inputChange (name, val, validator, filename) {
  return {
    type: USER_EDIT_INPUT_CHANGE,
    name,
    val,
    validator,
    filename,
  }
}

export function populateUser(data) {

  return {
    type: USER_EDIT_POPULATE_FORM,
    data,
  }
}

export function userEditTempSave(data, apiKey) {
  return {
    type: USER_EDIT_TEMP_SAVE_SUCCESS,
    data,
    apiKey
  }
}

export function userEditTempSaveError(error, apiKey) {
  return {
    type: USER_EDIT_TEMP_SAVE_ERROR,
    error,
    apiKey
  }
}

export function userEditSubmitted() {
  return {
    type: USER_EDIT_SUBMIT_SUCCESS,
  }
}

export function userEditLoading(loading, error) {
  return {
    type: USER_EDIT_LOADING,
    loading,
    error,
  }
}


function NoOp(data) {
  return {
    type: 'NOOP',
    data
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export function setUserId(userId) {
  return (dispatch, getState) => {
    dispatch({
      type: USER_EDIT_USER_ID,
      userId,
    })


    if (userId == 'new') {
       dispatch({
        type: USER_EDIT_FORM_ORIG_VALUES,
        formValues: fromJS({})
      })
      dispatch({
        type: USER_EDIT_FORM_VALUES,
        formValues: fromJS({})
      })
      return
    }

    var thisUser = getState().userList ? getState().userList.getIn(['users', userId]) : null
    if (thisUser) {
      dispatch({
        type: USER_EDIT_FORM_ORIG_VALUES,
        formValues: thisUser
      })
      dispatch({
        type: USER_EDIT_FORM_VALUES,
        formValues: thisUser
      })
    }
    else {
      dispatch(apiActions.getUserById(userId))
      .then((formValues) => {
        if (formValues.error || formValues.statusCode || !Object.keys(formValues).length)
          return
        dispatch({
          type: USER_EDIT_FORM_VALUES,
          formValues: fromJS(formValues),
        })

        // XXX how to reconcile the local save with the values from the server?
        dispatch({
          type: USER_EDIT_FORM_ORIG_VALUES,
          formValues: fromJS(formValues),
        })
      })
    }

  }
}

export const submitForm = () => {
  return (dispatch, getState) => {
    var formValues = getState().userEdit.get('formValues')
    var origFormValues = getState().userEdit.get('origFormValues')

    if (is(formValues, origFormValues))
      return;

    formValues = formValues.set('emailVerified', true)

    if (formValues.get('id')) {
      formValues = formValues.delete('id').filter((x) => x)
      dispatch(apiActions.updateUser(getState().userEdit.get('userId'), formValues.toJS()))
      .then((savedValues) => {
        if (!savedValues.error) {
          dispatch({
            type: USER_EDIT_SUBMIT_SUCCESS,
            message: 'Data akun berhasil diperbarui',
          })
        }
        else {
          dispatch({
            type: USER_EDIT_SUBMIT_ERROR,
            message: 'Pastikan data akun terisi, termasuk password',
          })
        }
      })
    }
    else
      dispatch(apiActions.createUser(formValues.toJS()))
      .then((savedValues) => {
        if (!savedValues.error) {
          dispatch({
            type: USER_EDIT_SUBMIT_SUCCESS,
            message: 'Akun baru berhasil dibuat',
          })
        }
        else {
          dispatch({
            type: USER_EDIT_SUBMIT_ERROR,
            message: 'Pastikan data akun terisi, termasuk password',
          })
        }
      })
  }
}

export const deleteForm = () => {
  return (dispatch, getState) => {
    console.log('userEdit::deleteForm')
    dispatch(apiActions.deleteUser(getState().userEdit.get('userId')))
    .then((savedValues) => {
      if (!savedValues.error) {
        dispatch({
          type: USER_EDIT_SUBMIT_SUCCESS,
          message: 'Akun berhasil dihapus',
        })
      }
      else {
        dispatch({
          type: USER_EDIT_SUBMIT_ERROR,
          message: 'Akun gagal dihapus',
        })
      }
    })
  }
}

export const actions = {
  inputChange,
  setUserId,
  submitForm,
  deleteForm,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [API_LOGOUT_SUCCESS] : (state, action) => {
    return initialState
  },

  [USER_EDIT_USER_ID] : (state, action) => {
    return state
    .merge({userId: action.userId, submitted: false, loading: false, error: false, message: ''})
    .setIn(['formValues'], fromJS({}))
    .setIn(['formErrors'], fromJS({}))
    .setIn(['origFormValues'], fromJS({}))
  },

  [USER_EDIT_FORM_ORIG_VALUES] : (state, action) => {
    return state.setIn(['origFormValues'], action.formValues)
  },

  [USER_EDIT_FORM_VALUES] : (state, action) => {
    return state.setIn(['formValues'], action.formValues)
  },

  [USER_EDIT_MERGEIN_FORM_VALUES] : (state, action) => {
    return state.mergeIn(['formValues'], action.formValues)
  },

  [USER_EDIT_INPUT_CHANGE] : (state, action) => {
    let errMsg;
    if (action.validator)
      errMsg = action.validator(action.val);
    // console.log('ST', action, errMsg);
    return state
      .setIn(['formValues',action.name], action.val)
      .setIn(['formErrors',action.name], errMsg)
      .set('message','')
  },

  [USER_EDIT_SAVED] : (state, action) => {
    return state.set('saveNow', false)
  },

  [USER_EDIT_LOADING] : (state, action) => {
    console.log('UserEdit loading', action);
    return state
      .merge({loading: action.loading, error: action.error})
  },

  [USER_EDIT_SUBMIT_SUCCESS] : (state, action) => {
    // this is redundant, but nevermind... carry on...
    console.log('UserEdit submit');
    return state
      .merge({loading: false, error: false, submitted: true, message: action.message})
  },
  [USER_EDIT_SUBMIT_ERROR] : (state, action) => {
    // this is redundant, but nevermind... carry on...
    console.log('UserEdit error');
    return state
      .merge({loading: false, error: true, submitted: false, message: action.message})
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  loading: false,
  error: false,
  submitted: false,
  saveNow: false,
  message: '',
  origFormValues: {},
  formValues: {},
  formErrors: {},
  tickets: {},
  autocompleteDataSource: {},
});

export default function userEditReducer (state = initialState, action) {
  // console.log('state', state, ACTION_HANDLERS);
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
