import { fromJS } from 'immutable';

import { getFormTimeStats } from 'Api/reducer'

// ------------------------------------
// Constants
// ------------------------------------
export const DASHBOARD_INCREMENT = 'DASHBOARD_INCREMENT'
export const DASHBOARD_XXX = 'DASHBOARD_XXX'
export const DASHBOARD_TIME_STATS = 'DASHBOARD_TIME_STATS'
export const DASHBOARD_SUCCESS = 'DASHBOARD_SUCCESS'
export const DASHBOARD_ERROR = 'DASHBOARD_ERROR'


// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getTimeStats = (type) => {
  return (dispatch, getState) => {

    return dispatch(getFormTimeStats({type}))
    .then((data) => {
      console.log('getFormTimeStats', data);
      if (data.timeStats)
        dispatch({
          type: DASHBOARD_TIME_STATS,
          name: type,
          val: data.timeStats,
        })
    })

  }
}

export const actions = {
  getTimeStats,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DASHBOARD_TIME_STATS]: (state, action) => {

    return state
      .setIn(['timeStats', action.name], fromJS(action.val))
  },

  // [API_DASHBOARD_SUCCESS] : (state, action) => {
  //   let display = 'dashboard'
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
  timeStats: {},
})

export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
