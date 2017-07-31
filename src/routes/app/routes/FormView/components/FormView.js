import React from 'react';
import { Link } from 'react-router';

import APPCONFIG from 'constants/Config';

import QueueAnim from 'rc-queue-anim';

import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import ActionPrint from 'material-ui/svg-icons/action/print'
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

    this.allowApprove = false
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
    if (this.allowApprove) { 
      this.props.formInputChange('lat', mapObj.lat)
      this.props.formInputChange('lng', mapObj.lng)
    }
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

    var showMap = this.props.formValues.get('type') == 'LaporDiri'
    try {
    this.allowApprove = 
      this.props.formValues.get('type').match(/(LaporDiri|LaporKepulangan)/) && this.props.fungsi.match(/(admin|imigrasi)/)
      || this.props.formValues.get('type').match(/(LaporanKemajuanStudi|LaporanKelulusan)/) && this.props.fungsi.match(/dikbud/)
      || this.props.formValues.get('type').match(/PemilikBarangPindahan/) && this.props.fungsi.match(/keuangan/)
    }
    catch(e) {}
    try {
    this.allowPrint = 
      this.props.formValues.get('type').match(/PermohonanPaspor/) && this.props.fungsi.match(/(admin|imigrasi)/)
    }
    catch(e) {}

    return (
  <div className="container-fluid no-breadcrumbs with-maxwidth chapter">
    <article className="article">
      <h2 className="article-title">Form {Converter.camelCasetoTitle(this.props.formValues.get('type'))}  ({ moment(this.props.formValues.get('updatedTime')).format('ll') })</h2>

    <QueueAnim type="bottom" className="ui-animate">

      { FORM && 
      <ConfirmationBuilder forms={FORM}  values={Converter.fromApiDatetoFormTgl(this.props.formValues)} />
      }

      { showMap &&
      <div className='row'>
      <div className='col-12' >
        <div>
          Lokasi Alamat di Jepang
        </div>
        <div style={{height:'35vh'}}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCPDJoyDeV9w5Wr9V7jzVUUeriSuJk6nrs',
              language: 'en',
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onClick={this.mapClick}
          >
            <MapsPlaceWrapper
              lat={this.props.formValues.get('lat') || 0}
              lng={this.props.formValues.get('lng') || 0}
              style={{width:'50px', height:'50px', position:'relative', top:'-12px', left:'-12px'}}
            />
          </GoogleMapReact>
        </div>
      </div>
      </div>
      }

      { this.allowPrint &&
      <div className="box box-transparent" style={{marginTop: '2rem'}}>
        <RaisedButton label="Cetak Form" secondary={true} icon={<ActionPrint />} fullWidth 
          onTouchTap={()=>{window.open('https://sakuraindonesia.jp/p/pdf-form/'+this.props.routeParams.formId, '_blank')}}
        />
      </div>
      }


      { this.allowApprove &&
      <div className="box box-transparent" style={{marginTop: '2rem'}}>
        <RaisedButton label="Tolak Form" secondary={true} icon={<AlertError />} fullWidth 
          onTouchTap={()=>this.props.updateForm('open')}
        />
      </div>
      }

      { this.allowApprove &&
      <div className="box box-transparent">
        <RaisedButton label="Terima Form" primary={true} icon={<ActionCheckCircle />} fullWidth 
          onTouchTap={()=>this.props.updateForm('close')}
        />
      </div>
      }
      <div>
        {this.props.message}
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
            <TextField fullWidth={true} multiLine={true} ref={(ref) => this._textarea = ref} className='materialize-textarea' onChange={(evt)=>this.props.inputChange('ticketMessage', evt.target.value)} placeholder='Tulis pesan di sini' name='message' value={this.props.ticketMessage} ></TextField>
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
