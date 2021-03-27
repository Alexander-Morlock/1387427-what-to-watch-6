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

    case ActionType.GET_ALL_MOVIES: {
      return {
        ...state,
        movies: action.payload,
        genres: getGenres(action.payload)
      };
    }

    case ActionType.GET_COMMENTS: {
      return {
        ...state,
        comments: action.payload
      };
    }

    case ActionType.CHANGE_GENRE: {
      return state;
    }

    default: {
      return state;
    }
  }
};

export {reducer};
