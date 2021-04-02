import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {postReviewThunk} from '../../store/api-actions';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router';
const DEFAULT_RATING = 3;
const MAX_RATING = 10;
const MESSAGE_MIN_LENGTH = 50;
const MESSAGE_MAX_LENGTH = 400;
const ratingValues = new Array(MAX_RATING).fill(null).map((x, i) => i + 1);

const Form = (props) => {

  const history = useHistory();

  const [formData, setFormData] = useState({
    isSubmitted: false,
    isInvalidTextarea: false,
    comment: ``,
    rating: DEFAULT_RATING
  });

  const onClickHandler = (evt) => setFormData({...formData, rating: parseInt(evt.target.value, 10)});

  const onChangeTextarea = (evt) => {
    setFormData(
        {
          ...formData,
          comment: evt.target.value
        }
    );
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    if (formData.comment.length < MESSAGE_MIN_LENGTH || formData.comment.length > MESSAGE_MAX_LENGTH) {
      setFormData(
          {
            ...formData,
            isInvalidTextarea: true
          }
      );
    } else {
      setFormData(
          {
            ...formData,
            isSubmitted: true
          }
      );
      props.postReview(formData.rating, formData.comment, props.id);
    }
  };

  useEffect(() => {
    if (formData.isSubmitted && !props.isBlockedCommentForm) {
      history.push(`/films/${props.id}`);
    }

    if (formData.isInvalidTextarea
        && formData.comment.length >= MESSAGE_MIN_LENGTH
        && formData.comment.length <= MESSAGE_MAX_LENGTH) {
      setFormData(
          {
            ...formData,
            isInvalidTextarea: false
          }
      );
    }
  });

  return (
    <form action="#" className="add-review__form" onSubmit={onSubmitHandler}>
      <div className="rating">
        {
          formData.isInvalidTextarea &&
            <p style={{textAlign: `center`, color: `red`}}>
              Message must be {MESSAGE_MIN_LENGTH} - {MESSAGE_MAX_LENGTH} symbols, not more not less
            </p>
        }
        {
          props.isErrorCommentForm &&
            <p style={{textAlign: `center`, color: `red`}}>
              NETWORK ERROR
            </p>
        }
        <div className="rating__stars">
          {
            ratingValues.map((r) => <Fragment key={`rating-${r}`}>
              <input className="rating__input" id={`star-${r}`} type="radio" name="rating" value={r}
                onChange={onClickHandler}
                disabled={props.isBlockedCommentForm}
                checked={formData.rating === r}/>
              <label className="rating__label" htmlFor={`star-${r}`}>Rating {r}</label>
            </Fragment>)
          }
        </div>
      </div>
      <div className="add-review__text">
        <textarea className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={formData.comment}
          onChange = {onChangeTextarea}
          disabled={props.isBlockedCommentForm}
          style={{outline: formData.isInvalidTextarea ? `3px solid red` : ``}}
          maxLength={MESSAGE_MAX_LENGTH + 1}
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
  isBlockedCommentForm: store.REVIEW.isBlockedCommentForm,
  isErrorCommentForm: store.REVIEW.isErrorCommentForm

});

const mapDispatchToProps = (dispatch) => ({
  postReview: (rating, comment, id) => dispatch(postReviewThunk(rating, comment, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
