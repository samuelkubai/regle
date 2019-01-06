import React, { Component } from 'react';
import Cookie from 'cookies-js';

// Import related components
import VideoPlayer from '../../components/VideoPlayer';

// Import the component's assets
import RoundedRegleLogo from '../../assets/rounded-regle-logo.svg';
import GoogleIcon from '../../assets/google-icon.svg';
import BackgroundImage from '../../assets/login-background.png'

// Import the component's styling
import './style.css';

export default class Login extends Component {
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get('token');

    if (token) {
      Cookie.set('jwt-token', token);

      // FIX: Make this more dynamic
      this.redirect();
    }
  }

  redirect() {
    const {  history } = this.props;

    history.push('/teams/travela');
  }

  login() {
    window.location.replace(`${process.env.REACT_APP_ANDELA_AUTH_HOST}/login?redirect_url=${process.env.REACT_APP_AUTH_REDIRECT_URL}`);
  }

  render() {
    const login_styles = {
      backgroundImage: `url(${BackgroundImage})`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `797px 729px`,
      backgroundPosition: `100% 0`
    };

    return (
      <div className="login" style={login_styles}>
        <div className="login__container">
          <div className="header">
            <img src={RoundedRegleLogo} alt="Regle"/> Regle
          </div>

          <div className="content">
            <div className="content__login">
              <div className="login__message">
                <div className="login__message--text">
                  Track your growth....
                </div>
                <div className="login__message--text">
                  you can improve everything.
                </div>
              </div>

              <div className="login__button" role="presentation" onClick={this.login}>
                <div className="login__button--logo">
                  <img src={GoogleIcon} alt="Google"/>
                </div>

                <div className="login__button--text">
                  Login with Google
                </div>
              </div>
            </div>

            <div className="content__video">
              <VideoPlayer/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
