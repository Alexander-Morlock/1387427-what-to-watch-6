import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import shapeOfMovie from '../../utils/shape-of-movie';
import {Link} from 'react-router-dom';
import MovieOverView from './MovieOverView';
import MovieDetails from './MovieDetails';
import MovieReviews from './MovieReviews';
import MoreLikeThis from './MoreLikeThis';
import {getCommentsThunk} from '../../store/api-actions';
import {connect} from 'react-redux';
import shapeOfComment from '../../utils/shape-of-comment';
import {ActionCreator} from '../../store/action';
import {AuthorizationStatus, MovieRating, MovieTabs} from '../../utils/constants';
import UserAvatar from '../UserAvatar/UserAvatar';

let movie = {};

const Movie = (props) => {
  const history = useHistory();
  const [state, setState] = useState(MovieTabs.OVERVIEW);
  const showActiveClassNameIf = (text) => state === text ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`;
  const handleClick = (evt) => setState(evt.target.innerText);

  const {id} = useParams();
  movie = props.movies.find((m) => m.id === parseInt(id, 10));
  if (!movie) {
    history.push(`/404`);
    return true;
  }
  const sameMovies = props.movies.filter((m) => m.genre === movie.genre && m.id !== movie.id);

  const openPlayer = () => history.push(`/player/${id}`);

  useEffect(() => {
    props.getComment(movie.id);
    if (state !== MovieTabs.OVERVIEW) {
      setState(MovieTabs.OVERVIEW);
    }
  }, [id]);

  let ratingText = MovieRating.BAD;
  if (movie.rating >= 3 && movie.rating < 5) {
    ratingText = MovieRating.NORMAL;
  }
  if (movie.rating >= 5 && movie.rating < 8) {
    ratingText = MovieRating.GOOD;
  }
  if (movie.rating >= 8 && movie.rating < 10) {
    ratingText = MovieRating.VERY_GOOD;
  }
  if (movie.rating >= 10) {
    ratingText = MovieRating.AWESOME;
  }


  const MovieInfo = () => {
    switch (state) {
      case MovieTabs.DETAILS: {
        return <MovieDetails movie={movie} />;
      }
      case MovieTabs.REVIEWS: {
        return <MovieReviews comments={props.comments} />;
      }
      default: {
        return <MovieOverView movie={movie} />;
      }
    }
  };

  return (
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.background_image} alt={movie.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>
            <UserAvatar />
          </header>
          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
              </p>
              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={openPlayer}>
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={props.addMovieToMyList}>
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
                {
                  props.authorizationStatus === AuthorizationStatus.AUTH
                  && <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={movie.poster_image} alt={movie.name} width={218} height={327} />
            </div>
            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className={showActiveClassNameIf(MovieTabs.OVERVIEW)}>
                    <Link to="#" className="movie-nav__link" onClick={handleClick}>Overview</Link>
                  </li>
                  <li className={showActiveClassNameIf(`Details`)}>
                    <Link to="#" className="movie-nav__link" onClick={handleClick}>Details</Link>
                  </li>
                  <li className={showActiveClassNameIf(MovieTabs.REVIEWS)}>
                    <Link to="#" className="movie-nav__link" onClick={handleClick}>Reviews</Link>
                  </li>
                </ul>
              </nav>
              <div className="movie-rating">
                <div className="movie-rating__score">{movie.rating}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">{ratingText}</span>
                  <span className="movie-rating__count">{movie.scores_count} ratings</span>
                </p>
              </div>
              <MovieInfo />
            </div>
          </div>
        </div>
      </section>
      <MoreLikeThis movies={sameMovies} />
    </>
  );
};

Movie.propTypes = {
  "movies": PropTypes.arrayOf(
      shapeOfMovie()).isRequired,
  "getComment": PropTypes.func,
  "getSameMovies": PropTypes.func,
  "comments": PropTypes.arrayOf(
      shapeOfComment()
  ),
  "addMovieToMyList": PropTypes.func,
  "authorizationStatus": PropTypes.string
};

const mapStateToProps = (store) => ({
  comments: store.comments,
  movies: store.movies,
  authorizationStatus: store.authorizationStatus
});

const mapDispatchToProps = (dispatch) => ({
  getComment: (id) => dispatch(getCommentsThunk(id)),
  addMovieToMyList: () => dispatch(ActionCreator.addMovieToMyList(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
