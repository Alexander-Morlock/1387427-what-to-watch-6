import {createAPI} from '../api/api';
import {ConnectionStatus} from "../utils/constants";
import {logOut, requiredAuthorization, sendAuthorization} from './authorizationReducer/action';
import {getFavoriteMovies, removeMovieFromFavorites, setFavoriteMovie} from './favoritesReducer/action';
import {getAllMovies, getAllMoviesAndPromo, getComments, updateMovie} from './moviesReducer/action';
import {blockCommentForm, setErrorCommentForm, unBlockCommentForm} from './reviewReducer/action';

const adaptMovieFromServer = (m) => {
  const movie = {
    ...m,
    posterImage: m.poster_image,
    previewImage: m.preview_image,
    backgroundImage: m.background_image,
    backgroundColor: m.background_color,
    scoresCount: m.scores_count,
    runTime: m.run_time,
    isFavorite: m.is_favorite,
    videoLink: m.video_link,
    previewVideoLink: m.preview_video_link
  };

  // [
  //   `poster_image`,
  //   `preview_image`,
  //   `background_image`,
  //   `background_color`,
  //   `scores_count`,
  //   `run_time`,
  //   `is_favorite`,
  //   `video_link`,
  //   `preview_video_link`
  // ].forEach((field) => delete movie[field]);

  return movie;
};

const adaptMoviesFromServer = (movies) => movies.map((m) =>adaptMovieFromServer(m));

const api = createAPI();

export const getAllMoviesAndPromoThunk = () => (dispatch) => {
  Promise.all([api.get(`/films`), api.get(`/films/promo`)])
    .then((results) => dispatch(getAllMoviesAndPromo(
        {
          movies: adaptMoviesFromServer(results[0].data),
          promo: adaptMovieFromServer(results[1].data),
          connectionStatus: results[0].status
        }
    )));
};

export const getAllMoviesThunk = () => (dispatch) => {
  api.get(`/films`)
    .then((res) => dispatch(getAllMovies(adaptMoviesFromServer(res.data))));
};

export const getCommentsThunk = (id) => (dispatch) => {
  api.get(`/comments/${id}`)
    .then((res) => dispatch(getComments(res.data)));
};

export const requiredAuthorizationThunk = () => (dispatch) => {
  api.get(`/login`)
    .then((res) => {
      if (res) {
        dispatch(requiredAuthorization(res));
      }
    });
};

export const sendAuthorizationThunk = (email, password) => (dispatch) => {
  api.post(`/login`, {email, password})
    .then((res) => dispatch(sendAuthorization(res)));
};

export const logOutThunk = () => (dispatch) => {
  api.get(`/logout`)
    .then((res) => dispatch(logOut(res.data)));
};

export const postReviewThunk = (rating, comment, id) => (dispatch) => {
  dispatch(blockCommentForm());
  api.post(`/comments/${id}`, {rating, comment})
    .then((res) => {
      if (res.status !== ConnectionStatus.SUCCESS) {
        dispatch(setErrorCommentForm());
      } else {
        dispatch(unBlockCommentForm(res.data));
      }
    });
};

export const getFavoriteMoviesThunk = () => (dispatch) => {
  api.get(`/favorite`)
    .then((res) => dispatch(getFavoriteMovies(res)));
};

export const setFavoriteMovieThunk = (id) => (dispatch) => {
  api.post(`/favorite/${id}/1`)
    .then((res) => {
      dispatch(setFavoriteMovie(res));
      dispatch(updateMovie(res.data));
    });
};

export const removeMovieFromFavoritesThunk = (id) => (dispatch) => {
  api.post(`/favorite/${id}/0`)
    .then((res) => {
      dispatch(removeMovieFromFavorites(res));
      dispatch(updateMovie(res.data));
    });
};

