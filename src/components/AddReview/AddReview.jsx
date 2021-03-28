import React from 'react';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import shapeOfMovie from '../../utils/shape-of-movie';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm';
import {connect} from 'react-redux';
import shapeOfUser from '../../utils/shape-of-user';

const AddReview = (props) => {
  const {id} = useParams();
  const movie = props.movies.find((m) => m.id === +id);
  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.preview_image} alt={movie.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{movie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <div className="user-block" style={{position: `relative`}}>
            {
              props.user
                ? <div className="user-block__avatar">
                  <Link to="/mylist"><img src={props.user.avatar_url} alt="User avatar" width="63" height="63" /></Link>
                  <p style={{position: `absolute`, top: `3px`, right: `75px`, fontSize: `17px`}}>{props.user.email}</p>
                </div>
                : <div className="user-block">
                  <Link to="/login" className="user-block__link">Sign in</Link>
                </div>
            }
          </div>
        </header>
        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.poster_image} alt={movie.name} width={218} height={327} />
        </div>
      </div>
      <div className="add-review">
        <CommentForm />
      </div>
    </section>

  );
};

AddReview.propTypes = {
  "movies": PropTypes.arrayOf(
      shapeOfMovie()
  ).isRequired,
  "postReview": PropTypes.func,
  "user": shapeOfUser()
};

const mapStateToProps = (store) => ({
  movies: store.movies,
  user: store.user
});

const mapDispatchToProps = (dispatch) => ({
  postReview: () => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
