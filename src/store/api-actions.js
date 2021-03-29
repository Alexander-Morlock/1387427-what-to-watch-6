import {ActionCreator} from "./action";
import {createAPI} from '../api/api';

const unauthorized = () => {};
const api = createAPI(unauthorized);

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
        dispatch(ActionCreator.requiredAuthorization(res.data));
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
