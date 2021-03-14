import React from 'react';
import PropTypes from 'prop-types';

const FilmOverView = (props) => {
  return (
    <div className="movie-card__text">
      <p>{props.movie.description}</p>
      <p className="movie-card__director"><strong>Director: {props.movie.director}</strong></p>
      <p className="movie-card__starring"><strong>Starring: {props.movie.starring.join(`, `)} and other</strong></p>
    </div>
  );
};

FilmOverView.propTypes = {
  movie: PropTypes.shape({
    "description": PropTypes.string.isRequired,
    "director": PropTypes.string.isRequired,
    "starring": PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

export default FilmOverView;
