import React from 'react';
import { Link } from 'react-router';

import moment from 'moment'
import momentId from 'moment/locale/id'

import Converter from 'utils/converter'
import FORMS, { getFormTitle } from 'Forms'

import APPCONFIG from 'constants/Config'

import QueueAnim from 'rc-queue-anim'
import qs from 'qs'

import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import ActionSearch from 'material-ui/svg-icons/action/search'
import RaisedButton from 'material-ui/RaisedButton'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'


function searchToQuery(search) {
  search = search.trim()
  if (search.length == 0)
    return null

  var searchData = search.split(/\s+/)
  var searchText = []
  var searchFields = []
  searchData.forEach((v) => {
    if (v.search(':') == -1) {
      searchText.push(v)
    }
    else {
      searchFields.push(v.replace(':','='))
    }
  })

  var queryString = ''
  if (searchText.length) {
    var searchString = searchText.join(' ')
    queryString = 'nama='+searchString+'&email='+searchString
  }
  if (searchFields.length) {
    if (queryString.length) {
      queryString = queryString + '&'
    }
    queryString = queryString + searchFields.join('&')
  }
  console.log('search qs', queryString)
  return queryString
}

function  queryToSearch(query) {
  console.log('queryToSearch', query)

  var qObj = query ? qs.parse(query.substr(1)) : null

  if (qObj) {
    console.log('queryToSearch', qObj)
    var searchText = ''
    if (qObj['nama']) {
      searchText = qObj['nama']
      delete qObj['nama']
      delete qObj['email']
    }
    Object.keys(qObj).forEach((k) => {
      searchText = searchText+' '+k+':'+qObj[k]
    })
    return searchText
  }
  else {
    return ''
  }
}


export class TicketList extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand,
      listQuery: {}
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

    this.props.getTicketList(null, Number(this.props.routeParams.offset) || 0, location.search)
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.routeParams.offset != this.props.routeParams.offset
      || nextProps.location != this.props.location) {
      console.log('componentWillReceiveProps', nextProps)

      var offset = Number(nextProps.routeParams.offset) || 0

      this.props.getTicketList(null, offset, location.search)
    }
  }

  render() {

    var offset = Number(this.props.routeParams.offset) || 0

    var ticketLength = this.props.tickets.length

    var prevBtn = offset > 0 ? true : false
    var nextBtn = ticketLength == 100 ? true : false

    // this.props.tickets.forEach((t) => {
    //   console.log(t.get('readBy'), this.props.user.get('id'), t.get('readBy').includes(this.props.user.get('id')))
    // })
      // <div className='row'>
      //   <div className='col-10' >
      //     <TextField hintText="Cari" fullWidth={true} value={this.props.search} onChange={(e, v) => this.props.searchChange(v)}/>
      //   </div>
      //   <div className='col-2'>
      //     <ActionSearch onTouchTap={()=> {return this.props.search.trim() ? this.props.router.push('/admin/app/ticket-list/?' + searchToQuery(this.props.search)) : this.props.router.push('/admin/app/ticket-list/')}} />
      //   </div>
      // </div>

    return (
  <div className="container-fluid no-breadcrumbs with-maxwidth chapter">
    <article className="article">
      <h2 className="article-title">Pesan di Form</h2>

    <QueueAnim type="bottom" className="ui-animate">
      <div className='row'>
        <div className='col-xs-12' >

        <List>
          {this.props.tickets
          //.filter((v) => {
          //  return v.get('nama').search(this.props.search) >= 0
          //}, this)
          .map((v) => {
            return (
              <ListItem key={v.get('id')} onTouchTap={ () => this.props.router.push(`/admin/app/form-view/`+v.get('formId')) } >
                <div className={'view-ticket-item '+(v.getIn(['sender', 'fungsi']) ? 'fungsi ':' ')+(v.get('readBy').includes(this.props.user.get('id')) ? ' ' : 'unread ')}>
                  <div className='ticket-message'>{v.get('message')}</div>
                  <div className='ticket-message-time'>{ (v.getIn(['sender', 'fungsi'])|| '').toUpperCase() } { (v.getIn(['sender','username']) || v.getIn(['sender','email']) || '').replace(/@.+/,'')} ({moment(v.get('createdTime')).format('DD/MM/YYYY')})</div>
                </div>
              </ListItem>
            )
          })}
        </List>

        </div>
      </div>
      <div className='row'>
          <div className='col-6'>
              { prevBtn && <Link to={`/admin/app/ticket-list/${offset-1}`+location.search}><NavigationChevronLeft /></Link> }
          </div>
          <div className='col-6 text-right'>
              { nextBtn && <Link to={`/admin/app/ticket-list/${offset+1}`+location.search}><NavigationChevronRight /></Link> }
          </div>
      </div>
    </QueueAnim>
    </article>

  </div>
    );
  }
}

export default TicketList
