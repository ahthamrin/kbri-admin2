import React from 'react';
import { Link } from 'react-router';

import moment from 'moment'
import momentId from 'moment/locale/id'

import Converter from 'utils/converter'
import FORMS, { getFormTitle } from 'Forms'

import APPCONFIG from 'constants/Config'

import QueueAnim from 'rc-queue-anim'

import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import ActionSearch from 'material-ui/svg-icons/action/search'

export class FormList extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  componentWillMount() {
    console.log('componentWillMount', this.state, this.props)

    if ( !this.props.token ) {
      console.log('should change location')
      setTimeout(() => {
        this.props.router.push('/') // XXX hardwired. See XXX
      }, 10)
    }

    var formType = FORMS[this.props.routeParams.formCategory]

    var offset = Number(this.props.routeParams.offset) || 0

    if (formType) {
      this.props.getFormList(this.props.routeParams.formCategory, offset)
    }
    
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    var category = this.props.routeParams.formCategory

    return (
  <div className="container-fluid no-breadcrumbs with-maxwidth chapter">
    <article className="article">
      <h2 className="article-title">{Converter.camelCasetoTitle(this.props.routeParams.formCategory)}</h2>

    <QueueAnim type="bottom" className="ui-animate">
      <div className='row'>
        <div className='col-10' >
          <TextField hintText="Search" fullWidth={true}/>
        </div>
        <div className='col-2'>
          <ActionSearch />
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12' >

        <List>
          {this.props.forms.filter((v) => {
            console.log('filter', v.get('type'), category)
            return category == v.get('type')
          }, this).map((v) => {
            return (
              <ListItem key={v.get('id')} secondaryText={moment(v.get('createdTime')).format('DD/MM/YYYY')} >
                <div><Link to={'app/form-view/'+v.get('id')} >{getFormTitle(v).title}</Link></div>
              </ListItem>
            )
          })}
        </List>

        </div>
      </div>
    </QueueAnim>
    </article>

  </div>
    );
  }
}

export default FormList
