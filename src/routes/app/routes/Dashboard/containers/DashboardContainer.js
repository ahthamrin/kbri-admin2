import { createSelector } from 'reselect'
import { connect } from 'react-redux'

import { getTimeStats } from '../modules/dashboard'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the dashboard:   */

import Dashboard from '../components/Dashboard'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const dashboard = (state) => state.dashboard
const timeStats = createSelector(dashboard, (s) => s.get('timeStats'))

const api = (state) => state.api
const token = createSelector(api, (a) => a.getIn(['token','id']))
const user = createSelector(api, (a) => a.getIn(['token','user']))
const fungsi = createSelector(api, (a) => a.getIn(['token','user','fungsi']))
const apiLoading = createSelector(api, (a) => a.get('loading'))
const apiError = createSelector(api, (a) => a.get('error'))
const apiErrorData = createSelector(api, (a) => a.get('errorData'))

const mapDispatchToProps = {
  getTimeStats,
}

const mapStateToProps = (state) => ({
  token: token(state),
  user: user(state),
  fungsi: fungsi(state),
  apiLoading: apiLoading(state),
  apiError: apiError(state),
  apiErrorData: apiErrorData(state),
  timeStats: timeStats(state),
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const dashboard = (state) => state.dashboard
    const tripleCount = createSelector(dashboard, (count) => count * 3)
    const mapStateToProps = (state) => ({
      dashboard: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
