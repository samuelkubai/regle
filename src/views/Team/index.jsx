import React, { Component, Fragment } from 'react';

// Import the team's components
import MembersList from '../../components/MembersList';
import MemberDetail from '../../components/MemberDetail';

// Import styles
import './style.css'

export default class Team extends Component {
  render() {
    const { history } = this.props;

    return (
      <Fragment>
        <div className="pg-team__container">
          <div className="pg-team__stroke"></div>
          <MembersList {...this.props} />
          <MemberDetail {...this.props} />
        </div>
      </Fragment>
    );
  }
}
