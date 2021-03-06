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
import FlatButton from 'material-ui/FlatButton'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

import FaFileExcelO from 'react-icons/lib/fa/file-excel-o'
import FaSearch from 'react-icons/lib/fa/search'

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


export class FormList extends React.Component {
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

    this.props.searchChange(queryToSearch(location.search))

    var formType = FORMS[this.props.routeParams.formCategory == 'WNI' ? 'LaporDiri' : this.props.routeParams.formCategory]

    if (formType) {
      this.props.getFormList(this.props.routeParams.formCategory, Number(this.props.routeParams.offset) || 0, location.search)
    }
    
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.routeParams.formCategory != this.props.routeParams.formCategory
      || nextProps.routeParams.offset != this.props.routeParams.offset
      || nextProps.location != this.props.location) {
      console.log('componentWillReceiveProps', nextProps)

      this.props.searchChange(queryToSearch(location.search))
      
      var formType = FORMS[this.props.routeParams.formCategory == 'WNI' ? 'LaporDiri' : this.props.routeParams.formCategory]
      var offset = Number(nextProps.routeParams.offset) || 0

      if (formType) {
        this.props.getFormList(nextProps.routeParams.formCategory, offset, location.search)
      }    
    }
  }

  render() {
    var category = this.props.routeParams.formCategory

    var formViewURL = category == 'WNI' ? 'wni-view' : 'form-view'

    var offset = Number(this.props.routeParams.offset) || 0

    var formLength = this.props.forms.length

    var prevBtn = offset > 0 ? true : false
    var nextBtn = formLength == 100 ? true : false

    return (
  <div className="container-fluid no-breadcrumbs with-maxwidth chapter">
    <article className="article">
      <h2 className="article-title">{category == 'WNI' ? 'Data WNI' : Converter.camelCasetoTitle(category)}
      </h2>

    <QueueAnim type="bottom" className="ui-animate">
      <div className='row'>
        <div className='col-11' >
          <TextField hintText="Cari" fullWidth={true} value={this.props.search} onChange={(e, v) => this.props.searchChange(v)}/>
        </div>
        <div className='col-1' style={{paddingLeft:0, paddingRight:0, fontSize: '150%', margin: 'auto'}}>
          <FaSearch onTouchTap={()=> {return this.props.search.trim() ? this.props.router.push('/admin/app/form-list/'+category+'/?' + searchToQuery(this.props.search)) : this.props.router.push('/admin/app/form-list/'+category+'/')}} />
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12' >

        <List>
          {this.props.forms
          //.filter((v) => {
          //  return v.get('nama').search(this.props.search) >= 0
          //}, this)
          .map((v) => {
            return (
              <ListItem key={v.get('id')} secondaryText={moment(v.get('createdTime')).format('DD/MM/YYYY')} >
                <div><Link to={`/admin/app/${formViewURL}/`+v.get('id')} >{getFormTitle(v).title}</Link></div>
              </ListItem>
            )
          })}
        </List>

        </div>
      </div>
      <div className='row'>
          <div className='col-3'>
              { prevBtn && <FlatButton style={{textAlign:'left'}} href={`/admin/app/form-list/${category}/${offset-1}`+location.search} icon={<NavigationChevronLeft />} /> }
          </div>
          <div className='col-6 text-center' style={{margin:'auto'}}>
              { ((category != 'WNI' && this.props.fungsi != 'loket') && formLength > 0) && <RaisedButton primary={true} icon={<FaFileExcelO />} label='CSV' onTouchTap={()=> {this.props.getFormList(this.props.routeParams.formCategory, Number(this.props.routeParams.offset) || 0, location.search, true)}} /> }
          </div>
          <div className='col-3 text-right'>
              { nextBtn && <FlatButton href={`/admin/app/form-list/${category}/${offset+1}`+location.search} icon={<NavigationChevronRight />} /> }
          </div>
      </div>
    </QueueAnim>
    </article>

  </div>
    );
  }
}

export default FormList
