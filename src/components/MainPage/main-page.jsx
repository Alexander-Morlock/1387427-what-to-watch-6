import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MoviesByGenre from './MoviesByGenre/movies-by-genre';
import Loader from '../Loader/loader';
import MainPageHeader from './main-page-header';
import {getIsDataDownloaded} from '../../store/moviesReducer/selectors';

const MainPage = ({isDataDownloaded}) => {

  return (
    isDataDownloaded ?
      <div>
        <MainPageHeader />
        <MoviesByGenre />
      </div>
      : <Loader />
  );
};

MainPage.propTypes = {
  isDataDownloaded: PropTypes.bool
};

const mapStateToProps = (store) => ({
  isDataDownloaded: getIsDataDownloaded(store)
});

export default connect(mapStateToProps)(MainPage);
