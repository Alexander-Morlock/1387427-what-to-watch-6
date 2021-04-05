import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import EmbededVideoPlayer from '../EmbededVideoPlayer/embeded-video-player';
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
    style={{position: `relative`}}
    onMouseEnter={onMouseEnterHandler}
    onMouseLeave={onMouseLeaveHandler}>
    {
      isHovered && timer.current
        ? <EmbededVideoPlayer
          src={props.preview_video_link}
          poster={props.poster_image}
          width="280" height="175" />
        : <>
          <div className="small-movie-card__image"
            style={{cursor: `pointer`}}
            onClick={() => history.push(`/films/${props.id}`)}>
            <img
              src={props.preview_image}
              alt={props.name}
              width="280"
              height="175" />
          </div>
          <h3 className="small-movie-card__title">
            <Link className="small-movie-card__link" to={`/films/${props.id}`}>{props.name}</Link>
          </h3>
        </>
    }
    {
      props.removeMovieFromFavorites
        && <button
          style={{fontSize: `7px`,
            position: `absolute`,
            top: `4px`,
            right: `4px`,
            zIndex: `1`,
            backgroundColor: `rgba(0, 0, 0, 0.5)`,
            border: `none`,
            borderRadius: `50%`,
            width: `15px`,
            height: `15px`,
            color: `#fff`,
            padding: `0`
          }}
          onClick={() => props.removeMovieFromFavorites(props.id)}>X</button>
    }
  </article>;
};

MovieCard.propTypes = {
  "name": PropTypes.string,
  "preview_image": PropTypes.string,
  "id": PropTypes.number.isRequired,
  "poster_image": PropTypes.string,
  "preview_video_link": PropTypes.string,
  "onMouseOver": PropTypes.func,
  "removeMovieFromFavorites": PropTypes.func
};

export default MovieCard;
