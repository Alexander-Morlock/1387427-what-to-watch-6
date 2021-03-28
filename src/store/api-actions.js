import {ActionCreator} from "./action";
import {createAPI} from '../api/api';
import React from 'react';

const unauthorized = () => <h1>UNAUTHORIZED</h1>;
const api = createAPI(unauthorized);

export const getAllMoviesAndPromoThunk = () => (dispatch) => {
  let movies = [];
  let promo = {};
  api.get(`/films`)
    .then((res) => {
      movies = res.data;
    })
    .then(() => api.get(`/films/promo`))
    .then((res) => {
      promo = res.data;
    })
    .then(() => dispatch(ActionCreator.getAllMoviesAndPromo({movies, promo})))
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

