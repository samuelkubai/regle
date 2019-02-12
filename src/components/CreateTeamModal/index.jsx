import React, { Component } from 'react';
import axios from 'axios';

// Import component assets
import './style.css';
import CancelIcon from '../../assets/cancel.svg';
import AddIcon from '../../assets/add.svg';
import Cookie from "cookies-js";

export default class CreateTeamModal extends Component {
  state = {
    team: {
      name: '',
      repositories: ['']
    }
  };

  addGithubRepositories = () => {
    this.setState(state => {
      const { team } = state;

      // Add username
      team.repositories.push('');

      return {
        ...state,
        team
      }
    })
  };

  populateGithubRepositories = (username, index) => {
    this.setState(state => {
      const { team } = state;

      // Update the Github repositories
      team.repositories[index] = username;

      return {
        ...state,
        team
      }
    });
  };

  removeGithubRepositories = (index) => {
    this.setState(state => {
      const { team } = state;

      // Remove specific repository
      team.repositories.splice(index, 1);

      return {
        ...state,
        team
      }
    });
  };

  populateTeamName = (name) => {
    this.setState(state => {
      const { team } = state;

      // Update team name
      team.name = name;

      return {
        ...state,
        team
      }
    });
  };

  createTeam = async () => {
    const { REACT_APP_API_URL } = process.env;
    const { team } = this.state;
    const { onCompleted } = this.props;

    const token = Cookie.get('jwt-token');

    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/teams/create`,
        team,
        { headers: { Authorization: `${token}` } }
      );

      onCompleted(response.data, true);
    } catch (e) {
      console.log(`Failed to create a team`);
      console.log(`Error:`, e)
    }
  };

  render () {
    const {title, onCompleted} = this.props;
    const {team: {repositories}} = this.state;

    return (
      <div className="modal__overlay">
        <div className="modal">
          <div className="modal__header">
            {title}
          </div>

          <div className="modal__body">
            <div className="form-field">
              <label htmlFor="name">Team Name</label>
              <input id="name" type="text" onChange={(event) => {
                this.populateTeamName(event.target.value)
              }}/>
            </div>

            <div className="form-divider">
              Github repositories
            </div>

            {
              repositories.map((repository, index) => (
                <div key={index} className={`username-field ${repositories.length < 2 ? 'username-field__first' : ''}`}>
                  <div className="form-field">
                    <input type="text" value={repository} onChange={(event) => {
                      this.populateGithubRepositories(event.target.value, index)
                    }}/>
                  </div>

                  <div className="username__delete" onClick={() => {
                    this.removeGithubRepositories(index)
                  }}>
                    <img src={CancelIcon} alt="Delete"/>
                  </div>
                </div>
              ))
            }


            <div className="action__link"
                 role="presentation"
                 onClick={() => {
                   this.addGithubRepositories()
                 }}>
              <img src={AddIcon} alt="Add"/>

              Add repository
            </div>
          </div>

          <div className="modal__footer">
            <button className="btn--raised white-btn" onClick={() => {
              onCompleted(null, false)
            }}>
              Cancel
            </button>

            <button onClick={this.createTeam} className="btn--raised action-btn">
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}
