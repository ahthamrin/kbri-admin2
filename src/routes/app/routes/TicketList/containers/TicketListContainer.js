import { createSelector } from 'reselect'
import { connect } from 'react-redux'

import { getTicketList, searchChange, } from '../modules/ticketList'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the ticketList:   */

import TicketList from '../components/TicketList'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  searchChange,
  getTicketList,
}

const api = (state) => state.api
const token = createSelector(api, (a) => a.getIn(['token','id']))
const user = createSelector(api, (a) => a.getIn(['token','user']))

const ticketList = (state) => state.ticketList
const users = createSelector(ticketList, (t) => t.get('users'))
const search = createSelector(ticketList, (t) => t.get('search'))
const tickets = createSelector(ticketList, (t) => {
  try {
    return t.get('tickets').sortBy((e) => e.get('createdTime')).toArray().reverse()
  }
  catch (e) {
    return []
  }
})


const mapStateToProps = (state) => ({
  // ticketList : ticketList(state),
  user: user(state),
  token: token(state),
  tickets: tickets(state),
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const ticketList = (state) => state.ticketList
    const tripleCount = createSelector(ticketList, (count) => count * 3)
    const mapStateToProps = (state) => ({
      ticketList: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(TicketList)
