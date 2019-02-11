import React, { Component } from 'react';
import Auth from '../../lib/auth';

export default function(ComposedComponent) {
  class Authenticate extends Component {
    state = {
      user: null,
      isLoaded: false
    };

    componentDidMount() {
      const user = Auth.verifyToken();

      if (!user) {
        window.location.replace(`${window.location.origin}`);
        return;
      }

      this.setState(state => { return {...state, user, isLoaded: true} });
    }

    render() {
      const { isLoaded, user } = this.state;
      return isLoaded ? <ComposedComponent {...{...this.props, user}} /> : null;
    }
  }

  return Authenticate;
}
