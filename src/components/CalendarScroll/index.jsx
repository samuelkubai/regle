import React, { Component } from 'react';

// Import assets
import ScrollRight from '../../assets/scroll-right.svg';
import ScrollLeft from '../../assets/scroll-left.svg';

// Import the component's styles
import './style.css';

export default class CalendarScroll extends Component {
  render() {
    return (
      <div className="calendar-scroll">
        <div className="title">
          December 6, <span className="subtle">Friday</span>
        </div>

        <div className="calendar">
          <img className="icon" src={ScrollLeft} alt="Left"/>

          <ul className="calendar__scroll">
            <li>
              <div className="day">S</div>
              <div className="date">1</div>
            </li>
            <li>
              <div className="day">M</div>
              <div className="date">2</div>
            </li>
            <li>
              <div className="day">T</div>
              <div className="date">3</div>
            </li>
            <li>
              <div className="day">W</div>
              <div className="date">4</div>
            </li>
            <li>
              <div className="day">T</div>
              <div className="date">5</div>
            </li>
            <li className="active selected">
              <div className="day">F</div>
              <div className="date">6</div>
            </li>
            <li>
              <div className="day">S</div>
              <div className="date">7</div>
            </li>
            <li>
              <div className="day">S</div>
              <div className="date">8</div>
            </li>
            <li>
              <div className="day">M</div>
              <div className="date">9</div>
            </li>
            <li>
              <div className="day">T</div>
              <div className="date">10</div>
            </li>
            <li>
              <div className="day">W</div>
              <div className="date">11</div>
            </li>
            <li>
              <div className="day">T</div>
              <div className="date">12</div>
            </li>
            <li>
              <div className="day">F</div>
              <div className="date">13</div>
            </li>
            <li>
              <div className="day">S</div>
              <div className="date">14</div>
            </li>
            <li>
              <div className="day">S</div>
              <div className="date">15</div>
            </li>
            <li>
              <div className="day">M</div>
              <div className="date">16</div>
            </li>
            <li>
              <div className="day">T</div>
              <div className="date">17</div>
            </li>
            <li>
              <div className="day">W</div>
              <div className="date">18</div>
            </li>
            <li>
              <div className="day">T</div>
              <div className="date">19</div>
            </li>
            <li>
              <div className="day">F</div>
              <div className="date">20</div>
            </li>
            <li>
              <div className="day">S</div>
              <div className="date">21</div>
            </li>
            <li>
              <div className="day">S</div>
              <div className="date">22</div>
            </li>
            <li>
              <div className="day">M</div>
              <div className="date">23</div>
            </li>
            <li className="active">
              <div className="day">T</div>
              <div className="date">24</div>
            </li>
          </ul>

          <img className="icon" src={ScrollRight} alt="Right"/>
        </div>
      </div>
    )
  }
}
