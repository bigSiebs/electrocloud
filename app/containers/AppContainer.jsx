import React from 'react';
import {render} from 'react-dom';

import App from '../components/App.jsx';

class AppContainer extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

render(<AppContainer />, document.getElementById('app'));