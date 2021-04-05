import {adaptMovieFromServer, adaptMoviesFromServer} from '../../utils/adapter';
import {ConnectionStatus} from '../../utils/constants';
import {ActionType} from "./action";

const initialState = {
  myList: []
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_FAVORITE_MOVIES: {
      return {
        ...state,
        myList: action.payload.status === ConnectionStatus.SUCCESS
          ? adaptMoviesFromServer(action.payload.data)
          : []
      };
    }

    case ActionType.SET_FAVORITE_MOVIE: {
      const newList = state.myList;
      const index = newList.length > 0
        ? newList.findIndex((m) => m.id === action.payload.id)
        : -1;

      if (index === -1) {
        newList.push(adaptMovieFromServer(action.payload.data));
      }
      return {
        ...state,
        myList: action.payload.status === ConnectionStatus.SUCCESS
          ? newList
          : state.myList
      };
    }

    case ActionType.REMOVE_MOVIE_FROM_FAVORITES: {
      return {
        ...state,
        myList: action.payload.status === ConnectionStatus.SUCCESS
          ? state.myList.filter((m) => m.id !== action.payload.data.id)
          : state.myList
      };
    }

    default: {
      return state;
    }
  }
};

export default favoritesReducer;
