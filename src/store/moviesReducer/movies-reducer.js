import {ALL_GENRES} from '../../utils/constants';
import {ActionType} from "./action";

const getGenres = (movies) => {
  const genres = new Set();
  genres.add(ALL_GENRES);
  movies.forEach((f) => genres.add(f.genre));
  return [...genres];
};

const initialState = {
  movies: [],
  promo: {},
  genres: [],
  isDataDownloaded: false
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_ALL_MOVIES_AND_PROMO: {
      return {
        ...state,
        ...action.payload,
        genres: getGenres(action.payload.movies),
        isDataDownloaded: true
      };
    }

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

    case ActionType.UPDATE_MOVIE: {
      const updateIndex = state.movies.findIndex((e) => e.id === action.payload.id);
      return {
        ...state,
        movies: [...state.movies.slice(0, updateIndex), action.payload, ...state.movies.slice(updateIndex + 1)],
        promo: action.payload.id === state.promo.id ? action.payload : state.promo
      };
    }

    default: {
      return state;
    }
  }
};

export default moviesReducer;
