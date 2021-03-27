import {ALL_GENRES} from '../utils/constants';

export const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  GET_ALL_MOVIES: `GET_ALL_MOVIES`,
  GET_COMMENTS: `GET_COMMENTS`,
  GET_MOVIE: `GET_MOVIE`
};

export const ActionCreator = {
  changeGenre: (genre = ALL_GENRES) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  getAllMovies: (data) => ({
    type: ActionType.GET_ALL_MOVIES,
    payload: data
  }),
  getComments: (data) => ({
    type: ActionType.GET_COMMENTS,
    payload: data
  }),
  getMovie: (data) => ({
    type: ActionType.GET_MOVIE,
    payload: data
  })
};
