import {createAPI} from '../api/api';
import {ConnectionStatus} from "../utils/constants";
import {logOut, requiredAuthorization, sendAuthorization} from './authorizationReducer/action';
import {getFavoriteMovies, removeMovieFromFavorites, setFavoriteMovie} from './favoritesReducer/action';
import {getAllMovies, getAllMoviesAndPromo, getComments} from './moviesReducer/action';
import {blockCommentForm, setErrorCommentForm, unBlockCommentForm} from './reviewReducer/action';

const api = createAPI();

export const getAllMoviesAndPromoThunk = () => (dispatch) => {
  Promise.all([api.get(`/films`), api.get(`/films/promo`)])
    .then((results) => dispatch(getAllMoviesAndPromo(
        {
          movies: results[0].data,
          promo: results[1].data,
          connectionStatus: results[0].status
        }
    )));
};

export const getAllMoviesThunk = () => (dispatch) => {
  api.get(`/films`)
    .then((res) => dispatch(getAllMovies(res.data)));
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
    .then((res) => dispatch(setFavoriteMovie(res)));
};

export const removeMovieFromFavoritesThunk = (id) => (dispatch) => {
  api.post(`/favorite/${id}/0`)
    .then((res) => dispatch(removeMovieFromFavorites(res)));
};

