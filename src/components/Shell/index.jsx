import _ from "lodash";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom'
import React, { Component, Fragment } from "react";

// Setup the redux store.
import { appendNewTeam, updateSelectedTeam } from "../../store/actions/shell";

// Import related components
import CreateTeamModal from '../../components/CreateTeamModal';

// Import component assets
import './style.css';
import AddLogo from '../../assets/add.svg';
import Caret from '../../assets/union.svg';

class Shell extends Component {
  state = {
    creatingTeam: false
  };

  appendNewTeam = (team) => {
    const { appendNewTeam } = this.props;

    appendNewTeam(team.data.team);
  };

  toggleTeamCreationModal = () => {
    this.setState(state => {
      return {
        ...state,
        creatingTeam: !state.creatingTeam
      }
    });
  };

  render() {
    const { children, avatar, selectedTeam, teams, username } = this.props;
    const { creatingTeam } = this.state;

    return (
      <Fragment>
        {
          creatingTeam ?
            <CreateTeamModal
              title="Create a new team"
              onCompleted={(team, success) => {
                console.log('Creation of team complete.');
                if (success) { this.appendNewTeam(team); }
                this.toggleTeamCreationModal()
              }}
            >
            </CreateTeamModal> :
            ''
        }
        <div className="app-shell__container">
          <div className="sidebar__container">
            <div className="teams-selector__container">
              <ul className="teams-selector__list">
                {teams.map(team => {
                  return (
                      <li key={team.slug}
                          className={
                          `team-selector__team ${team.slug === selectedTeam ? 'team-selector__team--active': ''}`
                          }
                          onClick={() => {
                            window.location.replace(`/redirect?action=CHANGE_TEAM&&team=${team.slug}`);
                          }}
                      >
                        {team.name[0]}
                      </li>
                  )
                })}
                <li
                  className="team-selector__team"
                  onClick={() => {
                    this.toggleTeamCreationModal();
                  }}
                >
                  <img src={AddLogo} alt="Add"/>
                </li>
              </ul>
            </div>

            <div className="menu-bar__container">
              <div className="user-toggle__container">
                <div id="profile-dropdown" className="profile-dropdown">
                  <img
                    alt="User profile"
                    className="profile-dropdown__image"
                    src={avatar}
                  />
                  <div className="profile-dropdown__name">
                    { _.truncate(username, { length: 11}) }
                  </div>
                  <img
                    alt="Down"
                    className="profile-dropdown__icon"
                    src={Caret}
                  />
                </div>
              </div>

              <ul className="menu-bar">
                <li className="menu-bar__title">Analytics</li>
                <li className="menu-bar__item">Skills</li>
                <li className="menu-bar__item">Storyboard</li>
                <li className="menu-bar__item">Members</li>

                <li className="menu-bar__title">Team</li>
                <li
                  className="menu-bar__item menu-bar__item--active"
                  onClick={() => {
                    window.location.replace(`/teams/${selectedTeam}/members`)
                  }}
                >
                  Members
                </li>
                <li className="menu-bar__item">Skills</li>
                <li className="menu-bar__item">Targets</li>
                <li className="menu-bar__item">Settings</li>
              </ul>
            </div>
          </div>
          <div className="content__container">
            <Fragment>
              {children}
            </Fragment>
          </div>
        </div>
      </Fragment>
    );
  }
}

const initMapStateToProps = ({ shell }) => {
  return {
    selectedTeam: shell.selectedTeam
  }
};

const initMapDispatchToProps = (dispatch) => {
  return bindActionCreators({ appendNewTeam, updateSelectedTeam }, dispatch)
};

export default withRouter(connect(initMapStateToProps, initMapDispatchToProps)(Shell));
