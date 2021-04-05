import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MoviesByGenre from './movies-by-genre/movies-by-genre';
import Loader from '../loader/loader';
import MainPageHeader from './main-page-header';
import {getIsDataDownloaded} from '../../store/movies-reducer/selectors';

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
