import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'data-graph',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const DataGraph = require('./containers/DataGraphContainer').default
      const reducer = require('./modules/dataGraph').default

      /*  Add the reducer to the store on key 'dataGraph'  */
      injectReducer(store, { key: 'dataGraph', reducer })

      /*  Return getComponent   */
      cb(null, DataGraph)

    /* Webpack named bundle   */
    }, 'dataGraph')
  }
})
