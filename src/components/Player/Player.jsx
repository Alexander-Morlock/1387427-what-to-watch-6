import React, {useRef, useState} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import shapeOfMovie from '../../utils/shape-of-movie';
import {connect} from 'react-redux';
import {getAllMoviesThunk} from '../../store/api-actions';

const Player = (props) => {
  const location = useLocation();

  const {id} = useParams();

  const movie = props.movies.find((m) => m.id === +id);
  const movieTitle = movie.name;

  const history = useHistory();
  const closePlayer = () => location.search ? history.push(`/`) : history.push(`/films/${id}`);

  const videoRef = useRef();
  let togglerPosition = 0;
  if (videoRef.current) {
    togglerPosition = videoRef.current.currentTime / videoRef.current.duration * 100;
  }

  const getDuration = () => `${Math.floor((movie.run_time) / 60)}:${Math.floor(movie.run_time % 60)}:00`;
  const [buttonState, setButtonState] = useState({isStarted: false, isPlayback: false});

  const playButtonHandler = () => {
    setButtonState((prevState) => ({isStarted: true, isPlayback: !prevState.isPlayback}));
  };

  if (videoRef.current) {
    if (buttonState.isPlayback) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="player">
      <video ref={videoRef} src={movie.video_link} className="player__video" poster="img/player-poster.jpg"/>
      <button type="button" className="player__exit" onClick={closePlayer}>Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={togglerPosition} max={100} />
            <div className="player__toggler" style={{left: `${togglerPosition}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getDuration()}</div>
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
          <div className="player__name">{movieTitle}</div>
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
    shapeOfMovie()
).isRequired;


const mapStateToProps = (store) => ({
  movies: store.movies
});

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getAllMoviesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
