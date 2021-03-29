import {ALL_GENRES} from '../utils/constants';

export const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_ALL_MOVIES: `GET_ALL_MOVIES`,
  GET_COMMENTS: `GET_COMMENTS`,
  GET_ALL_MOVIES_AND_PROMO: `GET_ALL_MOVIES_AND_PROMO`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SEND_AUTHORIZATION: `SEND_AUTHORIZATION`,
  LOG_OUT: `LOG_OUT`,
  ADD_MOVIE_TO_MY_LIST: `ADD_MOVIE_TO_MY_LIST`
};

export const ActionCreator = {
  changeGenre: (genre = ALL_GENRES) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  getAllMovies: (movies) => ({
    type: ActionType.GET_ALL_MOVIES,
    payload: movies
  }),
  getComments: (data) => ({
    type: ActionType.GET_COMMENTS,
    payload: data
  }),
  getAllMoviesAndPromo: (data) => ({
    type: ActionType.GET_ALL_MOVIES_AND_PROMO,
    payload: data
  }),
  requiredAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  sendAuthorization: (response) => ({
    type: ActionType.SEND_AUTHORIZATION,
    payload: response
  }),
  logOut: (response) => ({
    type: ActionType.LOG_OUT,
    payload: response
  }),
  addMovieToMyList: (movie) => ({
    type: ActionType.ADD_MOVIE_TO_MY_LIST,
    payload: movie
  })
};

