import Footer from '../components/Footer.jsx';
import React from 'react';
import {render} from 'react-dom';

class AppContainer extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <h1>Play me a song, man in the computer.</h1>
        </div>
        <Footer />
      </div>
    );
  }
}

render(<AppContainer />, document.getElementById('app'));