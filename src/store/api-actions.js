import {ActionCreator} from "./action";
import {createAPI} from '../api/api';

const unauthorized = () => {
  const err = new Error(`Unauthorized access attempt!`);
  throw err;
};
const api = createAPI(unauthorized);

export const getAllMoviesAndPromoThunk = () => (dispatch) => {
  Promise.all([api.get(`/films`), api.get(`/films/promo`)])
    .then((results) => dispatch(ActionCreator.getAllMoviesAndPromo(
        {
          movies: results[0].data,
          promo: results[1].data
        }
    )))
    .catch((err) => {
      throw new Error(err);
    });
};

export const getAllMoviesThunk = () => (dispatch) => {
  api.get(`/films`)
    .then((res) => dispatch(ActionCreator.getAllMovies(res.data)))
    .catch((err) => {
      throw new Error(err);
    });
};

export const getCommentsThunk = (id) => (dispatch) => {
  api.get(`/comments/${id}`)
    .then((res) => dispatch(ActionCreator.getComments(res.data)))
    .catch((err) => {
      throw new Error(err);
    });
};

export const requiredAuthorizationThunk = () => (dispatch) => {
  api.get(`/login`)
    .then((res) => dispatch(ActionCreator.requiredAuthorization(res.data)))
    .catch((err) => {
      throw new Error(err);
    });
};

export const tryToAuthorizeThunk = (email, password) => (dispatch) => {
  api.post(`/login`, {email, password})
    .then((res) => dispatch(ActionCreator.tryToAuthorize(res.data)))
    .catch((err) => {
      throw new Error(err);
    });
};

export const logOutThunk = () => (dispatch) => {
  api.get(`/logout`)
    .then((res) => dispatch(ActionCreator.logOut(res.data)))
    .catch((err) => {
      throw new Error(err);
    });
};
