import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import shapeOfFilm from '../../../utils/shape-of-film';
import MovieList from '../../MovieList/MovieList';
import {connect} from 'react-redux';

const Genres = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`
];

const ShowMoviesByGenre = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(`All genres`);

  return (
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <ul className="catalog__genres-list">
          {
            props.genres.map((g, i) => <li key={`genre ${i}`}
              onClick={(evt) => setSelectedGenre(evt.target.innerText)}
              className={`catalog__genres-item ${selectedGenre === g && `catalog__genres-item--active`}`}>
              <Link to="#" className="catalog__genres-link">{g}</Link>
            </li>)
          }
        </ul>

        <MovieList films={selectedGenre === `All genres`
          ? props.films
          : props.films.filter((f) => f.genre.toLowerCase() === selectedGenre.toLowerCase())} />

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
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

ShowMoviesByGenre.propTypes = PropTypes.arrayOf(
    shapeOfFilm()
).isRequired;


const mapStateToProps = (store) => ({
  films: store.films, genres: store.genres
});

export default connect(mapStateToProps)(ShowMoviesByGenre);
