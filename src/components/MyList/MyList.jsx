import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import PropTypes from 'prop-types';
import shapeOfMovie from '../../utils/shape-of-movie';
import {connect} from 'react-redux';
import UserAvatar from '../UserAvatar/UserAvatar';
import {getFavoriteMoviesThunk, removeMovieFromFavoritesThunk} from '../../store/api-actions';

let isMyListDownloaded = false;

const MyList = (props) => {

  useEffect(() => {
    props.getFavoriteMovies();
    isMyListDownloaded = true;
  }, []);

  return (isMyListDownloaded ?
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <h1 className="page-title user-page__title">My list</h1>
        <UserAvatar />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MovieList movies={props.movies} removeMovieFromFavorites={props.removeMovieFromFavorites}/>

      </section>
      <footer className="page-footer">
        <div className="logo">
          <Link to="/" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div> : <></>
  );
};

MyList.propTypes = {
  "movies": PropTypes.arrayOf(
      shapeOfMovie()
  ).isRequired,
  "getFavoriteMovies": PropTypes.func,
  "removeMovieFromFavorites": PropTypes.func
};

const mapStateToProps = (store) => ({
  movies: store.FAVORITE.myList
});

const mapDispatchToProps = (dispatch) => ({
  getFavoriteMovies: () => dispatch(getFavoriteMoviesThunk()),
  removeMovieFromFavorites: (id) => dispatch(removeMovieFromFavoritesThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
