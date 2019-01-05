import React, { Component } from 'react';

// Import component assets
import VideoClip from '../../assets/Video.png';
import PlayIcon from '../../assets/play-icon.svg';

// Import component styles
import './style.css';

export default class VideoPlayer extends Component {
  render() {
    return (
      <div className="video-player">
        <img src={VideoClip} alt="Video"/>

        <button className="active rounded">
          <img src={PlayIcon} alt="Play"/>
        </button>

        <ul className="pagination">
          <li className="active"></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}
