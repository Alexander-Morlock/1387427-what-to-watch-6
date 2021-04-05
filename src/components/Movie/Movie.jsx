import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {shapeOfMovie} from '../../utils/shape-of-movie';
import {Link} from 'react-router-dom';
import MovieOverView from './movie-over-view';
import MovieDetails from './movie-details';
import MovieReviews from './movie-reviews';
import MoreLikeThis from './more-like-this';
import {getCommentsThunk, removeMovieFromFavoritesThunk, setFavoriteMovieThunk} from '../../store/api-actions';
import {connect} from 'react-redux';
import {shapeOfComment} from '../../utils/shape-of-comment';
import {AuthorizationStatus, MovieRating, MovieTabs} from '../../utils/constants';
import UserAvatar from '../user-avatar/user-avatar';
import {getAuthorizationStatus} from '../../store/authorization-reducer/selectors';
import {getComments, getIsDataDownloaded, getMovies} from '../../store/movies-reducer/selectors';
import Loader from '../loader/loader';

let movie = {};
let authStatus = null;

const Movie = ({
  movies,
  getComment,
  comments,
  addMovieToMyList,
  removeMovieFromFavorites,
  authorizationStatus,
  isDataDownloaded}) => {
  authStatus = authorizationStatus;
  const history = useHistory();
  const [tabsState, setTabsState] = useState(MovieTabs.OVERVIEW);

  const showActiveClassNameIf = (text) => tabsState === text
    ? `movie-nav__item movie-nav__item--active`
    : `movie-nav__item`;

  const handleClick = (evt) => setTabsState(evt.target.innerText);

  const {id} = useParams();
  movie = movies.find((m) => m.id === Number(id));
  if (!movie) {
    history.push(`/404`);
    return null;
  }
  const sameMovies = movies.filter((m) => m.genre === movie.genre && m.id !== movie.id);

  const openPlayer = () => history.push(`/player/${id}`);

  useEffect(() => {
    getComment(movie.id);
    if (tabsState !== MovieTabs.OVERVIEW) {
      setTabsState(MovieTabs.OVERVIEW);
    }
  }, [id]);

  let ratingText = MovieRating.BAD.title;
  if (movie.rating >= MovieRating.NORMAL.value
      && movie.rating < MovieRating.GOOD.value) {
    ratingText = MovieRating.NORMAL.title;
  }
  if (movie.rating >= MovieRating.GOOD.value
      && movie.rating < MovieRating.VERY_GOOD.value) {
    ratingText = MovieRating.GOOD.title;
  }
  if (movie.rating >= MovieRating.VERY_GOOD.value
      && movie.rating < MovieRating.AWESOME.value) {
    ratingText = MovieRating.VERY_GOOD.title;
  }
  if (movie.rating >= MovieRating.AWESOME.value) {
    ratingText = MovieRating.AWESOME.title;
  }


  const MovieInfo = () => {
    switch (tabsState) {
      case MovieTabs.DETAILS: {
        return <MovieDetails movie={movie} />;
      }
      case MovieTabs.REVIEWS: {
        return <MovieReviews comments={comments} />;
      }
      default: {
        return <MovieOverView movie={movie} />;
      }
    }
  };

  return (isDataDownloaded ?
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
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
                {
                  !movie.isFavorite
                    ? <button className="btn btn--list movie-card__button" type="button" onClick={addMovieToMyList}>
                      <svg viewBox="0 0 19 20" width={19} height={20}>
                        <use xlinkHref="#add" />
                      </svg>
                      <span>My list</span>
                    </button>
                    : <button className="btn btn--list movie-card__button" type="button" onClick={removeMovieFromFavorites}>
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                }
                {
                  authorizationStatus === AuthorizationStatus.AUTH
                  && <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={movie.posterImage} alt={movie.name} width={218} height={327} />
            </div>
            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className={showActiveClassNameIf(MovieTabs.OVERVIEW)}>
                    <Link to="#" className="movie-nav__link" onClick={handleClick}>Overview</Link>
                  </li>
                  <li className={showActiveClassNameIf(MovieTabs.DETAILS)}>
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
                  <span className="movie-rating__count">{movie.scoresCount} ratings</span>
                </p>
              </div>
              <MovieInfo />
            </div>
          </div>
        </div>
      </section>
      <MoreLikeThis movies={sameMovies} />
    </> : <Loader />
  );
};

Movie.propTypes = {
  movies: PropTypes.arrayOf(
      shapeOfMovie).isRequired,
  getComment: PropTypes.func,
  comments: PropTypes.arrayOf(
      shapeOfComment
  ),
  addMovieToMyList: PropTypes.func,
  removeMovieFromFavorites: PropTypes.func,
  authorizationStatus: PropTypes.string,
  isDataDownloaded: PropTypes.bool
};

const mapStateToProps = (store) => ({
  comments: getComments(store),
  movies: getMovies(store),
  authorizationStatus: getAuthorizationStatus(store),
  isDataDownloaded: getIsDataDownloaded(store)
});

const mapDispatchToProps = (dispatch) => ({
  getComment: (id) => dispatch(getCommentsThunk(id)),
  addMovieToMyList: () => {
    if (authStatus === AuthorizationStatus.AUTH) {
      dispatch(setFavoriteMovieThunk(movie.id));
    }
  },
  removeMovieFromFavorites: () => dispatch(removeMovieFromFavoritesThunk(movie.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
