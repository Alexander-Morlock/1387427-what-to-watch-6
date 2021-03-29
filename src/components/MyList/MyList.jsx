import React from 'react';
import {Link} from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import PropTypes from 'prop-types';
import getShapeOfMoviePropType from '../../utils/shape-of-movie';
import {connect} from 'react-redux';
import UserAvatar from '../UserAvatar/UserAvatar';

const MyList = (props) => {
  return (
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

        <MovieList movies={props.movies}/>

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
    </div>
  );
};

MyList.propTypes = {
  "movies": PropTypes.arrayOf(
      getShapeOfMoviePropType()
  ).isRequired
};

const mapStateToProps = (store) => ({
  movies: store.myList
});

export default connect(mapStateToProps)(MyList);
