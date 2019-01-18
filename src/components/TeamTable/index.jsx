import React, {Component, Fragment} from 'react';
import _ from 'lodash';

// Import related components
import OverlayLoader from '../OverlayLoader';
import InviteUserOverlay from '../InviteUserOverlay';

// Import component assets
import CaretIcon from '../../assets/caret-both.svg';
import FilterIcon from '../../assets/filter.svg';
import AddIcon from '../../assets/add.svg';
import EllipsisIcon from '../../assets/ellipsis-icon.svg';

// Import component styles
import './style.css';
import axios from "axios/index";
import Cookie from "cookies-js";

export default class TeamTable extends Component {
  state = {
    invitingUser: false,
    loaded: false,
    members: [],
    team_stats: {
      ready_fellows: 0,
      fellows_on_track: 0,
      team_total_velocity: 0
    },
    meta: {
      count: 0
    }
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
        loaded: true,
        members: users.data.users,
        team_stats: users.data.team_stats,
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

  redirect(path) {
    const { history } = this.props;
    history.push(path);
  }

  toggleUserInvite = () => {
    this.setState(state => {
      return {
        ...state,
        invitingUser: !state.invitingUser
      }
    })
  };

  render() {
    const { loaded, invitingUser, members, meta, team_stats } = this.state;

    return (
      <Fragment>
        {/*{!loaded ? <OverlayLoader/> : ''}*/}

        {invitingUser ? <InviteUserOverlay title="Invite a new fellow" onCompleted={() => {
          this.toggleUserInvite()
        }} />: ''}

        <div className="team-table__container">
          <div className="team-table__banner">
            <div className="team-table__stat">
              <div className="team-table__stat-title">Fellows ready</div>
              <div className="team-table__stat-container">
                <span className="team-table__stat-value">{ team_stats.ready_fellows }</span>
                <span className="team-table__stat-against">/{ meta.count }</span>
              </div>
            </div>

            <div className="team-table__stat">
              <div className="team-table__stat-title">Fellows on-track</div>
              <div className="team-table__stat-container">
                <span className="team-table__stat-value">{ team_stats.fellows_on_track }</span>
                <span className="team-table__stat-against">/{ meta.count }</span>
              </div>
            </div>

            <div className="team-table__stat">
              <div className="team-table__stat-title">Learning velocity</div>
              <div className="team-table__stat-container">
                <span className="team-table__stat-value">{
                  meta.count === 0
                    ? 0
                    : (team_stats.team_total_velocity / meta.count).toFixed(0).toLocaleString()
                }</span>
                <span className="team-table__stat-against">/wk</span>
              </div>
            </div>
          </div>

          <div className="team-table">
            <div className="team-table__filter">
              <button className="team-table__button">
                <img src={FilterIcon} alt="Filter"/>
                Filter
              </button>

              <button className="team-table__button" onClick={() => {
                this.toggleUserInvite()
              }}>
                <img src={AddIcon} alt="Invite"/>
                Invite Member
              </button>
            </div>

            <div className="team-table__header">
              <div className="table__header--column" style={{ width: '278px' }}>Fellow</div>
              <div className="table__header--column" style={{ width: '192px' }}>Readiness</div>
              <div className="table__header--column" style={{ width: '211px' }}>Velocity</div>
              <div className="table__header--column" style={{ width: '201px' }}>Mastery</div>
              <div className="table__header--column" style={{ width: '161px' }}>Team</div>
              <div className="table__header--column" style={{ width: '205px' }}>Status</div>
            </div>

            <div className="team-table__body">
              {
                members.map(member => (
                  <div className="team-table__row" key={member.email} onClick={() => { this.redirect(`/teams/${_.lowerCase(member.team)}/${member.email}`) }}>
                    <div className="team-table__row-column" style={{ width: '278px' }}>
                      <a href={`/teams/${_.lowerCase(member.team)}/${member.email}`}>
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
                    </div>
                    <div className="team-table__row-column" style={{ width: '192px' }}>{member.readiness}</div>
                    <div className="team-table__row-column" style={{ width: '211px' }}>{member.velocity}</div>
                    <div className="team-table__row-column" style={{ width: '201px' }}>{member.skills}</div>
                    <div className="team-table__row-column" style={{ width: '161px' }}>{member.team}</div>
                    <div className="team-table__row-column team-table__row-column__actions" style={{ width: '205px' }}>
                      <p className={`badge ${this.badgeClass(member.status)}`}>
                        {_.capitalize(member.status.replace("-", " "))}
                      </p>

                      <img src={EllipsisIcon} alt="Menu"/>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
