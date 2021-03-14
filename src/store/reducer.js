import {getMovies} from '../mocks/movies';
import {ActionType} from './action';
import {ALL_GENRES} from '../utils/constants';

const getGenres = (movies) => {
  const genres = new Set();
  genres.add(ALL_GENRES);
  movies.forEach((f) => genres.add(f.genre));
  return [...genres];
};

const initialState = {
  movies: [],
  genres: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE: {
      return state;
    }

    case ActionType.GET_MOVIE_LIST: {
      const movies = getMovies();
      const genres = getGenres(movies);
      return {...state, movies, genres};
    }

    default: {
      return state;
    }
  }
};

export {reducer};
