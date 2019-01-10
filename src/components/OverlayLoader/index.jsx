import React, { Component } from 'react';
import Loader from 'react-loaders'

import './style.css';
import 'loaders.css';

export default class OverlayLoader extends Component {
  render() {
    const { message } = this.props;

    return (
      <div className="overlay">
        <div className="center-piece">
          <Loader type="line-scale" />

          { message ? message: 'Crunching the numbers' }
        </div>
      </div>
    );
  }
}
