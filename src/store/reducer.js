import {getFilms} from '../mocks/films';
import {ActionType} from './action';
const ALL_GENRES = `All genres`;

const initialState = {
  films: [],
  genres: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE: {
      return state;
    }

    case ActionType.GET_MOVIE_LIST: {
      const films = getFilms();
      const genres = new Set();
      genres.add(ALL_GENRES);
      films.forEach((f) => genres.add(f.genre));
      return {...state, films, genres: [...genres]};
    }

    case ActionType.GET_FILMS_BY_GENRE: {
      return action.payload === ALL_GENRES
        ? state
        : {...state, films: state.films.filter((f) => f.genre === action.payload)};
    }

    default: {
      return state;
    }
  }
};

export {reducer};
