import React from 'react';
import PropTypes from 'prop-types';

const MovieOverView = ({movie}) => {
  return (
    <div className="movie-card__text">
      <p>{movie.description}</p>
      <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>
      <p className="movie-card__starring"><strong>Starring: {movie.starring.join(`, `)} and other</strong></p>
    </div>
  );
};

MovieOverView.propTypes = {
  movie: PropTypes.shape({
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

export default MovieOverView;
