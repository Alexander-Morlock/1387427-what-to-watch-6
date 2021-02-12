import React from 'react';
import Review from './Review';
import PropTypes from 'prop-types';
import shapeOfComment from '../../utils/shape-of-comment';

const FilmReviews = ({comments}) => {
  const leftComments = comments.slice(0, Math.round(comments.length / 2));
  const rightComments = comments.slice(leftComments.length);
  const LeftColumn = () => {
    return (
      <div className="movie-card__reviews-col">
        {leftComments.map((comment, i) => <Review comment={comment} key={`L${i}`}/>)}
      </div>
    );
  };
  const RightColumn = () => {
    return (
      <div className="movie-card__reviews-col">
        {rightComments.map((comment, i) => <Review comment={comment} key={`R${i}`}/>)}
      </div>
    );
  };

  return (
    <div className="movie-card__reviews movie-card__row">
      <LeftColumn />
      <RightColumn />
    </div>
  );
};

FilmReviews.propTypes = {
  comments: PropTypes.arrayOf(
      shapeOfComment()
  ).isRequired
};

export default FilmReviews;
