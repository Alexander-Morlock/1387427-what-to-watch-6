import React, {useState} from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';

const EmbededVideoPlayer = (props) => {
  const [isMuted, toggleIsMuted] = useState(true);
  return (
    <video {...props} src={props.src} poster={props.poster} muted={isMuted} autoPlay onMouseOut={props.onMouseOut}>
    </video>
  );

};

EmbededVideoPlayer.propTypes = {
  "src": PropTypes.string.isRequired,
  "poster": PropTypes.string.isRequired,
  "onMouseOut": PropTypes.func.isRequired
};

export default EmbededVideoPlayer;
