import {combineReducers} from 'redux';
import {NameSpace} from '../utils/constants';
import authorizationReducer from './authorizationReducer/authorization-reducer';
import favoritesReducer from './favoritesReducer/favorites-reducer';
import moviesReducer from './moviesReducer/movies-reducer';
import reviewReducer from './reviewReducer/review-reducer';

export default combineReducers({
  [NameSpace.AUTHORIZATION]: authorizationReducer,
  [NameSpace.FAVORITE]: favoritesReducer,
  [NameSpace.MOVIES]: moviesReducer,
  [NameSpace.REVIEW]: reviewReducer
});
