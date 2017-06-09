import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'form-view/:formId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const FormView = require('./containers/FormViewContainer').default
      const reducer = require('./modules/formView').default

      /*  Add the reducer to the store on key 'formView'  */
      injectReducer(store, { key: 'formView', reducer })

      /*  Return getComponent   */
      cb(null, FormView)

    /* Webpack named bundle   */
    }, 'formView')
  }
})
