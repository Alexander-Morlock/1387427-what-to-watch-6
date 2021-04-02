import {ActionCreator} from "./action";
import {createAPI} from '../api/api';
import {ConnectionStatus} from "../utils/constants";

const api = createAPI();

export const getAllMoviesAndPromoThunk = () => (dispatch) => {
  Promise.all([api.get(`/films`), api.get(`/films/promo`)])
    .then((results) => dispatch(ActionCreator.getAllMoviesAndPromo(
        {
          movies: results[0].data,
          promo: results[1].data,
          connectionStatus: results[0].status
        }
    )));
};

export const getAllMoviesThunk = () => (dispatch) => {
  api.get(`/films`)
    .then((res) => dispatch(ActionCreator.getAllMovies(res.data)));
};

export const getCommentsThunk = (id) => (dispatch) => {
  api.get(`/comments/${id}`)
    .then((res) => dispatch(ActionCreator.getComments(res.data)));
};

export const requiredAuthorizationThunk = () => (dispatch) => {
  api.get(`/login`)
    .then((res) => {
      if (res) {
        dispatch(ActionCreator.requiredAuthorization(res));
      }
    });
};

export const sendAuthorizationThunk = (email, password) => (dispatch) => {
  api.post(`/login`, {email, password})
    .then((res) => dispatch(ActionCreator.sendAuthorization(res)));
};

export const logOutThunk = () => (dispatch) => {
  api.get(`/logout`)
    .then((res) => dispatch(ActionCreator.logOut(res.data)));
};

export const postReviewThunk = (rating, comment, id) => (dispatch) => {
  api.post(`/comments/${id}`, {rating, comment})
    .then((res) => {
      if (res.status === ConnectionStatus.SUCCESS) {
        dispatch(ActionCreator.unBlockCommentForm(res.data));
      } else {
        dispatch(ActionCreator.setErrorCommentForm());
      }
    });
};

export const getFavoriteMoviesThunk = () => (dispatch) => {
  api.get(`/favorite`)
    .then((res) => dispatch(ActionCreator.getFavoriteMovies(res)));
};

export const setFavoriteMovieThunk = (id) => (dispatch) => {
  api.post(`/favorite/${id}/1`)
    .then((res) => dispatch(ActionCreator.setFavoriteMovie(res)));
};

export const removeMovieFromFavoritesThunk = (id) => (dispatch) => {
  api.post(`/favorite/${id}/0`)
    .then((res) => dispatch(ActionCreator.removeMovieFromFavorites(res)));
};

