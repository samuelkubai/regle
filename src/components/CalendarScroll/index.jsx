import React, { Component } from 'react';
import moment from 'moment';

// Import assets
import ScrollRight from '../../assets/scroll-right.svg';
import ScrollLeft from '../../assets/scroll-left.svg';

// Import the component's styles
import './style.css';

export default class CalendarScroll extends Component {
  state = {
    duration: 24,
    selectedDate: moment()
  };

  moveToTomorrow = () => {
    const { selectedDate } = this.state;

    if (!this.disableNextIcon()) {
      this.setState(state => {
        return {
          ...state,
          selectedDate: moment(selectedDate).add('days', 1)
        }
      });
    }
  };

  moveToYesterday = () => {
    const { selectedDate } = this.state;

    this.setState(state => {
      return {
        ...state,
        selectedDate: moment(selectedDate).subtract('days', 1)
      }
    });
  };

  disableNextIcon = () => {
    const { selectedDate } = this.state;

    return !(moment().diff(selectedDate, 'days') > 0);
  };

  renderSelectedDate() {
    const { selectedDate } = this.state;

    return (
      <div className="title">
        { selectedDate.format('MMMM D')}, <span className="subtle">{ selectedDate.format('dddd') }</span>
      </div>
    );
  }

  renderDateRange() {
    const { duration, selectedDate } = this.state;
    let date_range = [];

    for (let day = 0; day < duration; day++) {
      let current_date = moment(selectedDate).subtract('days', day);

      date_range.unshift(
        (
          <li className={ moment(selectedDate).diff(current_date, 'days') === 0 ? 'active selected' : ''}
              onClick={() => {
                this.setState(state => {
                  return {
                    ...state,
                    selectedDate: current_date
                  }
                })
              }}
              key={day}
          >
            <div className="day">{ current_date.format('dddd')[0] }</div>
            <div className="date">{ current_date.format('D') }</div>
          </li>
        )
      );
    }

    return date_range;
  }
  render() {
    return (
      <div className="calendar-scroll">
        { this.renderSelectedDate()}

        <div className="calendar">
          <img onClick={this.moveToYesterday} role="presentation" className="icon"  src={ScrollLeft} alt="Previous"/>

          <ul className="calendar__scroll">
            {this.renderDateRange()}
          </ul>

          <img onClick={this.moveToTomorrow} role="presentation" className={this.disableNextIcon() ? 'icon disabled' : 'icon'} src={ScrollRight} alt="Next"/>
        </div>
      </div>
    )
  }
}
