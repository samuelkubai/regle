import _ from 'lodash';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import React, { Component } from "react";
import Container from '../../lib/Container';

// Setup the redux actions
import { updateSelectedTeam } from '../../store/actions/shell';

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
        return;
      case 'CHANGE_TEAM':
        const { updateSelectedTeam } = this.props;
        const team = new URLSearchParams(window.location.search).get("team");

        updateSelectedTeam(team);
        Container.currentTeam = team;

        history.push(`teams/${team}/members`);
        return;
    }
  };

  componentDidMount() {
    const action = new URLSearchParams(window.location.search).get("action");
    this.dispatch(action);
  }

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

const initMapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateSelectedTeam }, dispatch)
};

export default AuthHOC(connect(initMapStateToProps, initMapDispatchToProps)(Redirect));
