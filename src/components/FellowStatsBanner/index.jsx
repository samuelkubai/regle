import React, { Component } from 'react';

import ArrowUp from '../../assets/arrow-pointing-to-up.svg';
import ArrowDown from '../../assets/arrow-pointing-to-down.svg';

export default class FellowStatsBanner extends Component {
  state = {
    analytics: { analytics: [], user: {} }
  };

  async componentDidMount() {
    const { REACT_APP_API_URL } = process.env;
    const analytics = await fetch(`${REACT_APP_API_URL}/analytics`)
      .then(res => res.json());

    this.setState(state => {
      return {
        ...state,
        analytics: analytics.data
      }
    });
  }

  render () {
    const { analytics: { analytics, user } } = this.state;

    return (
      <div className="banner">
        <div className="user-bio">
          <img className="user-image" src={user.picture} alt="User Profile"/>
          <div className="user-info">
            <div className="user-info__name">
              {user.name}
            </div>
            <div className="user-info__phase">
              Phase {user.phase} ({user.duration} weeks in apprenticeship)
            </div>
          </div>
        </div>

        <div className="user-statistics">
          {analytics.map(analytic => (
            <div key={analytic.label} className="user-statistic">
              <div className="user-statistic__label">
                {analytic.label}
              </div>

              <div className="user-statistic__value">
                <img className="user-statistic__icon" src={analytic.progress ? ArrowUp : ArrowDown } alt="Down"/>
                <div className="user-statistic__main">
                  {analytic.value}
                </div>
                <div className="user-statistic__against">
                  {analytic.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}