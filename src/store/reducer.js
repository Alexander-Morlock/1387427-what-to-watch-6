import {ActionType} from './action';
import {ALL_GENRES, AuthorizationStatus} from '../utils/constants';

const getGenres = (movies) => {
  const genres = new Set();
  genres.add(ALL_GENRES);
  movies.forEach((f) => genres.add(f.genre));
  return [...genres];
};

const initialState = {
  movies: [],
  genres: [],
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  myList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_ALL_MOVIES_AND_PROMO: {
      return {
        ...state,
        ...action.payload,
        genres: getGenres(action.payload.movies)
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

    case ActionType.REQUIRED_AUTHORIZATION: {
      return {
        ...state,
        authorizationStatus: action.payload.id
          ? AuthorizationStatus.AUTH
          : AuthorizationStatus.NO_AUTH,
        user: {
          ...action.payload
        }
      };
    }

    case ActionType.TRY_TO_AUTHORIZE: {
      return {
        ...state,
        user: {
          ...action.payload
        },
        authorizationStatus: AuthorizationStatus.AUTH
      };
    }

    case ActionType.LOG_OUT: {
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {}
      };
    }

    case ActionType.ADD_MOVIE_TO_MY_LIST: {
      const newList = state.myList;
      const index = newList.length > 0
        ? newList.findIndex((m) => m.id === action.payload.id)
        : -1;

      if (index === -1) {
        newList.push(action.payload);
      }
      return {
        ...state,
        myList: newList
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
