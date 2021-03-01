import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import EmbededVideoPlayer from '../EmbededVideoPlayer/EmbededVideoPlayer';

const MovieCard = (props) => {
  const [isShowVideoPreview, setToggleVideoPreview] = useState(false);
  let timer = null;

  const onMouseOverHandler = (evt) => {
    props.onMouseOver(evt);
    timer = window.setTimeout(() => {
      if (!isShowVideoPreview) {
        setToggleVideoPreview(true);
      }
    }, 1000);
  };

  const onMouseOutHandler = () => {
    window.clearTimeout(timer);
    setToggleVideoPreview(false);
  };

  return isShowVideoPreview
    ? <article className="small-movie-card catalog__movies-card">
      <EmbededVideoPlayer
        src={props.preview_video_link}
        poster={props.poster_image}
        width="280" height="175"
        onMouseOutCallback={onMouseOutHandler} />
    </article>
    : <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image" data-id={props.id} onMouseOver={onMouseOverHandler}>
        <img src={props.preview_image} alt={props.name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${props.id}`}>{props.name}</Link>
      </h3>
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
