import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import EmbededVideoPlayer from '../embeded-video-player/embeded-video-player';
const TIMEOUT = 1000;

const MovieCard = (props) => {
  const timer = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnterHandler = () => {
    timer.current = setTimeout(() => {
      setIsHovered(true);
    }, TIMEOUT);
  };

  const onMouseLeaveHandler = () => {
    clearTimeout(timer.current);
    timer.current = null;
    setIsHovered(false);
  };

  useEffect(() => {
    return onMouseLeaveHandler;
  }, []);

  const history = useHistory();

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={onMouseEnterHandler}
    onMouseLeave={onMouseLeaveHandler}>
    {
      isHovered && timer.current
        ? <EmbededVideoPlayer
          src={props.previewVideoLink}
          poster={props.posterImage}
          width="280" height="175" />
        : <>
          <div className="small-movie-card__image"
            style={{cursor: `pointer`}}
            onClick={() => history.push(`/films/${props.id}`)}>
            <img
              src={props.previewImage}
              alt={props.name}
              width="280"
              height="175" />
          </div>
          <h3 className="small-movie-card__title">
            <Link className="small-movie-card__link" to={`/films/${props.id}`}>{props.name}</Link>
          </h3>
        </>
    }
  </article>;
};

MovieCard.propTypes = {
  name: PropTypes.string,
  previewImage: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  posterImage: PropTypes.string,
  previewVideoLink: PropTypes.string,
  onMouseOver: PropTypes.func,
  removeMovieFromFavorites: PropTypes.func
};

export default MovieCard;
