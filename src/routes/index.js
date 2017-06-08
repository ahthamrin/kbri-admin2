// We only need to import the modules necessary for initial render
import { actions as apiActions } from 'Api/reducer'

import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import Login from './Login'

// http://stackoverflow.com/questions/38563679/react-redux-dispatch-action-on-app-load-init

function onAppInit(dispatch) {
  return (nextState, replace, callback) => {
    dispatch(apiActions.findToken())
    .then(() => {
      callback()
    })
  }
}

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  onEnter: onAppInit(store.dispatch),
  indexRoute: Login(store),
  // indexRoute  : { onEnter: (nextState, replace) => replace('/app/dashboard') }, // Home,
  childRoutes : [
    CounterRoute(store),
    // Login(store),
    
    require('./app').default(store),
    require('./404'),
    require('./500'),
    require('./confirmEmail'),
    require('./forgotPassword'),
    require('./lockScreen'),
    require('./signUp'),
    require('./fullscreen'),
    {
      path: '*',
      indexRoute: { onEnter: (nextState, replace) => replace('/404') },
    }
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
