import { createSelector } from 'reselect'
import { connect } from 'react-redux'

import { getSelectionStats } from '../modules/ticketView'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the ticketView:   */

import TicketView from '../components/TicketView'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const ticketView = (state) => state.ticketView
const selectionStats = createSelector(ticketView, (s) => s.get('selectionStats'))

const api = (state) => state.api
const token = createSelector(api, (a) => a.getIn(['token','id']))
const apiLoading = createSelector(api, (a) => a.get('loading'))
const apiError = createSelector(api, (a) => a.get('error'))
const apiErrorData = createSelector(api, (a) => a.get('errorData'))

const mapDispatchToProps = {
  getSelectionStats,
}

const mapStateToProps = (state) => ({
  token: token(state),
  apiLoading: apiLoading(state),
  apiError: apiError(state),
  apiErrorData: apiErrorData(state),
  selectionStats: selectionStats(state),
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const ticketView = (state) => state.ticketView
    const tripleCount = createSelector(ticketView, (count) => count * 3)
    const mapStateToProps = (state) => ({
      ticketView: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(TicketView)
