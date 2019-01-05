import React, { Component, Fragment } from 'react';

import '../components/custom-elements/NavBar/index';
import '../components/custom-elements/Breadcrumbs/index';

import AuthHOC from '../components/hoc/auth';

import Logo from '../assets/logo.svg';
import Caret from '../assets/union.svg';

class Layout extends Component {
  render() {
    const { user, children } = this.props;

    return (
      <Fragment>
        <bread-crumbs
          title="Regle"
          icon={Logo}
          path="Dashboard,Team,samuel.kubai@andela.com"
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
