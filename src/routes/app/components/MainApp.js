// this is a violation of Component pattern
// however to make this MainApp short...

import { createSelector } from 'reselect'
import { connect } from 'react-redux'

import { logout } from 'Api/reducer'

import React from 'react'

import FaSpinner from 'react-icons/lib/fa/spinner'
import 'font-awesome-animation/src/_font-awesome-animation.scss'


import Header from 'components/Header'
import Sidenav from 'components/Sidenav'
import Footer from 'components/Footer'
import Customizer from 'components/Customizer'

const mapDispatchToProps = {
  logout,
}

const api = (state) => state.api
const loading = createSelector(api, (a) => a.get('loading'))
const token = createSelector(api, (a) => a.getIn(['token','id']))
const user = createSelector(api, (a) => a.getIn(['token','user']))
const fungsi = createSelector(api, (a) => a.getIn(['token','user', 'fungsi']))

const mapStateToProps = (state) => ({
  loading: loading(state),
  token: token(state),
  user: user(state),
  fungsi: fungsi(state)
})

class MainApp extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && this.props.loading) {
      $('body').removeClass('sidebar-mobile-open')
    }
  }
  render() {
    console.log('MainApp', this.props)
    const { children, location } = this.props;

    const spinnerSize = 100
    const spinnerLeft = (window.innerWidth - spinnerSize)/2
    // const spinnerTop = (window.innerHeight - spinnerSize)/2
    const spinnerTop = (spinnerSize)/1.5

    return (
      <div className="main-app-container">
        <Sidenav fungsi={this.props.fungsi} />

        <section id="page-container" className="app-page-container">
          <Header logout={this.props.logout} router={this.props.router}/>

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                {children}
              </div>
            </div>

            <Footer />
          </div>
        </section>

                {this.props.loading &&
                  <div style={{zIndex:1000, position: 'absolute', top: spinnerTop, width: '100vw', height: '100vh'}} >
                    <FaSpinner className='animated faa-spin'
                      style={{
                        display: 'block',
                        width: spinnerSize,
                        minHeight: spinnerSize,
                        margin: 'auto',
                        opacity: '0.3',
                        color: 'grey',
                      }}
                    />
                   </div>
                }
      </div>
    );
  }
}

// module.exports = MainApp;
export default connect(mapStateToProps, mapDispatchToProps)(MainApp)

