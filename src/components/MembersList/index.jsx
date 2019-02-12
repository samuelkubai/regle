import _ from 'lodash';
import React, {Component, Fragment} from "react";
import Cookie from "cookies-js";
import axios from "axios/index";
import Container from '../../lib/Container';

// Import components
import Popover from '../Popover';
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
    const team = Container.currentTeam;

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

  static badgeClass(status) {
    if (status === 'ready') {
      return 'badge--ready';
    } else if (status === 'on-track') {
      return 'badge--on-track';
    } else {
      return 'badge--off-track';
    }
  }

  addUser = user => {
    // Format the user data to something usable.
    const userInfo = {
      name: user.data.name,
      phase: user.meta.phase,
      picture: user.data.profile_picture,
      team: user.meta.team,
      status: user.meta.status,
      email: user.data.email
    };

    // Add the user to the members array
    let members = this.state.members;
    members.unshift(userInfo);

    // Set the updated member list to state
    this.setState(state => {
      return {
        ...state,
        members
      }
    });
  };

  toggleUserInvite = () => {
    this.setState(state => {
      return {
        ...state,
        invitingUser: !state.invitingUser
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

  renderMemberslist = ({ activePopovers, members, selectMember }) => {
    return (
      <ul className="members-list__list">
        {
          members.map(member => {
            return (
              <li key={member.email}
                  className="members-list__member"
                  onClick={() => {
                    selectMember(member.email);
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
                  <div className={`badge ${MembersList.badgeClass(member.status)}`}>
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
    );
  };

  renderMembersListPlaceholder = () => {
    const shadowMembers = 10;

    let shadowMembersList = [];

    for (let index = 1; index <= shadowMembers; index++) {
     shadowMembersList.push(
       (
         <li key={index} className="members-list__member">
           <div className="shadow-member__container">
             <div className="shadow-member__image shadow-elements"></div>
             <div className="shadow-member__information">
               <div className="shadow-member__name shadow-elements"></div>
               <div className="shadow-member__phase shadow-elements"></div>
             </div>
           </div>
         </li>
       )
     )
    }

    return (
      <ul className="members-list__list">
        { shadowMembersList }
      </ul>
    );
  };

  render () {
    const { selectMember } = this.props;
    const { loaded, invitingUser, members, activePopovers } = this.state;

    return (
      <Fragment>
        {invitingUser ?
          <InviteUserOverlay
            title="Invite a new fellow"
            onCompleted={(user, success) => {
              if (success) { this.addUser(user); }
              this.toggleUserInvite()
            }}
          /> :
          ''}

        <div className="members-list__container">
          <div className="members-list__header">
            <div className="members-list__title">
              Members List
            </div>

            <div className="members-list__actions">
              <img src={AddIcon} alt="Invite" onClick={() => {
                this.toggleUserInvite()
              }}/>
              <img src={FilterIcon} alt="Filter"/>
            </div>
          </div>

          {
            loaded ?
              this.renderMemberslist({ activePopovers, members, selectMember }) :
              this.renderMembersListPlaceholder()
          }
        </div>
      </Fragment>
    );
  }
}
