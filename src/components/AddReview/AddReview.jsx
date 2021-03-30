import React from 'react';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import getShapeOfMoviePropType from '../../utils/shape-of-movie';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm';
import {connect} from 'react-redux';
import UserAvatar from '../UserAvatar/UserAvatar';

const AddReview = (props) => {
  const {id} = useParams();
  const movie = props.movies.find((m) => m.id === parseInt(id, 10));
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
          <UserAvatar />
        </header>
        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.poster_image} alt={movie.name} width={218} height={327} />
        </div>
      </div>
      <div className="add-review">
        <CommentForm id={parseInt(id, 10)}/>
      </div>
    </section>

  );
};

AddReview.propTypes = {
  movies: PropTypes.arrayOf(
      getShapeOfMoviePropType()
  ).isRequired,
  postReview: PropTypes.func
};

const mapStateToProps = (store) => ({
  movies: store.movies
});

const mapDispatchToProps = (dispatch) => ({
  postReview: () => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
