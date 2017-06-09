import { injectReducer } from '../../store/reducers'


export default (store) => ({
  path: 'app',
  indexRoute: require('./routes/Dashboard').default(store),
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/DataGraph').default(store),
        require('./routes/FormList').default(store),
        require('./routes/FormView').default(store),
        require('./routes/charts'),
        require('./routes/ecommerce'),
        require('./routes/forms'),
        require('./routes/pageLayouts'),
        require('./routes/pages'),
        require('./routes/tables'),
        require('./routes/ui'),
      ]);
    });
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  }
})
