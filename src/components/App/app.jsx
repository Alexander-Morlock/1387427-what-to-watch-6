import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../MainPage/main-page';

const App = (props) => <MainPage data={props.data} />;

App.propTypes = {
  data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        imgPath: PropTypes.string.isRequired,
        hrefPath: PropTypes.string.isRequired
      })
  ).isRequired
};

export default App;
