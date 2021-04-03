import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MoviesByGenre from './MoviesByGenre/MoviesByGenre';
import Loader from '../Loader/Loader';
import MainPageHeader from './MainPageHeader';
import {getIsDataDownloaded} from '../../store/moviesReducer/selectors';

const MainPage = (props) => {

  return (
    props.isDataDownloaded ?
      <div>
        <MainPageHeader />
        <MoviesByGenre />
      </div>
      : <Loader />
  );
};

MainPage.propTypes = {
  "logOut": PropTypes.func,
  "isDataDownloaded": PropTypes.bool
};

const mapStateToProps = (store) => ({
  isDataDownloaded: getIsDataDownloaded(store)
});

export default connect(mapStateToProps)(MainPage);
