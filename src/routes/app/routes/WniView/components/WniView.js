import React from 'react';
import { Link } from 'react-router';

import APPCONFIG from 'constants/Config';

import QueueAnim from 'rc-queue-anim';

import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import AlertError from 'material-ui/svg-icons/alert/error'
import MapsPlace from 'material-ui/svg-icons/maps/place'

import GoogleMapReact from 'google-map-react'

import moment from 'moment'
import momentId from 'moment/locale/id'

import ConfirmationBuilder from 'components/ConfirmationBuilder'

import validation from 'utils/validation'
import Converter from 'utils/converter'

import { generateForm } from 'Forms'

const MapsPlaceWrapper = (props) => <div style={props.style} ><MapsPlace style={{color:'red'}} /></div>;


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
        this.props.router.push('/admin/') // XXX hardwired. See XXX
      }, 10)
    }

    if (!this.props.routeParams.formId) {
      return this.props.router.push('/admin/')
    }

    this.props.setFormId(this.props.routeParams.formId)
    
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.routeParams.formId != this.props.routeParams.formId)
      this.props.setFormId(this.props.routeParams.formId)

    if (nextProps.submitted && !this.props.submitted) {
      return setTimeout(() => {
        this.props.router.goBack()
      }, 2000)
    }

  }

  static defaultProps = {
    center: {lat: 35.11, lng: 139.33},
    zoom: 11
  };


  mapClick = (mapObj) => {
    console.log('mapClick', mapObj)
    this.props.formInputChange('lat', mapObj.lat)
    this.props.formInputChange('lng', mapObj.lng)
  }

  render() {

    var formValues = this.props.formValues.set('type', 'LaporDiri')
    var FORM
    try {
      FORM = generateForm(formValues)
    }
    catch (e) {}

    return (
  <div className="container-fluid no-breadcrumbs with-maxwidth chapter">
    <article className="article">
      <h2 className="article-title">Form Data WNI  ({ moment(formValues.get('updatedTime')).format('ll') })</h2>

    <QueueAnim type="bottom" className="ui-animate">

      { FORM && 
      <ConfirmationBuilder forms={FORM}  values={Converter.fromApiDatetoFormTgl(formValues)} />
      }


    </QueueAnim>
    </article>

  </div>
    );
  }
}

export default FormView
