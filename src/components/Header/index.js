import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import NavRightList from './NavRightList';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';


class Header extends React.Component {
  componentDidMount() {
    const sidebarToggler = this.sidebarBtn;
    const $sidebarToggler = $(sidebarToggler);
    const $body = $('body');

    $sidebarToggler.on('click', (e) => {
      // _sidebar.scss, _page-container.scss
      console.log('$sidebarToggler', $body);
      $body.toggleClass('sidebar-mobile-open');
    });
  }

  render() {
    const { isFixedHeader, colorOption, logout , router } = this.props;

            // <NavLeftList />
            // <NavRightList logout={logout} />

    return (
      <section className="app-header">
        <div
          className={classnames('app-header-inner', {
            'bg-color-light': ['11', '12', '13', '14', '15', '16', '21'].indexOf(colorOption) >= 0,
            'bg-color-dark': colorOption === '31',
            'bg-color-primary': ['22', '32'].indexOf(colorOption) >= 0,
            'bg-color-success': ['23', '33'].indexOf(colorOption) >= 0,
            'bg-color-info': ['24', '34'].indexOf(colorOption) >= 0,
            'bg-color-warning': ['25', '35'].indexOf(colorOption) >= 0,
            'bg-color-danger': ['26', '36'].indexOf(colorOption) >= 0 })}
                >
          <div className="hidden-lg-up float-left">
            <a href="javascript:;" className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          <div className="brand hidden-md-down">
            <h2><Link to="/">{APPCONFIG.brand}</Link></h2>
          </div>

          <div className="top-nav-left hidden-md-down">
          </div>

          <div className="top-nav-right">
              <FlatButton
              onTouchTap={() => {logout().then(()=> {console.log('logout'); router.push('/admin/')})}}
              label="Logout"
              icon={<i className="material-icons">forward</i>}
            />
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  colorOption: state.settings.colorOption,
  isFixedHeader: state.settings.isFixedHeader
});

module.exports = connect(
  mapStateToProps
)(Header);

