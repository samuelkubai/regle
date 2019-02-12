import React, { Component } from 'react';
import axios from 'axios';
import Container from '../../lib/Container';

// Import component assets
import './style.css';
import CancelIcon from '../../assets/cancel.svg';
import AddIcon from '../../assets/add.svg';
import Cookie from "cookies-js";

export default class InviteUserOverlay extends Component {
  state = {
    user: {
      email: '',
      phase: 1,
      usernames: ['']
    }
  };

  addGithubUsername = () => {
    this.setState(state => {
      const { user } = state;

      // Add username
      user.usernames.push('');

      return {
        ...state,
        user
      }
    })
  };

  populateGithubUsername = (username, index) => {
    this.setState(state => {
      const { user } = state;

      // Update the Github username
      user.usernames[index] = username;

      return {
        ...state,
        user
      }
    });
  };

  removeGithubUsername = (index) => {
    this.setState(state => {
      const { user } = state;

      // Remove specific username
      user.usernames.splice(index, 1);

      return {
        ...state,
        user
      }
    });
  };

  populateUserEmail = (email) => {
    this.setState(state => {
      const { user } = state;

      // Update user email
      user.email = email;

      return {
        ...state,
        user
      }
    });
  };

  inviteUser = async () => {
    const { REACT_APP_API_URL } = process.env;
    const { user } = this.state;
    const { onCompleted } = this.props;

    const team = Container.currentTeam;
    const token = Cookie.get('jwt-token');

    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/teams/${team}/invite`,
        user,
        { headers: { Authorization: `${token}` } }
      );

      onCompleted(response.data, true);
    } catch (e) {
      console.log(`Failed to invite the user`);
      console.log(`Error:`, e)
    }
  };

  render () {
    const {title, onCompleted} = this.props;
    const {user: {usernames}} = this.state;

    return (
      <div className="modal__overlay">
        <div className="modal">
          <div className="modal__header">
            {title}
          </div>

          <div className="modal__body">
            <div className="form-field">
              <label htmlFor="email">Andela Email</label>
              <input id="email" type="text" onChange={(event) => {
                this.populateUserEmail(event.target.value)
              }}/>
            </div>

            <div className="form-divider">
              Github usernames
            </div>

            {
              usernames.map((username, index) => (
                <div key={index} className={`username-field ${usernames.length < 2 ? 'username-field__first' : ''}`}>
                  <div className="form-field">
                    <input type="text" value={username} onChange={(event) => {
                      this.populateGithubUsername(event.target.value, index)
                    }}/>
                  </div>

                  <div className="username__delete" onClick={() => {
                    this.removeGithubUsername(index)
                  }}>
                    <img src={CancelIcon} alt="Delete"/>
                  </div>
                </div>
              ))
            }


            <div className="action__link"
                 role="presentation"
                 onClick={() => {
                   this.addGithubUsername()
                 }}>
              <img src={AddIcon} alt="Add"/>

              Add github username
            </div>
          </div>

          <div className="modal__footer">
            <button className="btn--raised white-btn" onClick={() => {
              onCompleted(null, false)
            }}>
              Cancel
            </button>

            <button onClick={this.inviteUser} className="btn--raised action-btn">
              Invite
            </button>
          </div>
        </div>
      </div>
    );
  }
}
