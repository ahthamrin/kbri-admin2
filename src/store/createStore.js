import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createMemoizeMiddlware from 'redux-memoize'
import { save, load } from 'redux-localstorage-simple'

import { browserHistory } from 'react-router'

import makeRootReducer from './reducers'
import { updateLocation } from './location'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [createMemoizeMiddlware({ttl: 100}), thunk, save({states:['localstorage'], immutablejs: true})]

  // ======================================================
  // Store Enhancers
  // ======================================================

  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================

  const store = createStore(
    makeRootReducer(),
    // initialState,
    load({states:['localstorage'], immutablejs: true}),
    // load({states:['localstorage']}),
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
