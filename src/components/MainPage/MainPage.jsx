import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router';
import shapeOfMovie from '../../utils/shape-of-movie';
import MoviesByGenre from './MoviesByGenre/MoviesByGenre';

const MainPage = ({promo}) => {
  const history = useHistory();
  const openPlayer = () => history.push(`/player/${promo.id}?from_main_page`);

  return (
    <div>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promo.background_image} alt={promo.name} />
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
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promo.poster_image} alt={`${promo.name} poster`} width="218" height="327" />
            </div>
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promo.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promo.genre}</span>
                <span className="movie-card__year">{promo.released}</span>
              </p>
              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={openPlayer}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
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
    </div>
  );
};

MainPage.propTypes = shapeOfMovie().isRequired;

const mapStateToProps = (store) => ({
  promo: store.promo});

export default connect(mapStateToProps)(MainPage);
