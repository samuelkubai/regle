import _ from "lodash";
import React, { Component, Fragment } from "react";

// Import component assets
import AddLogo from '../../assets/add.svg';
import Caret from '../../assets/union.svg';

import './style.css';

export default class Shell extends Component {
  render() {
    const { children, avatar, username } = this.props;

    return (
      <div className="app-shell__container">
        <div className="sidebar__container">
          <div className="teams-selector__container">
            <ul className="teams-selector__list">
              <li className="team-selector__team team-selector__team--active">A</li>
              <li className="team-selector__team">E</li>
              <li className="team-selector__team">
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
                  {_.truncate(username, {
                    length: 11
                  })}
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
              <li className="menu-bar__item menu-bar__item--active">Members</li>
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

    );
  }
}
