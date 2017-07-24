import { createSelector } from 'reselect'
import { connect } from 'react-redux'

import { inputChange, setUserId, submitForm, deleteForm } from '../modules/userEdit'
// import { inputChange, saveFormValues, populateFromApi, submitUserEdit } from '../modules/userEdit'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the userEdit:   */

import UserEdit from '../components/UserEdit'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  inputChange,
  setUserId,
  submitForm,
  deleteForm,
}

const userEdit = (state) => state.userEdit
const userId = (state) => state.userEdit.get('userId')

const api = (state) => state.api
const token = createSelector(api, (a) => a.getIn(['token','id']))
const user = createSelector(api, (a) => a.getIn(['token','user']))

const form = createSelector(api, userId, (a, userId) => {
  try {
    return a.getIn(['forms', userId]).toJS()
  }
  catch (e) {}
})

const message = createSelector(userEdit, (s) => s.get('message'))


const formValues = createSelector(userEdit, (t) => t.get('formValues'))
const formErrors = createSelector(userEdit, (t) => t.get('formErrors'))
const loading = createSelector(userEdit, (t) => t.get('loading'))
const error = createSelector(userEdit, (t) => t.get('error'))
const submitted = createSelector(userEdit, (t) => t.get('submitted'))
const saveNow = createSelector(userEdit, (t) => t.get('saveNow'))

const mapStateToProps = (state) => ({
  loading: loading(state),
  error: error(state),
  saveNow: saveNow(state),
  submitted: submitted(state),
  token: token(state),
  user: user(state),
  form: form(state),
  formValues: formValues(state),
  formErrors: formErrors(state),
  message: message(state),
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const userEdit = (state) => state.userEdit
    const tripleCount = createSelector(userEdit, (count) => count * 3)
    const mapStateToProps = (state) => ({
      userEdit: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
