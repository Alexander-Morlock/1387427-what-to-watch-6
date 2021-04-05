import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router';
import {shapeOfMovie} from '../../utils/shape-of-movie';
import UserAvatar from '../user-avatar/user-avatar';
import {removeMovieFromFavoritesThunk, setFavoriteMovieThunk} from '../../store/api-actions';
import {connect} from 'react-redux';
import {getIsDataDownloaded, getPromo} from '../../store/movies-reducer/selectors';
import {getAuthorizationStatus} from '../../store/authorization-reducer/selectors';
import {AuthorizationStatus} from '../../utils/constants';
import Loader from '../loader/loader';

let promoMovieId = null;
let authStatus = null;

const MainPageHeader = ({
  promo,
  addMovieToMyList,
  removeMovieFromFavorites,
  authorizationStatus,
  isDataDownloaded}) => {
  promoMovieId = promo.id;
  authStatus = authorizationStatus;
  const history = useHistory();
  const openPlayer = () => history.push(`/player/${promo.id}?from_main_page`);

  return (isDataDownloaded ?
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promo.backgroundImage} alt={promo.name} />
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
        <UserAvatar />
      </header>
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={promo.posterImage} alt={`${promo.name} poster`} width="218" height="327" />
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
              {
                !promo.isFavorite
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
            </div>
          </div>
        </div>
      </div>
    </section> : <Loader />
  );
};

MainPageHeader.propTypes = {
  promo: shapeOfMovie.isRequired,
  addMovieToMyList: PropTypes.func,
  removeMovieFromFavorites: PropTypes.func,
  authorizationStatus: PropTypes.string,
  isDataDownloaded: PropTypes.bool
};

const mapStateToProps = (store) => ({
  promo: getPromo(store),
  authorizationStatus: getAuthorizationStatus(store),
  isDataDownloaded: getIsDataDownloaded(store)
});

const mapDispatchToProps = (dispatch) => ({
  addMovieToMyList: () => {
    if (authStatus === AuthorizationStatus.AUTH) {
      dispatch(setFavoriteMovieThunk(promoMovieId));
    }
  },
  removeMovieFromFavorites: () => dispatch(removeMovieFromFavoritesThunk(promoMovieId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPageHeader);
