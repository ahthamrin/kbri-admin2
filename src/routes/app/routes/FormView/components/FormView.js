import React from 'react';
import { Link } from 'react-router';

import APPCONFIG from 'constants/Config';

import QueueAnim from 'rc-queue-anim';

import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'

import moment from 'moment'
import momentId from 'moment/locale/id'

import ConfirmationBuilder from 'components/ConfirmationBuilder'

import validation from 'utils/validation'
import Converter from 'utils/converter'

import { generateForm } from 'Forms'

export class FormView extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  componentWillMount() {
    console.log('componentWillMount', this.state, this.props)

    if ( !this.props.token ) {
      console.log('should change location');
      setTimeout(() => {
        this.props.router.push('/') // XXX hardwired. See XXX
      }, 10)
    }

    if (!this.props.routeParams.formId) {
      return this.props.router.push('/tickets/')
    }

    this.props.setFormId(this.props.routeParams.formId)
    
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.routeParams.formId != this.props.routeParams.formId)
      this.props.setFormId(this.props.routeParams.formId)

  }

  render() {

    var FORM
    try {
      FORM = generateForm(this.props.formValues)
    }
    catch (e) {}

    var hideTickets = ''
    if (this.props.formValues.get('ticketStatus') != 'open')
      hideTickets = 'hide'
    // console.log(this.props)
    // console.log(this.props.formValues, this.props.tickets, FORM);

    return (
  <div className="container-fluid no-breadcrumbs with-maxwidth chapter">
    <article className="article">
      <h2 className="article-title">Form {Converter.camelCasetoTitle(this.props.formValues.get('type'))}  ({ moment(this.props.formValues.get('updatedTime')).format('ll') })</h2>

    <QueueAnim type="bottom" className="ui-animate">

      { FORM && 
      <ConfirmationBuilder forms={FORM}  values={Converter.fromApiDatetoFormTgl(this.props.formValues)} />
      }

      <div className="box box-transparent">
        <RaisedButton label="Terima Form" primary={true} icon={<ActionCheckCircle />} fullWidth />
      </div>


      <List>
      { this.props.tickets.map((v) => {
          return (
            <ListItem  key={v.get('id')} >
            <div className='sender'>{v.getIn(['sender','username'])}</div>
            <div className='message'>>{v.get('message')}</div>
            <div className='message-time'>{moment(v.get('createdTime')).fromNow()}</div>
            </ListItem>
          )
        })
      }
        <ListItem key="msg-input">
            <TextField multiline ref={(ref) => this._textarea = ref} className='materialize-textarea' onChange={(evt)=>this.props.inputChange(evt.target.value)} placeholder='Tulis pesan di sini' name='message' value={this.props.message} ></TextField>
            <a onClick={this.props.sendMessage} style={{position:'absolute', bottom: '2.25rem', right:'.1rem'}} className='waves-effect waves-teal'><ContentSend /></a>
        </ListItem>
      </List>


    </QueueAnim>
    </article>

  </div>
    );
  }
}

export default FormView
