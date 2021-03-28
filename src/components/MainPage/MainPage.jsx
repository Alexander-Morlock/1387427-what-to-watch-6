import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router';
import {logOutThunk} from '../../store/api-actions';
import shapeOfMovie from '../../utils/shape-of-movie';
import MoviesByGenre from './MoviesByGenre/MoviesByGenre';
import {Link} from 'react-router-dom';
import shapeOfUser from '../../utils/shape-of-user';
import {ActionCreator} from '../../store/action';

let promoMovie = {};

const MainPage = (props) => {
  promoMovie = props.promo;
  const history = useHistory();
  const openPlayer = () => history.push(`/player/${props.promo.id}?from_main_page`);

  return (
    <div>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={props.promo.background_image} alt={props.promo.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="user-block">
            {
              props.user
                ? <div className="user-block__avatar">
                  <Link to="/mylist"><img src={props.user.avatar_url} alt="User avatar" width="63" height="63" /></Link>
                </div>
                : <div className="user-block">
                  <Link to="/login" className="user-block__link">Sign in</Link>
                </div>
            }
          </div>
        </header>
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={props.promo.poster_image} alt={`${props.promo.name} poster`} width="218" height="327" />
            </div>
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{props.promo.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{props.promo.genre}</span>
                <span className="movie-card__year">{props.promo.released}</span>
              </p>
              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={openPlayer}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={props.addMovieToMyList}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MoviesByGenre />
      <a href="#" onClick={() => props.logOut()}>Log out</a>
    </div>
  );
};

MainPage.propTypes = {
  "promo": shapeOfMovie().isRequired,
  "logOut": PropTypes.func,
  "addMovieToMyList": PropTypes.func,
  "user": shapeOfUser()
};

const mapStateToProps = (store) => ({
  promo: store.promo,
  user: store.user
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOutThunk()),
  addMovieToMyList: () => dispatch(ActionCreator.addMovieToMyList(promoMovie))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
