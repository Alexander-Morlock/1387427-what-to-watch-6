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

const Movie = (props) => {
  const [state, setState] = useState(`Overview`);
  const showActiveClassNameIf = (text) => state === text ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`;
  const handleClick = (evt) => setState(evt.target.innerText);

  const {id} = useParams();
  const movie = props.movies.find((m) => m.id === +id);
  const sameMovies = props.movies.filter((m) => m.genre === movie.genre && m.id !== movie.id);

  const history = useHistory();
  const openPlayer = () => history.push(`/player/${id}`);

  useEffect(() => {
    props.getComment(movie.id);
  }, []);

  let ratingText = `Bad`;
  if (movie.rating >= 3 && movie.rating < 5) {
    ratingText = `Normal`;
  }
  if (movie.rating >= 5 && movie.rating < 8) {
    ratingText = `Good`;
  }
  if (movie.rating >= 8 && movie.rating < 10) {
    ratingText = `Very good`;
  }
  if (movie.rating >= 10) {
    ratingText = `Awesome`;
  }


  const MovieInfo = () => {
    switch (state) {
      case `Details`: {
        return <MovieDetails movie={movie} />;
      }
      case `Reviews`: {
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
            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width={63} height={63} />
              </div>
            </div>
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
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link>
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
                  <li className={showActiveClassNameIf(`Overview`)}>
                    <Link to="#" className="movie-nav__link" onClick={handleClick}>Overview</Link>
                  </li>
                  <li className={showActiveClassNameIf(`Details`)}>
                    <Link to="#" className="movie-nav__link" onClick={handleClick}>Details</Link>
                  </li>
                  <li className={showActiveClassNameIf(`Reviews`)}>
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
  movies: PropTypes.arrayOf(
      shapeOfMovie()).isRequired,
  getComment: PropTypes.func,
  getSameMovies: PropTypes.func,
  comments: PropTypes.arrayOf(
      shapeOfComment()
  )
};

const mapStateToProps = (store) => ({
  comments: store.comments,
  movies: store.movies
});

const mapDispatchToProps = (dispatch) => ({
  getComment: (id) => dispatch(getCommentsThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
