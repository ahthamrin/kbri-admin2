import { combineReducers } from 'redux'
import locationReducer from './location'
import settingsReducer from './settings'
import apiReducer from 'Api/reducer'
import localReducer from 'Api/localreducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    api: apiReducer,
    localstorage: localReducer,
    settings: settingsReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
