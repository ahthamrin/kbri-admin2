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
      <h2 className="article-title">{category == 'WNI' ? 'Data WNI' : Converter.camelCasetoTitle(category)}</h2>

    <QueueAnim type="bottom" className="ui-animate">
      <div className='row'>
        <div className='col-10' >
          <TextField hintText="Cari Nama" fullWidth={true} value={this.props.search} onChange={(e, v) => this.props.searchChange(v)}/>
        </div>
        <div className='col-2'>
          <ActionSearch onTouchTap={()=> {return this.props.search ? this.props.router.push('/admin/app/form-list/'+category+'/?nama='+encodeURIComponent(this.props.search)+'&email='+encodeURIComponent(this.props.search)) : this.props.router.push('/admin/app/form-list/'+category+'/')}} />
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12' >

        <List>
          {this.props.forms
          //.filter((v) => {
          //  return v.get('nama').search(this.props.search) >= 0
          //}, this)
          .sort((v) => v.get('updatedTime'))
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
          <div className='col-6'>
              { prevBtn && <Link to={`/admin/app/form-list/${category}/${offset-1}`+location.search}><NavigationChevronLeft /></Link> }
          </div>
          <div className='col-6 text-right'>
              { nextBtn && <Link to={`/admin/app/form-list/${category}/${offset+1}`+location.search}><NavigationChevronRight /></Link> }
          </div>
      </div>
    </QueueAnim>
    </article>

  </div>
    );
  }
}

export default FormList
