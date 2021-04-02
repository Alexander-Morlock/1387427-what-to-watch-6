// import {ActionType} from './action';
// import {ALL_GENRES, AuthorizationStatus, ConnectionStatus} from '../utils/constants';

// const getGenres = (movies) => {
//   const genres = new Set();
//   genres.add(ALL_GENRES);
//   movies.forEach((f) => genres.add(f.genre));
//   return [...genres];
// };

// const initialState = {
//   movies: [],
//   genres: [],
//   authorizationStatus: AuthorizationStatus.NO_AUTH,
//   myList: [],
//   isDataDownloaded: false,
//   isErrorCommentForm: false,
//   isBlockedCommentForm: false
// };

// export default reducer = (state = initialState, action) => {
//   switch (action.type) {

//     case ActionType.GET_ALL_MOVIES_AND_PROMO: {
//       return {
//         ...state,
//         ...action.payload,
//         genres: getGenres(action.payload.movies),
//         isDataDownloaded: true
//       };
//     }

//     case ActionType.GET_ALL_MOVIES: {
//       return {
//         ...state,
//         movies: action.payload,
//         genres: getGenres(action.payload)
//       };
//     }

//     case ActionType.GET_COMMENTS: {
//       return {
//         ...state,
//         comments: action.payload
//       };
//     }

//     case ActionType.REQUIRED_AUTHORIZATION: {
//       const isSuccess = action.payload.status === ConnectionStatus.SUCCESS;
//       return {
//         ...state,
//         authorizationStatus: isSuccess
//           ? AuthorizationStatus.AUTH
//           : AuthorizationStatus.NO_AUTH,
//         user: action.payload.data,
//         connectionStatus: action.payload.status
//       };
//     }

//     case ActionType.SEND_AUTHORIZATION: {
//       const isSuccess = action.payload.status === ConnectionStatus.SUCCESS;
//       return {
//         ...state,
//         user: action.payload.data,
//         authorizationStatus: isSuccess
//           ? AuthorizationStatus.AUTH
//           : AuthorizationStatus.NO_AUTH,
//         connectionStatus: action.payload.status
//       };
//     }

//     case ActionType.LOG_OUT: {
//       return {
//         ...state,
//         authorizationStatus: AuthorizationStatus.NO_AUTH,
//         user: null
//       };
//     }

//     case ActionType.BLOCK_COMMENT_FORM: {
//       return {
//         ...state,
//         isBlockedCommentForm: true
//       };
//     }

//     case ActionType.UNBLOCK_COMMENT_FORM: {
//       return {
//         ...state,
//         isBlockedCommentForm: false,
//         comments: action.payload
//       };
//     }

//     case ActionType.SET_ERROR_COMMENT_FORM: {
//       return {
//         ...state,
//         isErrorCommentForm: true
//       };
//     }

//     case ActionType.GET_FAVORITE_MOVIES: {
//       return {
//         ...state,
//         myList: action.payload.status === ConnectionStatus.SUCCESS
//           ? action.payload.data
//           : []
//       };
//     }

//     case ActionType.SET_FAVORITE_MOVIE: {
//       const newList = state.myList;
//       const index = newList.length > 0
//         ? newList.findIndex((m) => m.id === action.payload.id)
//         : -1;

//       if (index === -1) {
//         newList.push(action.payload.data);
//       }
//       return {
//         ...state,
//         myList: action.payload.status === ConnectionStatus.SUCCESS
//           ? newList
//           : state.myList
//       };
//     }

//     case ActionType.REMOVE_MOVIE_FROM_FAVORITES: {
//       return {
//         ...state,
//         myList: action.payload.status === ConnectionStatus.SUCCESS
//           ? state.myList.filter((m) => m.id !== action.payload.data.id)
//           : state.myList
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// };

// export default reducer;

import {combineReducers} from 'redux';
import authorizationReducer from './authorizationReducer';
import favoritesReducer from './favoritesReducer';
import moviesReducer from './moviesReducer';
import reviewReducer from './reviewReducer';

const NameSpace = {
  AUTHORIZATION: `AUTH`,
  FAVORITE: `FAVORITE`,
  MOVIES: `MOVIES`,
  REVIEW: `REVIEW`
};

export default combineReducers({
  [NameSpace.AUTHORIZATION]: authorizationReducer,
  [NameSpace.FAVORITE]: favoritesReducer,
  [NameSpace.MOVIES]: moviesReducer,
  [NameSpace.REVIEW]: reviewReducer
});
