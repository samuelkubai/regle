import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './views/App';
import * as serviceWorker from './serviceWorker';

ReactGA.initialize('UA-134594472-1');
ReactGA.pageview('/');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
