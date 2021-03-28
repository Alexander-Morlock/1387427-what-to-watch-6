import React from 'react';
import {Link} from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import PropTypes from 'prop-types';
import shapeOfMovie from '../../utils/shape-of-movie';
import shapeOfUser from '../../utils/shape-of-user';
import {connect} from 'react-redux';

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
        <div className="user-block">
          {
            props.user && <div className="user-block__avatar">
              <img src={props.user.avatar_url} alt="User avatar" width="63" height="63" />
            </div>
          }
        </div>
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
      shapeOfMovie()
  ).isRequired,
  "user": shapeOfUser()
};

const mapStateToProps = (store) => ({
  movies: store.myList,
  user: store.user
});

export default connect(mapStateToProps)(MyList);
