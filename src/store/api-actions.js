import {ActionCreator} from "./action";
import {createAPI} from '../api/api';
import React from 'react';

const unauthorized = () => <h1>UNAUTHORIZED</h1>;
const api = createAPI(unauthorized);

export const getAllMoviesAndPromoThunk = () => (dispatch) => {
  Promise.all([api.get(`/films`), api.get(`/films/promo`)])
    .then((results) => dispatch(ActionCreator.getAllMoviesAndPromo({movies: results[0].data, promo: results[1].data})))
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

