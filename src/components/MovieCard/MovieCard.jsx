import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = (props) => (
  <article className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image">
      <img src={props.movie.imgPath} alt={props.movie.title} width="280" height="175" />
    </div>
    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link" href={props.movie.hrefPath}>{props.movie.title}</a>
    </h3>
  </article>
);

MovieCard.propTypes = {
  movie: PropTypes.shape(
      {
        title: PropTypes.string.isRequired,
        imgPath: PropTypes.string.isRequired,
        hrefPath: PropTypes.string.isRequired
      }
  ).isRequired
};

export default MovieCard;
