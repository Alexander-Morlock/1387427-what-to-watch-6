import React from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';

const EmbededVideoPlayer = (props) => {
  return (
    <video {...props}
      src={props.src}
      poster={props.poster}
      muted autoPlay
      onMouseOut={props.onMouseOutCallback}>
    </video>
  );
};

EmbededVideoPlayer.propTypes = {
  "src": PropTypes.string.isRequired,
  "poster": PropTypes.string.isRequired,
  "onMouseOutCallback": PropTypes.func.isRequired
};

export default EmbededVideoPlayer;
