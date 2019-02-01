import _ from 'lodash';
import React, {Component, Fragment} from "react";
import Cookie from "cookies-js";
import axios from "axios/index";

// Import components
import Popover from '../Popover';
import OverlayLoader from '../OverlayLoader';
import InviteUserOverlay from '../InviteUserOverlay';

// Import the component's assets
import "./style.css";
import AddIcon from "../../assets/add.svg";
import FilterIcon from "../../assets/filter-outline.svg";
import EllipsisIcon from '../../assets/ellipsis-icon.svg';

export default class MembersList extends Component {
  state = {
    activePopovers: {},
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

  hidePopovers = (email) => {
    const { activePopovers } = this.state;

    // Update the active popovers status
    activePopovers[email] = false;

    this.setState(state => {
      return {
        ...state,
        activePopovers
      }
    })
  };

  activatePopovers = (email) => {
    const { activePopovers } = this.state;

    // Update the active popovers status
    activePopovers[email] = true;

    this.setState(state => {
      return {
        ...state,
        activePopovers
      }
    })
  };

  togglePopovers = (email) => {
    const { activePopovers } = this.state;

    // Update the active popovers status
    activePopovers[email] = !activePopovers[email];

    this.setState(state => {
      return {
        ...state,
        activePopovers
      }
    })
  };

  render () {
    const { match: { params: { team }} } = this.props;
    const { loaded, invitingUser, members, meta, team_stats, activePopovers } = this.state;

    return (
      <Fragment>
        {/*{!loaded ? <OverlayLoader/> : ''}*/}

        {invitingUser ? <InviteUserOverlay title="Invite a new fellow" onCompleted={() => {
          this.toggleUserInvite()
        }} />: ''}

        <div className="members-list__container">
          <div className="members-list__header">
            <div className="members-list__title">
              Members List (2 Filters)
            </div>

            <div className="members-list__actions">
              <img src={AddIcon} alt="Invite" onClick={() => {
                this.toggleUserInvite()
              }}/>
              <img src={FilterIcon} alt="Filter"/>
            </div>
          </div>

          <ul className="members-list__list">
            {
              members.map(member => {
                return (
                  <li key={member.email}
                      className="members-list__member"
                      onClick={() => {
                        this.redirect(`/teams/${team}/members/${member.email}`)
                      }}
                  >
                    <div className="user-profile__container">
                      <img className="user-profile" src={member.picture} alt={member.name}/>
                      <div className="user-info">
                        <div className="user-name">
                          {member.name}
                        </div>
                        <div className="user-phase">
                          Phase {member.phase}
                        </div>
                      </div>
                    </div>

                    <div className="badge__container">
                      <div className={`badge ${this.badgeClass(member.status)}`}>
                        {_.capitalize(member.status.replace("-", " "))}
                      </div>
                    </div>

                    <div className="popover__container">
                      <Popover
                        onToggle={() => {
                          this.togglePopovers(member.email);
                        }}
                        target={<img ref={`ellipsis-${member.email}`} src={EllipsisIcon} alt="Menu"/>}
                        open={activePopovers.hasOwnProperty(member.email) ? activePopovers[member.email] : false}
                      >
                        <div className="members-list__popover">
                          <div className="members-list__popover__header">
                            Actions
                          </div>

                          <a onClick={e => { e.preventDefault() }}
                             className="members-list__popover__option">
                            Update fellow information
                          </a>

                          <a onClick={e => { e.preventDefault() }}
                             className="members-list__popover__option">
                            Deactivate fellow
                          </a>

                          <hr className="members-list__popover__divider"/>

                          <div className="members-list__popover__header">
                            Connections
                          </div>

                          <a onClick={e => {
                            e.preventDefault();
                            this.togglePopovers(member.email);
                            this.redirect(`/teams/${_.lowerCase(member.team)}/${member.email}`);
                          }} className="members-list__popover__option">View fellow deep-dive</a>
                        </div>
                      </Popover>
                    </div>

                  </li>
                );
              })
            }

          </ul>
        </div>
      </Fragment>

    );
  }
}
