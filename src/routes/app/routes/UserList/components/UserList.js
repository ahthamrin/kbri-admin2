import React from 'react';
import { Link } from 'react-router';

import moment from 'moment'
import momentId from 'moment/locale/id'

import Converter from 'utils/converter'

import APPCONFIG from 'constants/Config'

import QueueAnim from 'rc-queue-anim'

import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import ActionSearch from 'material-ui/svg-icons/action/search'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

export class UserList extends React.Component {
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
        this.props.router.push('/admin/') // XXX hardwired. See XXX
      }, 10)
    }

      var offset = Number(this.props.routeParams.offset) || 0

      this.props.getUserList(offset)    
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.routeParams.formCategory != this.props.routeParams.formCategory || nextProps.routeParams.offset != this.props.routeParams.offset ) {
      console.log('componentWillReceiveProps', nextProps)

      var offset = Number(nextProps.routeParams.offset) || 0

      this.props.getUserList(offset)
    }
  }

  render() {

    console.log('render',this.props.users)

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
          {this.props.users.map((v) => {
            return (
              <ListItem key={v.get('id')} >
                <div><Link to={'/admin/app/user-edit/'+v.get('id')} >{v.get('username')}</Link></div>
              </ListItem>
            )
          })}
        </List>

        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12' >

        <FloatingActionButton className='fixed-action-btn' onTouchTap={()=> this.props.router.push('/admin/app/user-edit/new')} >
          <ContentAdd />
        </FloatingActionButton>

        </div>
      </div>
    </QueueAnim>
    </article>

  </div>
    );
  }
}

export default UserList
