import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {postReviewThunk} from '../../store/api-actions';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router';
import {getIsBlockedCommentForm, getIsErrorCommentForm} from '../../store/reviewReducer/selectors';
const DEFAULT_RATING = 3;
const MAX_RATING = 10;
const MessageLength = {
  MIN: 50,
  MAX: 400
};
const ratingValues = new Array(MAX_RATING).fill(null).map((x, i) => i + 1);

const Form = ({postReview, isBlockedCommentForm, isErrorCommentForm, id}) => {

  const history = useHistory();

  const [formData, setFormData] = useState({
    isSubmitted: false,
    isInvalidTextarea: false,
    comment: ``,
    rating: DEFAULT_RATING
  });

  const onClickHandler = (evt) => setFormData({...formData, rating: Number(evt.target.value)});

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

    if (formData.comment.length < MessageLength.MIN || formData.comment.length > MessageLength.MAX) {
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
      postReview(formData.rating, formData.comment, id);
    }
  };

  useEffect(() => {

    if (formData.isInvalidTextarea
        && formData.comment.length >= MessageLength.MIN
        && formData.comment.length <= MessageLength.MAX) {
      setFormData(
          {
            ...formData,
            isInvalidTextarea: false
          }
      );
    }
  });

  useEffect(() => {
    if (formData.isSubmitted && !isBlockedCommentForm && !isErrorCommentForm) {
      history.push(`/films/${id}`);
    }
  }, [isBlockedCommentForm, isErrorCommentForm]);

  return (
    <form action="#" className="add-review__form" onSubmit={onSubmitHandler}>
      <div className="rating">
        {
          formData.isInvalidTextarea &&
            <p style={{textAlign: `center`, color: `red`}}>
              Message must be {MessageLength.MIN} - {MessageLength.MAX} symbols, not more not less
            </p>
        }
        {
          isErrorCommentForm &&
            <p style={{textAlign: `center`, color: `red`}}>
              NETWORK ERROR
            </p>
        }
        <div className="rating__stars">
          {
            ratingValues.map((r) => <Fragment key={`rating-${r}`}>
              <input className="rating__input" id={`star-${r}`} type="radio" name="rating" value={r}
                onChange={onClickHandler}
                disabled={isBlockedCommentForm}
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
          disabled={isBlockedCommentForm}
          style={{outline: formData.isInvalidTextarea ? `3px solid red` : ``}}
          maxLength={MessageLength.MAX + 1}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={isBlockedCommentForm}>Post</button>
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
  isBlockedCommentForm: getIsBlockedCommentForm(store),
  isErrorCommentForm: getIsErrorCommentForm(store)

});

const mapDispatchToProps = (dispatch) => ({
  postReview: (rating, comment, id) => dispatch(postReviewThunk(rating, comment, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
