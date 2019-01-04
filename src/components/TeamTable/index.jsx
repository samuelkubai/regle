import React, { Component } from 'react';
import _ from 'lodash';

// Import component assets
import CaretIcon from '../../assets/caret-both.svg';

// Import component styles
import './style.css';
import axios from "axios/index";
import Cookie from "cookies-js";

export default class TeamTable extends Component {
  state = {
    members: []
  };

  async componentDidMount() {
    const { REACT_APP_API_URL } = process.env;
    // const urlParams = new URLSearchParams(window.location.search);
    const team = `travela`;

    const token = Cookie.get('jwt-token');
    const response = await axios.get(
      `${REACT_APP_API_URL}/users?team=${team}`,
      { headers: { Authorization: `${token}` } }
    );

    const users = response.data;

    this.setState(state => {
      return {
        ...state,
        members: users.data.users,
        meta: users.meta
      }
    });
  }

  badgeClass(status) {
    if (status === 'ready') {
      return 'badge--ready';
    } else if (status === 'on-track') {
      return 'badge--on-track';
    } else {
      return 'badge--off-track';
    }
  }

  render() {
    const { members } = this.state;

    return (
      <div className="team-table">
        <div className="team-table__header">
          <div className="team-table__stat">
            <div className="team-table__stat-title">Fellows ready</div>
            <div className="team-table__stat-container">
              <span className="team-table__stat-value">9</span>
              <span className="team-table__stat-against">/16</span>
            </div>
          </div>

          <div className="team-table__stat">
            <div className="team-table__stat-title">Fellows on-track</div>
            <div className="team-table__stat-container">
              <span className="team-table__stat-value">11</span>
              <span className="team-table__stat-against">/16</span>
            </div>
          </div>

          <div className="team-table__stat">
            <div className="team-table__stat-title">Learning velocity</div>
            <div className="team-table__stat-container">
              <span className="team-table__stat-value">910</span>
              <span className="team-table__stat-against">/wk</span>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr className="table__header">
              <td>Fellow <img src={CaretIcon} alt="Toggle"/></td>
              <td>Readiness <img src={CaretIcon} alt="Toggle"/></td>
              <td>Learning velocity <img src={CaretIcon} alt="Toggle"/></td>
              <td>Mastered skills <img src={CaretIcon} alt="Toggle"/></td>
              <td>Team <img src={CaretIcon} alt="Toggle"/></td>
              <td className="right-align">Status <img src={CaretIcon} alt="Toggle"/></td>
            </tr>
          </thead>

          <tbody>
            {
              members.map(member => (
                <tr key={member.username}>
                  <td>
                    <a href={`/teams/${_.lowerCase(member.team)}/${member.username}?username=${member.username}`}>
                      <img className="user-profile" src={member.picture} alt={member.name}/>
                      <div className="user-info">
                        <div className="user-name">
                          {member.name}
                        </div>
                        <div className="user-phase">
                          Phase {member.phase}
                        </div>
                      </div>
                    </a>
                  </td>
                  <td>{member.readiness}</td>
                  <td>{member.velocity}</td>
                  <td>{member.skills}</td>
                  <td>{member.team}</td>
                  <td className="right-align">
                    <p className={`badge ${this.badgeClass(member.status)}`}>
                      {_.capitalize(member.status.replace("-", " "))}
                    </p>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
