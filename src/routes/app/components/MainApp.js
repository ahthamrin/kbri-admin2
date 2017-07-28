// this is a violation of Component pattern
// however to make this MainApp short...

import { createSelector } from 'reselect'
import { connect } from 'react-redux'

import { logout } from 'Api/reducer'

import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import Customizer from 'components/Customizer';

const mapDispatchToProps = {
  logout,
}

const api = (state) => state.api
const token = createSelector(api, (a) => a.getIn(['token','id']))
const user = createSelector(api, (a) => a.getIn(['token','user']))
const fungsi = createSelector(api, (a) => a.getIn(['token','user', 'fungsi']))

const mapStateToProps = (state) => ({
  token: token(state),
  user: user(state),
  fungsi: fungsi(state)
})


class MainApp extends React.Component {
  render() {
    // console.log('MainApp', this.props)
    const { children, location } = this.props;

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

      </div>
    );
  }
}

// module.exports = MainApp;
export default connect(mapStateToProps, mapDispatchToProps)(MainApp)

