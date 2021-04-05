import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MovieList from '../movie-list/movie-list';

const MoreLikeThis = ({movies}) => {
  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <MovieList movies={movies}/>
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

MoreLikeThis.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired.isRequired,
        id: PropTypes.number.isRequired,
        onMouseOver: PropTypes.func,
        previewVideoLink: PropTypes.string.isRequired,
        posterImage: PropTypes.string.isRequired
      })
  ).isRequired
};

export default MoreLikeThis;
