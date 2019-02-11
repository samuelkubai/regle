import React, { Component } from "react";

// Import the component's assets
import SetupIcon from "../../assets/setup.svg";
import "./style.css";

export default class Setup extends Component {
  render() {
    return (
      <div className="pg-setup">
        <div className="setup__container">
          <img src={SetupIcon} alt="Setup" className="setup__image"/>

          <div className="setup__message">
            Setting up a few things, promise it won't take long
          </div>
        </div>
      </div>
    );
  }
}
