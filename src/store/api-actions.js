import {ActionCreator} from "./action";
import {createAPI} from '../api/api';
import React from 'react';

// const baseURL = `https://6.react.pages.academy/wtw`;

// export const getMoviesThunk = () => (dispatch) => {
//   fetch(`${baseURL}/films`)
//     .then((res) => res.json())
//     .then((res) => dispatch({type: ActionType.GET_MOVIE_LIST, payload: res}))
//     .catch((err) => {
//       throw new Error(err);
//     });
// };

const unauthorized = () => <h1>UNAUTHORIZED</h1>;
const api = createAPI(unauthorized);

export const getAllMoviesThunk = () => (dispatch) => {
  api.get(`/films`)
    .then((res) => dispatch(ActionCreator.getAllMovies(res.data)))
    .catch((err) => {
      throw new Error(err);
    });
};

export const getMovieThunk = (id) => (dispatch) => {
  api.get(`/films`)
    .then((res) => {
      const allMovies = res.data;
      const movie = allMovies.find((m) => m.id === id);
      const sameMovies = allMovies.filter((m) => m.genre === movie.genre);
      dispatch(ActionCreator.getMovie([...sameMovies, movie]));
    })
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

