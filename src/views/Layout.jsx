import _ from 'lodash';
import React, { Component, Fragment } from 'react';

import '../components/custom-elements/NavBar/index';
import '../components/custom-elements/Breadcrumbs/index';

import AuthHOC from '../components/hoc/auth';

import Logo from '../assets/logo.svg';
import Caret from '../assets/union.svg';

class Layout extends Component {
  getBreadCrumbs() {
    const crumbs = _.without(window.location.pathname.split("/").map(crumb => _.capitalize(crumb.trim())), "");

    return _.join(crumbs, ",");
  }

  render() {
    const { user, children } = this.props;

    return (
      <Fragment>
        <bread-crumbs
          title="Regle"
          icon={Logo}
          path={this.getBreadCrumbs()}
        >
        </bread-crumbs>

        { children }

        <nav-bar
          profile-name={user.UserInfo.name}
          profile-image={user.UserInfo.picture}
          chevron-down={Caret}
        >
        </nav-bar>
      </Fragment>
    );
  }
}

export default AuthHOC(Layout);
