import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'form-list/:formCategory/(:offset)',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const FormList = require('./containers/FormListContainer').default
      const reducer = require('./modules/formList').default

      /*  Add the reducer to the store on key 'formList'  */
      injectReducer(store, { key: 'formList', reducer })

      /*  Return getComponent   */
      cb(null, FormList)

    /* Webpack named bundle   */
    }, 'formList')
  }
})
