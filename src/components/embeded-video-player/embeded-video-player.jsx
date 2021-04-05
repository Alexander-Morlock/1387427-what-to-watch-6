import React from 'react';
import PropTypes from 'prop-types';

const EmbededVideoPlayer = (props) => {
  return (
    <video {...props}
      src={props.src}
      poster={props.poster}
      muted autoPlay>
    </video>
  );
};

EmbededVideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
};

export default EmbededVideoPlayer;
