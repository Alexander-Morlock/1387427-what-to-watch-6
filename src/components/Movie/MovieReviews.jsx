import React from 'react';
import Review from './Review';
import PropTypes from 'prop-types';
import shapeOfComment from '../../utils/shape-of-comment';

const MovieReviews = ({comments = []}) => {
  const leftComments = comments.slice(0, Math.round(comments.length / 2));
  const rightComments = comments.slice(leftComments.length);
  const LeftColumn = () => {
    return (
      <div className="movie-card__reviews-col">
        {leftComments.map((comment) => <Review comment={comment} key={comment.id}/>)}
      </div>
    );
  };
  const RightColumn = () => {
    return (
      <div className="movie-card__reviews-col">
        {rightComments.map((comment) => <Review comment={comment} key={comment.id}/>)}
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

MovieReviews.propTypes = {
  comments: PropTypes.arrayOf(
      shapeOfComment()
  )
};

export default MovieReviews;
