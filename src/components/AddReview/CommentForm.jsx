import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {postReviewThunk} from '../../store/api-actions';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router';
const MAX_RATING = 10;
const DEFAULT_RATING = 3;

const Form = (props) => {

  const history = useHistory();

  const [formData, setFormData] = useState({
    isSubmitted: false,
    isInvalidTextarea: false,
    comment: ``,
    rating: DEFAULT_RATING
  });

  const handleTextareaChange = (evt) => {
    setFormData(
        {
          ...formData,
          comment: evt.target.value
        }
    );
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    if (formData.comment.length < 50 || formData.comment.length > 400) {
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
        && formData.comment.length >= 50
        && formData.comment.length <= 400) {
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
              Message must be 50 - 400 symbols, not more not less
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
            new Array(MAX_RATING).fill(true).map((e, i) => <>
              <input
                key={`star-${i + 1}`}
                className="rating__input"
                id={`star-${i + 1}`}
                type="radio"
                name="rating"
                defaultValue={i + 1}
                defaultChecked={i + 1 === formData.rating}
                onClick={() => setFormData({...formData, rating: i + 1})}
                disabled={props.isBlockedCommentForm}
              />
              <label className="rating__label" htmlFor={`star-${i + 1}`}>Rating {i + 1}</label>
            </>)
          }
        </div>
      </div>
      <div className="add-review__text">
        <textarea className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={formData.comment}
          onChange = {handleTextareaChange}
          disabled={props.isBlockedCommentForm}
          style={{outline: formData.isInvalidTextarea ? `3px solid red` : ``}}
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
