import React, {useEffect, useRef, useState} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {shapeOfMovie} from '../../utils/shape-of-movie';
import {connect} from 'react-redux';
import {getAllMoviesThunk} from '../../store/api-actions';
import {getMovies} from '../../store/moviesReducer/selectors';

const Player = ({movies}) => {
  const {id} = useParams();
  const location = useLocation();

  const movie = movies.find((m) => m.id === +id);

  const history = useHistory();
  const closePlayer = () => location.search
    ? history.push(`/`)
    : history.push(`/films/${id}`);

  const videoRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  let togglerPosition = 0;

  const getTimeLeft = () => {
    const seconds = Math.floor(movie.runTime * 60 - currentTime);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);

    return `${hours}:${minutes - hours * 60}:${seconds - minutes * 60}${currentTime === 0 ? `0` : ``}`;
  };

  const [buttonState, setButtonState] = useState({isStarted: false, isPlayback: false});

  const playButtonHandler = () => {
    setButtonState((prevState) => ({isStarted: true, isPlayback: !prevState.isPlayback}));
  };

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  if (videoRef.current) {
    togglerPosition = currentTime / videoRef.current.duration * 100;

    if (buttonState.isPlayback) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(videoRef.current.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="player">
      <video ref={videoRef} src={movie.videoLink} className="player__video" poster="img/player-poster.jpg"/>
      <button type="button" className="player__exit" onClick={closePlayer}>Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={togglerPosition} max={100} />
            <div className="player__toggler" style={{left: `${togglerPosition}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeLeft()}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={playButtonHandler}>
            {
              !buttonState.isPlayback || !buttonState.isStarted
                ? <svg viewBox="0 0 19 19" width={19} height={19}>
                  <use xlinkHref="#play-s" />
                </svg>
                : <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
            }
            <span>Play</span>
          </button>
          <div className="player__name">{movie.name}</div>
          <button type="button" className="player__full-screen" onClick={toggleFullScreen}>
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = PropTypes.arrayOf(
    shapeOfMovie
).isRequired;


const mapStateToProps = (store) => ({
  movies: getMovies(store)
});

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getAllMoviesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
