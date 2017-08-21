import React from 'react'
import { Link } from 'react-router'

import APPCONFIG from 'constants/Config'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import QueueAnim from 'rc-queue-anim'

import validation from 'utils/validation'
import Converter from 'utils/converter'


export class UserEdit extends React.Component {

  constructor(state) {
    super(state)
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  componentWillMount() {
    console.log('will mount', this.props)
    if (!this.props.token) {
      return setTimeout(() => {
        this.props.router.push('/admin/')
      },10)
    }

    if (!this.props.routeParams.userId) {
      return this.props.router.goBack()
    }

    this.props.setUserId(this.props.routeParams.userId)
  }

  componentDidMount() {
    console.log('UserEdit::componentDidMount')

  }

  componentDidUpdate() {

  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.token) {
      return setTimeout(() => {
        this.props.router.push('/')
      },10)
    }

    if (nextProps.submitted && !this.props.submitted) {
      console.log('SUBMITTED')
      return setTimeout(() => {
        this.props.router.push('/admin/app/user-list/')
      }, 2000)
    }

    if (nextProps.routeParams.userId != this.props.routeParams.userId) {
    console.log('UserEdit::componentWillReceiveProps', nextProps)
      this.props.setUserId(this.props.routeParams.userId)
    }
  }

  render() {

    var formTitle = 'Data Akun Baru'
    var formButton = 'Buat'
    var formDelete

    try {
      if (this.props.routeParams.userId != 'new') {
        formTitle = 'Edit Akun'
        formButton = 'Update'
        formDelete = true
      }
    }
    catch(e) {
      console.log('no routerParams',this.props.routeParams)
    }

    return(
  <div className="container-fluid no-breadcrumbs with-maxwidth chapter">
    <article className="article">
      <h2 className="article-title">{formTitle}</h2>

    <QueueAnim type="bottom" className="ui-animate">
      <div className='row'>
        <div className='col-10' >
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <TextField
                  floatingLabelText="Username"
                  fullWidth
                  name="username"
                  value={this.props.formValues.get('username')}
                  onChange={(e) => this.props.inputChange('username', e.target.value)}
                />
              </div>
              <div className="form-group">
                <TextField
                  floatingLabelText="Email"
                  fullWidth
                  name="email"
                  value={this.props.formValues.get('email')}
                  onChange={(e) => this.props.inputChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <SelectField
                  floatingLabelText="Fungsi"
                  name="fungsi"
                  value={this.props.formValues.get('fungsi')}
                  onChange={(e, idx, value) => {this.props.inputChange('fungsi', value)}}
                >
                  <MenuItem value={'konsuler'} primaryText="konsuler" />
                  <MenuItem value={'naker'} primaryText="naker" />
                  <MenuItem value={'imigrasi'} primaryText="imigrasi" />
                  <MenuItem value={'keuangan'} primaryText="keuangan" />
                  <MenuItem value={'perhubungan'} primaryText="perhubungan" />
                  <MenuItem value={'dikbud'} primaryText="dikbud" />
                  <MenuItem value={'loket'} primaryText="loket" />
                  <MenuItem value={'admin'} primaryText="admin" />
                </SelectField>
              </div>
              <div className="form-group">
                <TextField
                  floatingLabelText="Password"
                  type="password"
                  fullWidth
                  name="password"
                  value={this.props.formValues.get('password')}
                  onChange={(e) => this.props.inputChange('password', e.target.value)}
                  />
              </div>
            </fieldset>
          </form>

        </div>
      </div>
      <div className='row'>
         <div className='col-10 card-action no-border text-right' style={{marginTop: '1.5rem',marginBottom: '1.5rem',marginRight:'0.5rem'}} >

          { formDelete && <RaisedButton onTouchTap={this.props.deleteForm} label='Hapus Akun' secondary={true} style={{marginRight:'0.5rem'}}/> }
          <RaisedButton onTouchTap={this.props.submitForm} label={formButton} primary={true} />
        </div>
      </div>
      <div className='row'>
        <div className='col-10' style={{color: 'red'}} >
          {this.props.message}
        </div>
      </div>
    </QueueAnim>
    </article>

  </div>

    )
  }
}


export default UserEdit
