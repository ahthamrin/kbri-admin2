import { fromJS, List } from 'immutable';
import { browserHistory } from 'react-router'
import { memoize } from 'redux-memoize'

import Converter from 'utils/converter'

import { load } from 'redux-localstorage-simple'

const ACTION_HANDLERS = {

  'CLEAR_TEMP_SAVE': (state, action) => {
    return fromJS({})
  },

}

function otherActionHandlers(state, action) {
	if (action.type.match(/_(TEMP_SAVE|SUBMIT)/)) {
    // console.log('localReducer', state, action)
		return state
      .setIn([action.id, action.key], fromJS(action.data))
	}
	return state
}

// const initialState = fromJS({
//   cachedTime: {}
// })

const initialState = fromJS(load({immutablejs: true}))

// console.log('localReducer initialization', initialState)
export default function localReducer (state = initialState, action) {

  const handler = ACTION_HANDLERS[action.type]

  if (handler)
  	return handler(state, action)

  return otherActionHandlers(state, action)
  // return handler ? handler(state, action) : state
}