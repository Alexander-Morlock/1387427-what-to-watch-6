import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import EmbededVideoPlayer from '../EmbededVideoPlayer/EmbededVideoPlayer';
const TIMEOUT = 1000;

const MovieCard = (props) => {
  const timer = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnterHandler = (evt) => {
    props.onMouseOver(evt);
    timer.current = setTimeout(() => {
      setIsHovered(true);
    }, TIMEOUT);
  };

  const onMouseLeaveHandler = () => {
    clearTimeout(timer.current);
    timer.current = null;
    setIsHovered(false);
  };

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={onMouseEnterHandler}
    onMouseLeave={onMouseLeaveHandler}>
    {isHovered && timer.current
      ? <EmbededVideoPlayer
        src={props.preview_video_link}
        poster={props.poster_image}
        width="280" height="175" />
      : <>
        <div className="small-movie-card__image" data-id={props.id}>
          <img src={props.preview_image} alt={props.name} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <Link className="small-movie-card__link" to={`/films/${props.id}`}>{props.name}</Link>
        </h3>
      </>}
  </article>;
};

MovieCard.propTypes = {
  "name": PropTypes.string.isRequired,
  "preview_image": PropTypes.string.isRequired,
  "id": PropTypes.number.isRequired,
  "poster_image": PropTypes.string.isRequired,
  "preview_video_link": PropTypes.string.isRequired,
  "onMouseOver": PropTypes.func
};

export default MovieCard;
