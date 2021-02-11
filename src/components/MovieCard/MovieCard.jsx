import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const MovieCard = (props) => (
  <article className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image" data-id={props.id} onMouseOver={props.onMouseOver}>
      <img src={props.preview_image} alt={props.name} width="280" height="175"/>
    </div>
    <h3 className="small-movie-card__title">
      <Link className="small-movie-card__link" to={`/films/${props.id}`}>{props.name}</Link>
    </h3>
  </article>
);

MovieCard.propTypes = {
  "name": PropTypes.string.isRequired,
  "preview_image": PropTypes.string.isRequired,
  "id": PropTypes.number.isRequired,
  "onMouseOver": PropTypes.func
};

export default MovieCard;
