import React from 'react'
import { Link } from 'react-router'

import APPCONFIG from 'constants/Config'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import QueueAnim from 'rc-queue-anim'

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  componentWillMount() {
    console.log('componentWillMount', this.state, this.props)

    if ( this.props.token ) {
      console.log('should change location')
      setTimeout(() => {
        this.props.router.push('/admin/app') // XXX hardwired. See XXX
      }, 100)
    }

    this.setState({display: this.props.display})
    
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.apiLoading && this.props.apiLoading) {
      console.log('componentWillReceiveProps', nextProps, this.props)
      if (nextProps.token && !this.props.token) {
        setTimeout(() => {
          this.props.router.push('/admin/app')
        }, 10)
      }

      if (nextProps.apiError && nextProps.apiErrorData) {
        // console.log('error', nextProps.apiErrorData)
        switch (nextProps.apiErrorData.code) {
          case 'no token':
            break

          case 'LOGIN_FAILED':
            this.setState({message:'username dan password salah'})
            break

          case 'LOGIN_FAILED_EMAIL_NOT_VERIFIED':
            this.setState({message:'Email belum diverifikasi'})
            break

          default:
            // this.setState({message:'Maaf, ada masalah dengan sistem'})
        }
      }

    }
  }

  render() {
    return (
      <div className="page-login">
        <div className="main-body">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="1">
              <div className="body-inner">
                <div className="card bg-white">
                  <div className="card-content">

                    <section className="logo text-center">
                      <div><img style={{width:'192'}} src='/android-icon-192x192.png' /></div>
                      <h5>SAKURA Admin</h5>
                    </section>

                    <form className="form-horizontal">
                      <fieldset>
                        <div className="form-group">
                          <TextField
                            floatingLabelText="Username"
                            fullWidth
                            name="username"
                            onChange={(e) => this.props.inputChange('username', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <TextField
                            floatingLabelText="Password"
                            type="password"
                            fullWidth
                            name="password"
                            onChange={(e) => this.props.inputChange('password', e.target.value)}
                            />
                        </div>
                      </fieldset>
                    </form>
                  </div>
                  <div className="card-action no-border text-right">
                    <RaisedButton onTouchTap={()=>this.props.loginUser(this.props.formValues.toJS())} label='Login' primary={true} />
                    <p style={{'color':'red'}} >{this.state.message}</p>
                  </div>
                </div>

          </div>
            </div>
          </QueueAnim>
        </div>
      </div>
    );
  }
}

export default Login