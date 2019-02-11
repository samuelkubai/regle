import _ from 'lodash';
import { connect } from "react-redux";
import React, { Component } from "react";

// Import the components required.
import Setup from "../../components/Setup/index";
import AuthHOC from "../../components/hoc/auth";


class Redirect extends Component {
  dispatch = (action) => {
    const { history, setupComplete, selectedTeam } = this.props;

    switch (action) {
      case 'REDIRECT_DURING_LOGIN':
        if (setupComplete)
          history.push(`teams/${selectedTeam}/members`);
    }
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps, this.props)) {
      const action = new URLSearchParams(window.location.search).get("action");
      this.dispatch(action);
    }
  }

  render() {
    return (<Setup/>);
  }
}

const initMapStateToProps = ({ shell }) => {
  return {
    selectedTeam: shell.selectedTeam,
    setupComplete: shell.teams__loaded,
  };
};

export default AuthHOC(connect(initMapStateToProps)(Redirect));
