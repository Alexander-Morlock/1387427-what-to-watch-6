import React from 'react';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import shapeOfMovie from '../../utils/shape-of-movie';
import {connect} from 'react-redux';
import {getAllMoviesThunk} from '../../store/api-actions';

const Player = (props) => {
  const {id} = useParams();

  const movie = props.movies.find((m) => m.id === +id);
  const movieTitle = movie.name;

  return (
    <div className="player">
      <video src="#" className="player__video" poster="img/player-poster.jpg" />
      <button type="button" className="player__exit">Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={30} max={100} />
            <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref="#play-s" />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{movieTitle}</div>
          <button type="button" className="player__full-screen">
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
