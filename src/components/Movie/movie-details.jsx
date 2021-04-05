import React from 'react';
import PropTypes from 'prop-types';

const FilmDetails = ({movie}) => {
  const movieDuration = `${Math.floor(movie.run_time / 60)}h ${movie.run_time % 60}m`;
  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{movie.director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value" style={{whiteSpace: `pre-line`}}>{movie.starring.join(`, \n`)}</span>
        </p>
      </div>
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{movieDuration}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{movie.genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{movie.released}</span>
        </p>
      </div>
    </div>
  );
};

FilmDetails.propTypes = {
  "movie": PropTypes.shape({
    "director": PropTypes.string.isRequired,
    "starring": PropTypes.arrayOf(PropTypes.string).isRequired,
    "run_time": PropTypes.number.isRequired,
    "genre": PropTypes.string.isRequired,
    "released": PropTypes.number.isRequired,
  })
};


export default FilmDetails;
