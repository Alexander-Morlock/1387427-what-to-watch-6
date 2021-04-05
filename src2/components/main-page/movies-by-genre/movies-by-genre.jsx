import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {shapeOfMovie} from '../../../utils/shape-of-movie';
import MovieList from '../../movie-list/movie-list';
import {connect} from 'react-redux';
import {ALL_GENRES} from '../../../utils/constants';
import {getGenres, getMovies} from '../../../store/movies-reducer/selectors';

const MAX_COUNT_OF_GENRES = 9;

const ShowMoviesByGenre = ({movies, genres}) => {
  const [selectedGenre, setSelectedGenre] = useState(genres[0] || ALL_GENRES);

  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <ul className="catalog__genres-list">
          {
            genres.map((g, i) => i <= MAX_COUNT_OF_GENRES && <li key={`genre ${g}`}
              onClick={(evt) => setSelectedGenre(evt.target.innerText)}
              className={`catalog__genres-item ${selectedGenre === g && `catalog__genres-item--active`}`}>
              <Link to="#" className="catalog__genres-link">{g}</Link>
            </li>)
          }
        </ul>

        <MovieList movies={selectedGenre === ALL_GENRES
          ? movies
          : movies.filter((f) => f.genre.toLowerCase() === selectedGenre.toLowerCase())} />

      </section>
      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

ShowMoviesByGenre.propTypes = {
  movies: PropTypes.arrayOf(
      shapeOfMovie
  ).isRequired,
  genres: PropTypes.arrayOf(
      PropTypes.string
  ).isRequired
};

const mapStateToProps = (store) => ({
  movies: getMovies(store),
  genres: getGenres(store)
});

export default connect(mapStateToProps)(ShowMoviesByGenre);
