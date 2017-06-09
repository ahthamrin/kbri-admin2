import { fromJS } from 'immutable';

import { getFormSelectionStats } from 'Api/reducer'

// ------------------------------------
// Constants
// ------------------------------------
export const TICKET_VIEW_INCREMENT = 'TICKET_VIEW_INCREMENT'
export const TICKET_VIEW_XXX = 'TICKET_VIEW_XXX'
export const TICKET_VIEW_SELECTION_STATS = 'TICKET_VIEW_SELECTION_STATS'
export const TICKET_VIEW_SUCCESS = 'TICKET_VIEW_SUCCESS'
export const TICKET_VIEW_ERROR = 'TICKET_VIEW_ERROR'


// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getSelectionStats = (type, field, selections, period) => {
  return (dispatch, getState) => {

    return dispatch(getFormSelectionStats({type, field, selections, period}))
    .then((data) => {
      console.log('getFormSelectionStats', data);
      if (data.selectionStats)
        dispatch({
          type: TICKET_VIEW_SELECTION_STATS,
          name: type,
          val: data.selectionStats,
        })
    })

  }
}

export const actions = {
  getSelectionStats,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TICKET_VIEW_SELECTION_STATS]: (state, action) => {

    return state
      .setIn(['selectionStats', action.name], fromJS(action.val))
  },

  // [API_TICKET_VIEW_SUCCESS] : (state, action) => {
  //   let display = 'ticketView'
  //   if (action.data.statusCode)
  //     display = 'start'
  //   return state
  //     .set('display', display)
  // },

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
  selectionStats: {},
})

export default function ticketViewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
