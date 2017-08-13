import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : 'ticket-list/(:offset)',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const TicketList = require('./containers/TicketListContainer').default
      const reducer = require('./modules/ticketList').default

      /*  Add the reducer to the store on key 'ticketList'  */
      injectReducer(store, { key: 'ticketList', reducer })

      /*  Return getComponent   */
      cb(null, TicketList)

    /* Webpack named bundle   */
    }, 'ticketList')
  }
})
