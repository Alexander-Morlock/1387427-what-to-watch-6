import React from 'react';
import shapeOfComment from '../../utils/shape-of-comment';
import getMonthAsString from '../../utils/get-month-as-string';

const Review = (props) => {
  const date = props.comment.date.split(`T`)[0].split(`-`);
  const month = getMonthAsString(+date[1]);
  const dateString = `${month} ${date[2]}, ${date[0]}`;
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{props.comment.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{props.comment.user.name}</cite>
          <time className="review__date" dateTime={props.comment.date}>{dateString}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{props.comment.rating}</div>
    </div>
  );
};

Review.propTypes = {
  comment: shapeOfComment().isRequired
};

export default Review;
