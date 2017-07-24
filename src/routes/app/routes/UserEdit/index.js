import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'user-edit/:userId', 
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const UserEdit = require('./containers/UserEditContainer').default
      const reducer = require('./modules/userEdit').default

      /*  Add the reducer to the store on key 'userEdit'  */
      injectReducer(store, { key: 'userEdit', reducer })

      /*  Return getComponent   */
      cb(null, UserEdit)

    /* Webpack named bundle   */
    }, 'userEdit')
  }
})
