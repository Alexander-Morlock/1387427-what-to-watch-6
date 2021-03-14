import React from 'react';
import PropTypes from 'prop-types';

const ShowMoreButton = (props) => {
  return (
    <div className="catalog__more">
      <button className="catalog__button"
        type="button"
        onClick={props.onClick}>Show more</button>
    </div>
  );
};

ShowMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ShowMoreButton;
