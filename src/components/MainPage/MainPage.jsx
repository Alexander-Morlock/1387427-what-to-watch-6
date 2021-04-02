import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logOutThunk} from '../../store/api-actions';
import MoviesByGenre from './MoviesByGenre/MoviesByGenre';
import Loader from '../Loader/Loader';
import MainPageHeader from './MainPageHeader';

const MainPage = (props) => {

  return (
    props.isDataDownloaded ?
      <div>
        <MainPageHeader />
        <MoviesByGenre />
        <a href="#" onClick={() => props.logOut()}>Log out</a>
      </div>
      : <Loader />
  );
};

MainPage.propTypes = {
  "logOut": PropTypes.func,
  "isDataDownloaded": PropTypes.bool
};

const mapStateToProps = (store) => ({
  isDataDownloaded: store.MOVIES.isDataDownloaded
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOutThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
