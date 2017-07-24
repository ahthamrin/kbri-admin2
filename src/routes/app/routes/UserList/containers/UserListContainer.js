import { createSelector } from 'reselect'
import { connect } from 'react-redux'

import { noop, logout, inputChange, getUserList } from '../modules/userList'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the formList:   */

import UserList from '../components/UserList'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  noop,
  logout,
  inputChange,
  getUserList,
}

const api = (state) => state.api
const token = createSelector(api, (a) => a.getIn(['token','id']))
const user = createSelector(api, (a) => a.getIn(['token','user']))

const userList = (state) => state.userList
// const users = createSelector(formList, (t) => t.get('users'))
const users = createSelector(userList, (t) => {
  try {
    console.log('users', t.get('users').toArray())
    return t.get('users').sortBy((e) => e.get('email')).toArray()
  }
  catch (e) {
    return []
  }
})


const mapStateToProps = (state) => ({
  user: user(state),
  token: token(state),
  users: users(state),
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const formList = (state) => state.formList
    const tripleCount = createSelector(formList, (count) => count * 3)
    const mapStateToProps = (state) => ({
      formList: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
