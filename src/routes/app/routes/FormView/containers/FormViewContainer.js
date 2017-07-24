import { createSelector } from 'reselect'
import { connect } from 'react-redux'

import { setFormId, noop, logout, inputChange, formInputChange, sendMessage, updateForm } from '../modules/formView'
import { getFormView, getOpenForms, getTickets } from 'Api/reducer'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the formView:   */

import FormView from '../components/FormView'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  setFormId,
  noop,
  logout,
  inputChange,
  formInputChange,
  sendMessage,
  updateForm,
  getTickets,
}

const formView = (state) => state.formView
const formId = (state) => state.formView.get('formId')
const message = (state) => state.formView.get('message')
const ticketMessage = (state) => state.formView.get('ticketMessage')

const api = (state) => state.api
const token = createSelector(api, (a) => a.getIn(['token','id']))
const user = createSelector(api, (a) => a.getIn(['token','user']))

const form = createSelector(api, formId, (a, formId) => {
  try {
    return a.getIn(['forms', formId]).toJS()
  }
  catch (e) {}
})

// const tickets = createSelector(formView, (t) => t.get('tickets').sort( (l,r) => (new Date(l)) - (new Date(r)) ) )
const tickets = createSelector(formView, (t) => t.get('tickets').sortBy((e) => e.get('createdTime')).toArray() )

const formValues = createSelector(formView, (t) => t.get('formValues'))

const mapStateToProps = (state) => ({
  token: token(state),
  user: user(state),
  form: form(state),
  tickets: tickets(state),
  formValues: formValues(state),
  message: message(state),
  ticketMessage: ticketMessage(state),
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const formView = (state) => state.formView
    const tripleCount = createSelector(formView, (count) => count * 3)
    const mapStateToProps = (state) => ({
      formView: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(FormView)
