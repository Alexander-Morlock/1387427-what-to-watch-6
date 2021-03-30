import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {postReviewThunk} from '../../store/api-actions';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router';

const Form = (props) => {
  const ratingRef = useRef();
  const textareaRef = useRef();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isSubmitted && !props.isBlockedCommentForm) {
      history.push(`/films/${props.id}`);
    }

    if (props.isBlockedCommentForm) {
      textareaRef.current.disabled = true;
      Array.from(ratingRef.current.children)
        .forEach((input) => {
          input.disabled = true;
        });
    }
  });

  const [comment, setComment] = useState(``);
  const [isInvalidTextarea, setIsInvalidTextarea] = useState(false);

  const handleTextareaChange = (evt) => {
    if (evt.target.value.length >= 50 && evt.target.value.length <= 400) {
      setIsInvalidTextarea(false);
    }
    setComment(evt.target.value);
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    if (comment.length < 50 || comment.length > 400) {
      setIsInvalidTextarea(true);
    } else {
      const rating = Array.from(ratingRef.current.children)
      .find((input) => input.checked).value;

      setIsSubmitted(true);
      props.postReview(rating, comment, props.id);
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={onSubmitHandler}>
      <div className="rating">
        {
          isInvalidTextarea && <p style={{textAlign: `center`, color: `red`}}>Message must be 50 - 400 symbols, not more not less</p>
        }
        {
          props.isErrorCommentForm && <p style={{textAlign: `center`, color: `red`}}>NETWORK ERROR</p>
        }
        <div className="rating__stars" ref={ratingRef}>
          <input className="rating__input" id="star-1" type="radio" name="rating" defaultValue={1} />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
          <input className="rating__input" id="star-2" type="radio" name="rating" defaultValue={2} />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>
          <input className="rating__input" id="star-3" type="radio" name="rating" defaultValue={3} defaultChecked />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>
          <input className="rating__input" id="star-4" type="radio" name="rating" defaultValue={4} />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>
          <input className="rating__input" id="star-5" type="radio" name="rating" defaultValue={5} />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>
          <input className="rating__input" id="star-6" type="radio" name="rating" defaultValue={6} />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>
          <input className="rating__input" id="star-7" type="radio" name="rating" defaultValue={7} />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>
          <input className="rating__input" id="star-8" type="radio" name="rating" defaultValue={8} />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>
          <input className="rating__input" id="star-9" type="radio" name="rating" defaultValue={9} />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>
          <input className="rating__input" id="star-10" type="radio" name="rating" defaultValue={10} />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>
        </div>
      </div>
      <div className="add-review__text">
        <textarea className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={comment}
          onChange = {handleTextareaChange}
          ref={textareaRef}
          style={{outline: isInvalidTextarea ? `3px solid red` : ``}}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={props.isBlockedCommentForm}>Post</button>
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  postReview: PropTypes.func,
  isBlockedCommentForm: PropTypes.bool,
  isErrorCommentForm: PropTypes.bool,
  id: PropTypes.number
};

const mapStateToProps = (store) => ({
  isBlockedCommentForm: store.isBlockedCommentForm,
  isErrorCommentForm: store.isErrorCommentForm

});

const mapDispatchToProps = (dispatch) => ({
  postReview: (rating, comment, id) => dispatch(postReviewThunk(rating, comment, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
