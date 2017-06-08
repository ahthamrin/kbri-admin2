import { fromJS } from 'immutable';

import { getFormSelectionStats } from 'Api/reducer'

// ------------------------------------
// Constants
// ------------------------------------
export const DATA_GRAPH_INCREMENT = 'DATA_GRAPH_INCREMENT'
export const DATA_GRAPH_XXX = 'DATA_GRAPH_XXX'
export const DATA_GRAPH_SELECTION_STATS = 'DATA_GRAPH_SELECTION_STATS'
export const DATA_GRAPH_SUCCESS = 'DATA_GRAPH_SUCCESS'
export const DATA_GRAPH_ERROR = 'DATA_GRAPH_ERROR'


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
          type: DATA_GRAPH_SELECTION_STATS,
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
  [DATA_GRAPH_SELECTION_STATS]: (state, action) => {

    return state
      .setIn(['selectionStats', action.name], fromJS(action.val))
  },

  // [API_DATA_GRAPH_SUCCESS] : (state, action) => {
  //   let display = 'dataGraph'
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

export default function dataGraphReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
