import {createAPI} from '../api/api';
import {adaptMovieFromServer, adaptMoviesFromServer, adaptUserResponseFromServer} from '../utils/adapter';
import {ConnectionStatus} from "../utils/constants";
import {logOut, requiredAuthorization, sendAuthorization} from './authorization-reducer/action';
import {getFavoriteMovies, removeMovieFromFavorites, setFavoriteMovie} from './favorites-reducer/action';
import {getAllMovies, getAllMoviesAndPromo, getComments, resetAllMoviesFavorite, updateMovie} from './movies-reducer/action';
import {blockCommentForm, setErrorCommentForm, unBlockCommentForm} from './review-reducer/action';

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
        dispatch(requiredAuthorization(adaptUserResponseFromServer(res)));
      }
    });
};

export const sendAuthorizationThunk = (email, password) => (dispatch) => {
  api.post(`/login`, {email, password})
    .then((res) => dispatch(sendAuthorization(adaptUserResponseFromServer(res))));
};

export const logOutThunk = () => (dispatch) => {
  api.get(`/logout`)
    .then((res) => {
      dispatch(logOut(res.data));
      dispatch(resetAllMoviesFavorite());
    });
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
    .then((res) => dispatch(getFavoriteMovies({status: res.status, data: adaptMoviesFromServer(res.data)})));
};

export const setFavoriteMovieThunk = (id) => (dispatch) => {
  api.post(`/favorite/${id}/1`)
    .then((res) => {
      dispatch(setFavoriteMovie({status: res.status, data: adaptMovieFromServer(res.data)}));
      dispatch(updateMovie(adaptMovieFromServer(res.data)));
    });
};

export const removeMovieFromFavoritesThunk = (id) => (dispatch) => {
  api.post(`/favorite/${id}/0`)
    .then((res) => {
      dispatch(removeMovieFromFavorites(res));
      dispatch(updateMovie(adaptMovieFromServer(res.data)));
    });
};

